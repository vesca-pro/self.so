import { Section } from "@/components/ui/section";
import { ResumeDataSchemaType } from "@/lib/resume";

export function WorkExperience({
  work,
}: {
  work: ResumeDataSchemaType["workExperience"];
}) {
  return (
    <Section>
      <h2 className="text-lg font-bold" id="work-experience">
        Work Experience
      </h2>
      <div
        className="space-y-4 print:space-y-0"
        role="feed"
        aria-labelledby="work-experience"
      >
        {work.map((item) => {
          return (
            <div className="font-mono flex flex-col justify-start items-start">
              <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative">
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
                  <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-[#050914]">
                    {item.title}
                  </p>
                  <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 px-[7px] py-0.5 rounded bg-[#eeeff0]">
                    <p className="flex-grow-0 flex-shrink-0 text-[12px] font-medium text-center text-[#54575e]">
                      {item.location}
                    </p>
                  </div>
                </div>
                <p className="flex-grow-0 flex-shrink-0 text-sm text-right text-[#54575e]">
                  {item.start} - {item.end ?? "Present"}
                </p>
              </div>
              <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1.5">
                <p className="self-stretch flex-grow-0 flex-shrink-0  h-[15px] text-sm font-medium text-left text-[#54575e] font-mono capitalize gap-1 flex flex-row">
                  <span>{item.company.toLowerCase()}</span>
                  {item.company && item.contract && <span>·</span>}
                  <span>{item.contract}</span>
                </p>
                <p className="self-stretch flex-grow-0 flex-shrink-0  text-sm font-medium text-left text-[#6c737f]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
