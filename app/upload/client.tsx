"use client";

import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/ui/dropzone";
import { Sparkles, Linkedin, Loader2, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UploadPageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleGenerateWebsite = async () => {
    if (!file) return;

    setIsUploading(true);

    // Simulate file upload and processing
    try {
      // In a real implementation, you would upload the file to S3 here
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to preview page after successful upload
      router.push("/preview");
    } catch (error) {
      console.error("Upload failed:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
      <div className="w-full max-w-2xl space-y-12 text-center">
        <h1 className="text-xl text-center font-mono">
          Upload a PDF of your{" "}
          <span className="inline-flex items-center">
            <span className="text-gray-600 mr-1">LinkedIn</span>
            <span className="inline-block w-4 h-4 rounded-full border border-gray-300 items-center justify-center text-xs">
              i
            </span>
          </span>{" "}
          or your
          <br />
          resume and generate your personal site
        </h1>

        {file && !isUploading ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center font-mono">
            <div className="bg-gray-100 p-4 rounded-full mb-2">
              <Linkedin className="h-6 w-6 text-gray-600" />
            </div>
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-gray-500 mt-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <Button
              variant="outline"
              className="mt-4 text-sm text-gray-500 border border-gray-300 flex items-center"
              onClick={() => setFile(null)}
            >
              <X className="h-4 w-4 mr-1" />
              Replace file
            </Button>
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
                setFile(acceptedFiles[0]);
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
            disabled={!file || isUploading}
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
