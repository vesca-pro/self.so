import { auth } from "@clerk/nextjs/server";
import PreviewClient from "./client";
import { getResume, storeResume } from "../../components/resumeActions";
import { generateResumeObject } from "@/components/server/generateResumeObject";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoadingFallback from "../../components/LoadingFallback";
import { scrapePdfContent } from "@/components/server/scrapePdfContent";

async function ResumeIngestion({ userId }: { userId: string }) {
  const resume = await getResume(userId);

  if (!resume || !resume.file || !resume.file.url) redirect("/resume");

  const fileContent = await scrapePdfContent(resume?.file.url);

  await storeResume(userId, {
    ...resume,
    fileContent: fileContent,
    resumeData: null,
  });

  return (
    <Suspense
      fallback={
        <LoadingFallback message="Processing content with AI to tailor your profile..." />
      }
    >
      <LLMProcessing userId={userId} />
    </Suspense>
  );
}

async function LLMProcessing({ userId }: { userId: string }) {
  const resume = await getResume(userId);
  const resumeObject = await generateResumeObject();

  if (!resume || !resume.file || !resume.file.url) redirect("/resume");

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
