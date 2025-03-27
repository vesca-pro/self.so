"use client";
import LoadingFallback from "@/components/LoadingFallback";
import { PopupSiteLive } from "@/components/PopupSiteLive";
import PreviewActionbar from "@/components/PreviewActionbar";
import { FullResume } from "@/components/resume/FullResume";
import { useUserActions } from "@/hooks/useUserActions";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

import { toast } from "sonner";

export default function PreviewClient() {
  const { user } = useUser();
  const { resumeQuery, toggleStatusMutation, usernameQuery } = useUserActions();
  const [showModalSiteLive, setModalSiteLive] = useState(false);

  if (resumeQuery.isLoading || usernameQuery.isLoading || !usernameQuery.data) {
    return <LoadingFallback message="Loading..." />;
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col gap-4 pb-8">
      <div className="max-w-3xl mx-auto w-full md:px-0 px-4">
        <PreviewActionbar
          initialUsername={usernameQuery.data.username}
          status={resumeQuery.data?.resume?.status}
          onStatusChange={async (newStatus) => {
            await toggleStatusMutation.mutateAsync(newStatus);
            const isFirstTime = !localStorage.getItem("publishedSite");

            if (isFirstTime && newStatus === "live") {
              setModalSiteLive(true);
              localStorage.setItem("publishedSite", new Date().toDateString());
            } else {
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

      <PopupSiteLive
        isOpen={showModalSiteLive}
        websiteUrl=""
        onClose={() => {
          setModalSiteLive(false);
        }}
      />
    </div>
  );
}
