"use client";

import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/ui/dropzone";
import { Sparkles, Linkedin, Loader2, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useS3Upload } from "next-s3-upload";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UploadPageClient() {
  const router = useRouter();
  let { files, uploadToS3 } = useS3Upload();

  const fileBeingUploaded = files.length > 0 ? files[0] : null;
  const uploadProgress = fileBeingUploaded ? fileBeingUploaded.progress : 0;
  const isUploading = files.length > 0 && uploadProgress < 100;

  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  const handleUploadFile = async (file: File) => {
    if (!file) return;

    let { url } = await uploadToS3(file);

    console.log("Uploaded file URL:", url);

    setUploadedFileUrl(url);
  };

  const handleGenerateWebsite = async () => {
    router.push(`/preview?url=${encodeURIComponent(uploadedFileUrl)}`);
  };

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

        {!isUploading && fileBeingUploaded ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center font-mono">
            <div className="bg-gray-100 p-4 rounded-full mb-2">
              <Linkedin className="h-6 w-6 text-gray-600" />
            </div>
            <p className="text-sm font-medium">{fileBeingUploaded.file.name}</p>
            <p className="text-xs text-gray-500 mt-1">
              {(fileBeingUploaded.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : isUploading ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center font-mono">
            <div className="bg-gray-100 p-4 rounded-full mb-2">
              <Loader2 className="h-6 w-6 text-gray-600 animate-spin" />
            </div>
            <p className="text-sm font-medium">
              Uploading {fileBeingUploaded?.file.name}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {uploadProgress.toFixed(0)}% complete
            </p>
          </div>
        ) : (
          <Dropzone
            accept={{
              "application/pdf": [".pdf"],
            }}
            maxFiles={1}
            icon={<Linkedin className="h-6 w-6" />}
            title="Upload PDF"
            description="Resume or LinkedIn"
            isUploading={isUploading}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length > 0) {
                handleUploadFile(acceptedFiles[0]);
              }
            }}
            onDropRejected={(fileRejections) => {
              toast.error("Only PDF files are supported");
            }}
          />
        )}

        <div className="pt-8 font-mono">
          <Button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-4 h-auto"
            disabled={!fileBeingUploaded || isUploading}
            onClick={handleGenerateWebsite}
          >
            {isUploading ? (
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
        </div>
      </div>
    </div>
  );
}
