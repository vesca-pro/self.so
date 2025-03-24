import { auth, clerkClient } from "@clerk/nextjs/server";
import PreviewClient from "./client";
import { getResume, storeResume } from "../components/resumeActions";
import { generateResumeObject } from "@/components/server/generateResumeObject";
import { redirect } from "next/navigation";

export default async function Preview() {
  const { userId, redirectToSignIn, ...rest } = await auth();

  if (!userId) return redirectToSignIn();

  const response = await (await clerkClient()).users.getUser(userId);

  // let's extract pdf data from the resume here

  const resume = await getResume(userId);

  if (!resume || !resume.file) redirect("/resume");

  // if (resume && resume.file && !resume.fileContent) {
  //   // ingest the content from the pdf file
  //   console.log("scraping text content from pdf");

  //   return <> Scraping content from pdf</>;
  // }

  const resumeObject = await generateResumeObject();

  await storeResume(userId, {
    ...resume,
    resumeData: resumeObject,
  });

  return <PreviewClient initialUserName={userId} />;
}
