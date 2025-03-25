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
import LoadingFallback from "../components/LoadingFallback";
import { CustomSpinner } from "@/components/CustomSpinner";

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
    return <LoadingFallback message="Loading..." />;
  }

  return (
    <div className="flex flex-col items-center justify-between flex-1 px-4 py-12">
      <div className="w-full max-w-[438px] text-center font-mono">
        <h1 className="text-base text-center pb-6">
          Upload a PDF of your LinkedIn or your resume and generate your
          personal site
        </h1>

        <div className="relative">
          {fileState.status !== "empty" && (
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full z-10"
              disabled={fileState.status === "uploading"}
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}

          <Dropzone
            accept={{ "application/pdf": [".pdf"] }}
            maxFiles={1}
            icon={
              fileState.status !== "empty" ? (
                fileState.status === "uploading" ? (
                  <CustomSpinner className="size-7" />
                ) : (
                  <img src="/uploaded-pdf.svg" className="h-6 w-6" />
                )
              ) : (
                <Linkedin className="h-6 w-6 text-gray-600" />
              )
            }
            title={
              <span className="text-base font-bold text-center text-design-black">
                {fileState.status !== "empty"
                  ? fileState.file.name
                  : "Upload PDF"}
              </span>
            }
            description={
              <span className="text-xs font-light text-center text-design-gray">
                {fileState.status !== "empty"
                  ? `${(fileState.file.size / 1024 / 1024).toFixed(2)} MB`
                  : "Resume or LinkedIn"}
              </span>
            }
            isUploading={isUploading}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles[0]) handleUploadFile(acceptedFiles[0]);
            }}
            onDropRejected={() => toast.error("Only PDF files are supported")}
          />
        </div>

        <div className="pt-3 font-mono text-center cursor-help flex flex-row gap-1.5 justify-center">
          <span className="ml-1 inline-block w-4 h-4 rounded-full border border-gray-300 items-center justify-center text-xs cursor-help">
            i
          </span>
          <p className="text-xs text-center text-design-gray">
            How to upload LinkedIn profile
          </p>
        </div>
      </div>
      <div className="font-mono">
        <div className="relative">
          <Button
            className="px-4 py-4 h-auto bg-design-black hover:bg-design-black/95"
            disabled={
              fileState.status === "empty" || fileState.status === "uploading"
            }
            onClick={() => router.push("/preview")}
          >
            {fileState.status === "uploading" ? (
              <>
                <CustomSpinner className="h-5 w-5 mr-2" />
                Processing...
              </>
            ) : (
              <>
                <img
                  src="/sparkle.png"
                  alt="Sparkle Icon"
                  className="h-5 w-5 mr-2"
                />
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
  );
}
