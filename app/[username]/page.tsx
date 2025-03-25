import { redirect } from "next/navigation";
import { getResume } from "../components/resumeActions";
import { Education } from "./Education";
import { Header } from "./Header";
import { Skills } from "./Skills";
import { Summary } from "./Summary";
import { WorkExperience } from "./WorkExperience";
import { clerkClient } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";
import { Footer } from "../components/Footer";
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

  if (!resume?.resumeData) redirect(`/?usernameNotFound=${username}`);

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

  const allSkills = [
    ...new Set(
      resume?.resumeData?.workExperience.flatMap((work) => work.skills)
    ),
  ];

  return (
    <>
      <section
        className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4 mt-8"
        aria-label="Resume Content"
      >
        <Header
          header={resume?.resumeData?.header}
          picture={clerkUser?.imageUrl}
        />

        <div className="space-y-8 print:space-y-4">
          <Summary summary={resume?.resumeData?.summary} />

          <WorkExperience work={resume?.resumeData?.workExperience} />

          <Education educations={resume?.resumeData.education} />

          <Skills skills={allSkills} />
        </div>
      </section>
      <Footer />
    </>
  );
}
