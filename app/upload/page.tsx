import UploadPageClient from "./client";
import { auth } from "@clerk/nextjs/server";

export default async function UploadPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return <UploadPageClient />;
}
