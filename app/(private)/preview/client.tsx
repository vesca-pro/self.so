"use client";
import LoadingFallback from "@/components/LoadingFallback";
import PreviewActionbar from "@/components/PreviewActionbar";
import { FullResume } from "@/components/resume/FullResume";
import { useResumeData } from "@/hooks/useResumeData";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "sonner";

export default function PreviewClient({
  initialUserName,
}: {
  initialUserName: string;
}) {
  const router = useRouter();
  const { user } = useUser();
  const { resume, isLoading, toggleStatusMutation } = useResumeData();
  const [userName, setUserName] = useState(initialUserName);

  const handlePublish = () => {
    console.log("publish");
    // redirect to the username page with the username
    router.push(`/${userName}`);
  };

  if (isLoading) {
    return <LoadingFallback message="Loading..." />;
  }

  console.log("toggleStatusMutation", toggleStatusMutation.isPending);

  return (
    <div className="w-full min-h-screen bg-background flex flex-col gap-4 pb-8">
      <div className="max-w-3xl mx-auto w-full md:px-0 px-4">
        <PreviewActionbar
          initialUsername={initialUserName}
          onUsernameChange={(newUsername) => {
            // setUserName(newUsername);
          }}
          status={resume?.status}
          onStatusChange={async (newStatus) => {
            await toggleStatusMutation.mutateAsync(newStatus);
            if (newStatus === "live") {
              toast.success("Your website has been updated!");
            }
          }}
          isChangingStatus={toggleStatusMutation.isPending}
        />
      </div>

      <div className="max-w-3xl mx-auto w-full rounded-lg border-[0.5px] border-neutral-300 flex items-center justify-between px-4">
        <FullResume
          resume={resume?.resumeData}
          profilePicture={user?.imageUrl}
        />
      </div>
    </div>
  );
}
