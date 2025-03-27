"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { ClipboardCopyIcon, CopyIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, getSelfSoUrl } from "@/lib/utils";
import { useUserActions } from "@/hooks/useUserActions";
import { toast } from "sonner";

export type PublishStatuses = "draft" | "live";

export default function PreviewActionbar({
  initialUsername = "",
  prefix = "self.so/",
  status,
  onStatusChange,
  isChangingStatus,
}: {
  initialUsername: string;
  prefix?: string;
  status?: PublishStatuses;
  onStatusChange?: (newStatus: PublishStatuses) => Promise<void>;
  isChangingStatus?: boolean;
}) {
  const [username, setUsername] = useState(initialUsername);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { updateUsernameMutation } = useUserActions();

  const isChecking = updateUsernameMutation.isPending;
  const isValid =
    username === initialUsername || updateUsernameMutation.isSuccess;

  // Check username availability with debounce
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const sanitizedUsername = username.trim();

    if (sanitizedUsername === "" || sanitizedUsername === initialUsername) {
      return;
    }

    // Validate username format and length
    const isValidFormat = /^[a-zA-Z0-9-]+$/.test(sanitizedUsername);
    if (!isValidFormat || sanitizedUsername.length > 80) {
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        await updateUsernameMutation.mutateAsync(sanitizedUsername);
      } catch (e) {}
    }, 500); // Check every 500ms at most

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [username]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value
      .replace(/[^a-zA-Z0-9-]/g, "")
      .slice(0, 20);
    setUsername(newUsername);
  };

  const handleStatusChange = async () => {
    if (onStatusChange) {
      // Toggle the status
      const newStatus = status === "draft" ? "live" : "draft";
      await onStatusChange(newStatus);
    }
  };

  return (
    <div className="w-full rounded-lg bg-[#fcfcfc] border-[0.5px] border-neutral-300 flex items-center justify-between py-3 px-5  sm:px-4 sm:py-2.5  flex-col sm:flex-row gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-1 mr-1">
          <img src="/link-icon.png" className="w-4 h-4 text-design-black" />
          <p className="text-sm text-design-black">{prefix}</p>
        </div>

        <div className="w-full md:max-h-[34px] overflow-hidden rounded bg-white border-[0.5px] border-neutral-300 flex flex-col sm:flex-row">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            maxLength={20}
            placeholder="Only letters, numbers and hyphens allowed"
            className="flex-1 p-3 text-sm text-[#5d5d5d] border-none outline-none focus:ring-0 bg-transparent"
          />

          <div
            className={cn(
              "min-h-6 sm:w-[34px] w-full flex items-center justify-center border-l-[0.5px] border-[#D4D4D4]",
              !isChecking && (isValid ? "bg-[#F0FFF0]" : "bg-[#FFF0F0]")
            )}
          >
            {isChecking ? (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-primary animate-spin" />
            ) : isValid ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="#009505"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <X className="w-5 h-5 text-[#950000]" />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {status === "live" && (
          <Button
            onClick={() => {
              const usernameCorrect = isValid ? username : initialUsername;
              const portofolioUrl = getSelfSoUrl(usernameCorrect);
              navigator.clipboard.writeText(portofolioUrl);
              toast.success("Copied link to your resume");
            }}
            className="!size-8 "
            variant="outline"
          >
            <CopyIcon className="size-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: status === "draft" ? "#B98900" : "#009505",
            }}
          />
          <p
            className={cn(
              "text-[10px] font-bold uppercase",
              status === "draft" ? "text-[#B98900]" : "text-[#009505]"
            )}
          >
            {status}
          </p>
        </div>

        <Button
          variant="default"
          disabled={(!isValid && status === "draft") || isChangingStatus}
          onClick={handleStatusChange}
          className="flex items-center min-w-[100px] min-h-8 gap-1.5 px-3 py-1.5 h-auto bg-design-black hover:bg-[#333333] text-[#fcfcfc]"
        >
          {isChangingStatus ? (
            <>
              <span className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            </>
          ) : (
            <span className="text-sm">
              {status === "draft" ? "Publish" : "Unpublish"}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
