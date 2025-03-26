import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Resume } from "@/lib/server/redisActions";
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

const fetchUsername = async (): Promise<{
  username: string;
}> => {
  const response = await fetch("/api/username");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch username");
  }
  return await response.json();
};

export function useUserActions() {
  const queryClient = useQueryClient();
  const { uploadToS3 } = useS3Upload();

  // Query for fetching resume data
  const resumeQuery = useQuery({
    queryKey: ["resume"],
    queryFn: fetchResume,
  });

  const usernameQuery = useQuery({
    queryKey: ["username"],
    queryFn: fetchUsername,
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
      return Promise.reject(new Error(error));
    }
  };

  const internalUsernameUpdate = async (newUsername: string) => {
    const response = await fetch("/api/username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: newUsername }),
    });

    if (!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
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

  // Mutation for updating resume
  const uploadResumeMutation = useMutation({
    mutationFn: uploadFileResume,
    onSuccess: () => {
      // Invalidate and refetch resume data
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  // Mutation for toggling status of publishment
  const toggleStatusMutation = useMutation({
    mutationFn: async (newPublishStatus: PublishStatuses) => {
      if (!resumeQuery.data?.resume) return;
      await internalResumeUpdate({
        ...resumeQuery.data?.resume,
        status: newPublishStatus,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch resume data
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  // mutation to allow editing a username for a user_id, if it fails means that username is already taken
  const updateUsernameMutation = useMutation({
    mutationFn: internalUsernameUpdate,
    onSuccess: () => {
      // Invalidate and refetch username data
      queryClient.invalidateQueries({ queryKey: ["username"] });
    },
    throwOnError: false,
  });

  return {
    resumeQuery,
    uploadResumeMutation,
    toggleStatusMutation,
    usernameQuery,
    updateUsernameMutation,
  };
}
