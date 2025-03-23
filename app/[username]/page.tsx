import { Education } from "./Education";
import { HeaderCV } from "./HeaderCV";
import { RESUME_DATA } from "./resumeData";
import { Skills } from "./Skills";
import { Summary } from "./Summary";
import { WorkExperience } from "./WorkExperience";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  // In a real implementation, you would fetch the user's profile data here
  // For now, we'll just display a placeholder

  return (
    <section
      className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4"
      aria-label="Resume Content"
    >
      <HeaderCV />

      <div className="space-y-8 print:space-y-4">
        <Summary summary={RESUME_DATA.summary} />

        <WorkExperience work={RESUME_DATA.work} />

        <Education education={RESUME_DATA.education} />

        <Skills skills={RESUME_DATA.skills} />
      </div>
    </section>
  );
}
