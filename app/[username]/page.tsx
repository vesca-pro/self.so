import { redirect } from "next/navigation";
import { getResume } from "../../lib/server/redisActions";
import { Education } from "../../components/resume/Education";
import { Header } from "../../components/resume/Header";
import { Skills } from "../../components/resume/Skills";
import { Summary } from "../../components/resume/Summary";
import { WorkExperience } from "../../components/resume/WorkExperience";
import { clerkClient } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { FullResume } from "@/components/resume/FullResume";
export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const getCachedResume = unstable_cache(
    async () => {
      return await getResume(username);
    },
    [username],
    {
      tags: ["resumes"],
      revalidate: 60, // 1 day in seconds
    }
  );

  const resume = await getCachedResume();

  if (!resume?.resumeData || resume.status !== "live")
    redirect(`/?usernameNotFound=${username}`);

  const getCachedUser = unstable_cache(
    async () => {
      return await (await clerkClient()).users.getUser(username);
    },
    [username],
    {
      tags: ["users"],
      revalidate: 86400, // 1 day in seconds
    }
  );
  const clerkUser = await getCachedUser();

  return (
    <>
      <FullResume
        resume={resume?.resumeData}
        profilePicture={clerkUser?.imageUrl}
      />

      <div className="text-center mt-8 mb-4">
        <Link href="/" className="text-design-gray font-mono text-sm">
          Made by{" "}
          <span className="text-design-black underline underline-offset-2">
            Self.so
          </span>
        </Link>
      </div>
    </>
  );
}
