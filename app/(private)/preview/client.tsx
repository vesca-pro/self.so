"use client";
import LoadingFallback from "@/components/LoadingFallback";
import PreviewActionbar from "@/components/PreviewActionbar";
import { FullResume } from "@/components/resume/FullResume";
import { useUserActions } from "@/hooks/useUserActions";
import { useUser } from "@clerk/nextjs";

import { toast } from "sonner";

export default function PreviewClient({
  initialUserName,
}: {
  initialUserName: string;
}) {
  const { user } = useUser();
  const { resumeQuery, toggleStatusMutation } = useUserActions();

  console.log(resumeQuery.data);

  if (resumeQuery.isLoading) {
    return <LoadingFallback message="Loading..." />;
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col gap-4 pb-8">
      <div className="max-w-3xl mx-auto w-full md:px-0 px-4">
        <PreviewActionbar
          initialUsername={initialUserName}
          onUsernameChange={(newUsername) => {
            // setUserName(newUsername);
          }}
          status={resumeQuery.data?.resume?.status}
          onStatusChange={async (newStatus) => {
            await toggleStatusMutation.mutateAsync(newStatus);
            if (newStatus === "live") {
              toast.success("Your website has been updated!");
            }
          }}
          isChangingStatus={toggleStatusMutation.isPending}
        />
      </div>

      <div className="max-w-3xl mx-auto w-full md:rounded-lg border-[0.5px] border-neutral-300 flex items-center justify-between px-4">
        <FullResume
          resume={resumeQuery.data?.resume?.resumeData}
          profilePicture={user?.imageUrl}
        />
      </div>
    </div>
  );
}
