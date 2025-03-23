import { auth } from "@clerk/nextjs/server";
import PreviewClient from "./client";

export default async function Preview() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return <PreviewClient initialUserName={userId} />;
}
