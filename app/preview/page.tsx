import { auth, clerkClient } from "@clerk/nextjs/server";
import PreviewClient from "./client";
import { getResume, storeResume } from "../components/resumeActions";
import { generateResumeObject } from "@/components/server/generateResumeObject";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoadingFallback from "../components/LoadingFallback";

async function ResumeIngestion({ userId }: { userId: string }) {
  // Simulate resume ingestion delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const resume = await getResume(userId);

  if (!resume || !resume.file) redirect("/resume");
  return (
    <Suspense
      fallback={
        <LoadingFallback message="Processing content with AI to tailor your profile..." />
      }
    >
      <LLMProcessing resume={resume} userId={userId} />
    </Suspense>
  );
}

async function LLMProcessing({
  resume,
  userId,
}: {
  resume: any;
  userId: string;
}) {
  const resumeObject = await generateResumeObject();

  await storeResume(userId, {
    ...resume,
    resumeData: resumeObject,
  });
  return <PreviewClient initialUserName={userId} />;
}

export default async function Preview() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <>
      <Suspense
        fallback={
          <LoadingFallback message="Scraping and reading your resume carefully..." />
        }
      >
        <ResumeIngestion userId={userId} />
      </Suspense>
    </>
  );
}
