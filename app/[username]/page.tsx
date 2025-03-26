import { redirect } from "next/navigation";
import { getResume, getUserIdByUsername } from "../../lib/server/redisActions";
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
