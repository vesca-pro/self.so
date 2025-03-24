import { redirect } from "next/navigation";
import { getResume } from "../components/resumeActions";
import { Education } from "./Education";
import { Header } from "./Header";
import { Skills } from "./Skills";
import { Summary } from "./Summary";
import { WorkExperience } from "./WorkExperience";
export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  // In a real implementation, you would fetch the user's profile data here
  // For now, we'll just display a placeholder

  const resume = await getResume(username);

  if (!resume?.resumeData) redirect(`/?usernameNotFound=${username}`);

  const allSkills = [
    ...new Set(
      resume?.resumeData?.workExperience.flatMap((work) => work.skills)
    ),
  ];

  return (
    <section
      className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4"
      aria-label="Resume Content"
    >
      <Header header={resume?.resumeData?.header} />

      <div className="space-y-8 print:space-y-4">
        <Summary summary={resume?.resumeData?.summary} />

        <WorkExperience work={resume?.resumeData?.workExperience} />

        <Education educations={resume?.resumeData.education} />

        <Skills skills={allSkills} />
      </div>
    </section>
  );
}
