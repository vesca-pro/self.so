import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Resume } from "@/app/api/resume/route";
import { useS3Upload } from "next-s3-upload";

// Fetch resume data
const fetchResume = async (): Promise<Resume | undefined> => {
  const response = await fetch("/api/resume");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch resume");
  }
  const data = (await response.json()) as { resume?: Resume };
  return data.resume;
};

export function useResumeData() {
  const queryClient = useQueryClient();
  const { files, uploadToS3 } = useS3Upload();

  // Query for fetching resume data
  const {
    data: resume,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["resume"],
    queryFn: fetchResume,
  });

  // Update resume data in Upstash
  const uploadFileResume = async (file: File) => {
    const { url } = await uploadToS3(file);

    const newResume: Resume = {
      file: { name: file.name, url: url, size: file.size },
      resumeData: undefined,
    };

    const response = await fetch("/api/resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newResume),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update resume");
    }
  };

  // Mutation for updating resume
  const uploadResume = useMutation({
    mutationFn: uploadFileResume,
    onSuccess: () => {
      // Invalidate and refetch resume data
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  return {
    resume,
    isLoading,
    error,
    uploadResume: uploadResume.mutate,
    isUploading: uploadResume.isPending,
    uploadError: uploadResume.error,
  };
}
