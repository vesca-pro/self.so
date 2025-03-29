import { redirect } from "next/navigation";
import { getResume, getUserIdByUsername } from "../../lib/server/redisActions";
import { clerkClient } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { FullResume } from "@/components/resume/FullResume";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user_id = await getUserIdByUsername(username);

  if (!user_id) {
    return {
      title: "User Not Found | Self.so",
      description: "This user profile could not be found on Self.so",
    };
  }

  const resume = await getResume(user_id);

  if (!resume?.resumeData || resume.status !== "live") {
    return {
      title: "Resume Not Found | Self.so",
      description: "This resume could not be found on Self.so",
    };
  }

  return {
    title: `${resume.resumeData.header.name}'s Resume | Self.so`,
    description: resume.resumeData.summary,
    openGraph: {
      title: `${resume.resumeData.header.name}'s Resume | Self.so`,
      description: resume.resumeData.summary,
    },
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user_id = await getUserIdByUsername(username);

  if (!user_id) redirect(`/?usernameNotFound=${username}`);

  const resume = await getResume(user_id);

  if (!resume?.resumeData || resume.status !== "live")
    redirect(`/?idNotFound=${user_id}`);

  const getCachedUser = unstable_cache(
    async () => {
      return await (await clerkClient()).users.getUser(user_id);
    },
    [user_id],
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
        <Link
          href={`/?ref=${username}`}
          className="text-design-gray font-mono text-sm"
        >
          Made by{" "}
          <span className="text-design-black underline underline-offset-2">
            Self.so
          </span>
        </Link>
      </div>
    </>
  );
}
