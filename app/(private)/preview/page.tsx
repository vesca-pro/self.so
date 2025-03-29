import { auth } from "@clerk/nextjs/server";
import PreviewClient from "./client";
import {
  createUsernameLookup,
  getResume,
  getUsernameById,
  storeResume,
} from "../../../lib/server/redisActions";
import { generateResumeObject } from "@/lib/server/ai/generateResumeObject";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoadingFallback from "../../../components/LoadingFallback";
import { scrapePdfContent } from "@/lib/server/scrapePdfContent";
import { MAX_USERNAME_LENGTH } from "@/lib/config";
import { deleteS3File } from "@/lib/server/deleteS3File";

async function ResumeIngestion({ userId }: { userId: string }) {
  const resume = await getResume(userId);

  if (!resume || !resume.file || !resume.file.url) redirect("/upload");

  if (!resume.fileContent) {
    const fileContent = await scrapePdfContent(resume?.file.url);

    // check if the fileContent was good or bad, if bad we redirect to the upload page and delete the object from S3 and redis
    const isContentBad = false; // await isFileContentBad(fileContent);

    if (isContentBad) {
      await deleteS3File({
        bucket: resume.file.bucket,
        key: resume.file.key,
      });

      await storeResume(userId, {
        ...resume,
        file: undefined,
        fileContent: null,
        resumeData: null,
      });

      redirect("/upload");
    }

    await storeResume(userId, {
      ...resume,
      fileContent: fileContent,
      resumeData: null,
    });
  }

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
  let resume = await getResume(userId);

  if (!resume?.fileContent) redirect("/upload");

  if (!resume.resumeData) {
    const resumeObject = await generateResumeObject(resume?.fileContent);
    await storeResume(userId, {
      ...resume,
      resumeData: resumeObject,
    });
    resume.resumeData = resumeObject;
  }

  // we set the username only if it wasn't already set for this user meaning it's new user
  const foundUsername = await getUsernameById(userId);

  const hashLength = 6;

  if (!foundUsername) {
    const username =
      (
        (resume.resumeData.header.name || "user")
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-") + "-"
      ).slice(0, MAX_USERNAME_LENGTH - hashLength) +
      Math.random()
        .toString(36)
        .substring(2, 2 + hashLength);

    const creation = await createUsernameLookup({
      userId,
      username,
    });

    if (!creation) redirect("/resume?error=usernameCreationFailed");
  }

  return <PreviewClient />;
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
