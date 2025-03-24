import { auth, clerkClient } from "@clerk/nextjs/server";
import PreviewClient from "./client";
import { getResume } from "../components/resumeActions";

export default async function Preview() {
  const { userId, redirectToSignIn, ...rest } = await auth();

  if (!userId) return redirectToSignIn();

  const response = await (await clerkClient()).users.getUser(userId);

  // let's extract pdf data from the resume here

  const resume = await getResume(userId);

  if (resume && resume.file && !resume.fileContent) {
    // ingest the content from the pdf file
    console.log("scraping text content from pdf");
  }

  // we can for now do the AI parsing here?

  return <PreviewClient initialUserName={userId} />;
}
