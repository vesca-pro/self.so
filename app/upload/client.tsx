"use client";

import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/ui/dropzone";
import { Sparkles, Linkedin, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useResumeData } from "@/hooks/useResumeData";
import { useEffect, useState } from "react";

type FileState =
  | { status: "empty" }
  | { status: "uploading"; file: File }
  | { status: "saved"; file: { name: string; url: string; size: number } };

export default function UploadPageClient() {
  const router = useRouter();
  const { resume, isLoading, isUploading, uploadResume } = useResumeData();
  const [fileState, setFileState] = useState<FileState>({ status: "empty" });

  // Update fileState whenever resume changes
  useEffect(() => {
    if (resume?.file?.url && resume.file.name && resume.file.size) {
      setFileState({
        status: "saved",
        file: {
          name: resume.file.name,
          url: resume.file.url,
          size: resume.file.size,
        },
      });
    }
  }, [resume]);

  const handleUploadFile = async (file: File) => {
    uploadResume(file);
  };

  const handleReset = () => {
    setFileState({ status: "empty" });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
      <div className="w-full max-w-2xl space-y-12 text-center">
        <h1 className="text-xl text-center font-mono">
          Upload a PDF of your{" "}
          <span className="inline-flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center">
                    <span className="text-gray-600 cursor-help">LinkedIn</span>
                    <span className="ml-1 inline-block w-4 h-4 rounded-full border border-gray-300 items-center justify-center text-xs cursor-help">
                      i
                    </span>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-[200px] whitespace-pre-line">
                    Go to your LinkedIn profile, click "More" → "Save to PDF" to
                    download your profile
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>{" "}
          or your
          <br />
          resume and generate your personal site
        </h1>

        {fileState.status !== "empty" ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center font-mono relative">
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
              disabled={fileState.status === "uploading"}
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
            <div className="bg-gray-100 p-4 rounded-full mb-2">
              {fileState.status === "uploading" ? (
                <Loader2 className="h-6 w-6 text-gray-600 animate-spin" />
              ) : (
                <Linkedin className="h-6 w-6 text-gray-600" />
              )}
            </div>
            <p className="text-sm font-medium">{fileState.file.name}</p>
            <p className="text-xs text-gray-500 mt-1">
              {(fileState.file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <Dropzone
            accept={{ "application/pdf": [".pdf"] }}
            maxFiles={1}
            icon={<Linkedin className="h-6 w-6" />}
            title="Upload PDF"
            description="Resume or LinkedIn"
            isUploading={isUploading}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles[0]) handleUploadFile(acceptedFiles[0]);
            }}
            onDropRejected={() => toast.error("Only PDF files are supported")}
          />
        )}

        <div className="pt-8 font-mono">
          <div className="relative">
            <Button
              className="px-4 py-4 h-auto"
              disabled={
                fileState.status === "empty" || fileState.status === "uploading"
              }
              onClick={() => router.push("/preview")}
            >
              {fileState.status === "uploading" ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Website
                </>
              )}
            </Button>
            {fileState.status === "empty" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="absolute inset-0" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload a PDF to continue</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
