import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Resume } from "@/components/server/resumeActions";
import { useS3Upload } from "next-s3-upload";
import { PublishStatuses } from "@/components/PreviewActionbar";

// Fetch resume data
const fetchResume = async (): Promise<{
  resume: Resume | undefined;
}> => {
  const response = await fetch("/api/resume");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch resume");
  }
  return await response.json();
};

export function useResumeData() {
  const queryClient = useQueryClient();
  const { uploadToS3 } = useS3Upload();

  // Query for fetching resume data
  const { data, isLoading, error } = useQuery({
    queryKey: ["resume"],
    queryFn: fetchResume,
  });

  const internalResumeUpdate = async (newResume: Resume) => {
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

  // Update resume data in Upstash
  const uploadFileResume = async (file: File) => {
    const { url } = await uploadToS3(file);

    const newResume: Resume = {
      file: { name: file.name, url: url, size: file.size },
      resumeData: undefined,
      status: "draft",
    };

    internalResumeUpdate(newResume);
  };

  const toggleStatusMutation = useMutation({
    mutationFn: async (newPublishStatus: PublishStatuses) => {
      if (!data?.resume) return;
      await internalResumeUpdate({
        ...data?.resume,
        status: newPublishStatus,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch resume data
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  // Mutation for updating resume
  const uploadResumeMutation = useMutation({
    mutationFn: uploadFileResume,
    onSuccess: () => {
      // Invalidate and refetch resume data
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  // Mutation for toggling status of publishment

  return {
    resume: data?.resume,
    isLoading,
    error,
    uploadResumeMutation,
    toggleStatusMutation,
  };
}
