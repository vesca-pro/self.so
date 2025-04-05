import { Section } from '@/components/ui/section';
import { ResumeDataSchemaType } from '@/lib/resume';

const getYear = (date: string) => {
  const dateObject = new Date(date);
  return dateObject.getFullYear();
};

export function WorkExperience({
  work,
}: {
  work: ResumeDataSchemaType['workExperience'];
}) {
  // Filter out invalid work experiences
  const validWork = work.filter(
    (item) => item.company && item.location && item.title && item.description
  );

  if (validWork.length === 0) {
    return null;
  }

  return (
    <Section>
      <h2 className="text-lg font-bold" id="work-experience">
        Work Experience
      </h2>
      <div
        className="flex flex-col gap-4"
        role="feed"
        aria-labelledby="work-experience"
      >
        {validWork.map((item) => {
          return (
            <div
              key={item.company + item.location + item.title}
              className="font-mono flex flex-col justify-start items-start gap-1 print:mb-4"
            >
              <div className="flex flex-wrap justify-between items-start self-stretch gap-2">
                <div className="flex flex-wrap justify-start items-center gap-2">
                  <p className="text-base font-semibold text-left text-[#050914]">
                    {item.title}
                  </p>
                  <div className="flex justify-center items-center relative overflow-hidden gap-2.5 px-[7px] py-0.5 rounded bg-[#eeeff0]">
                    <p className="text-[12px] font-semibold text-center text-[#54575e]">
                      {item.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-right text-[#54575e]">
                  {getYear(item.start)} -{' '}
                  {!!item.end ? getYear(item.end) : 'Present'}
                </p>
              </div>
              <div className="flex flex-col justify-start items-start relative gap-1.5">
                <p className="self-stretch text-sm font-medium text-left text-[#54575e] font-mono capitalize flex flex-wrap gap-1">
                  <span>{item.company.toLowerCase()}</span>
                  {item.company && item.contract && <span>·</span>}
                  <span>{item.contract}</span>
                </p>
                <p className="self-stretch text-sm font-medium text-left text-[#6c737f]">
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
