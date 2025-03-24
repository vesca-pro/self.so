import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { ResumeDataSchemaType } from "@/lib/resume";

/**
 * Work experience section component
 * Renders a list of work experiences in chronological order
 */
export function WorkExperience({
  work,
}: {
  work: ResumeDataSchemaType["workExperience"];
}) {
  return (
    <Section>
      <h2 className="text-xl font-bold" id="work-experience">
        Work Experience
      </h2>
      <div
        className="space-y-4 print:space-y-0"
        role="feed"
        aria-labelledby="work-experience"
      >
        {work.map((item) => {
          const { company, link, skills, title, start, end, description } =
            item;

          return (
            <article key={`${company}-${start}`} role="article">
              <Card className="py-1 print:py-0">
                <CardHeader className="print:space-y-1">
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none print:text-sm">
                      <a
                        className="hover:underline"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${company} company website`}
                      >
                        {company}
                      </a>
                      {skills.length > 0 && (
                        <ul
                          className={cn(
                            "inline-flex list-none gap-x-1 p-0",
                            "hidden gap-x-1 sm:inline-flex"
                          )}
                          aria-label="Technologies used"
                        >
                          {skills.map((skill) => (
                            <li key={skill}>
                              <Badge
                                variant="secondary"
                                className="align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
                              >
                                {skill}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                      )}
                    </h3>
                    <div
                      className="text-sm tabular-nums text-gray-500"
                      aria-label={`Employment period: ${start} to ${
                        end ?? "Present"
                      }`}
                    >
                      {start} - {end ?? "Present"}
                    </div>
                  </div>

                  <h4 className="font-mono text-sm font-semibold leading-none print:text-[12px]">
                    {title}
                  </h4>
                </CardHeader>

                <CardContent>
                  <div className="mt-2 text-xs text-foreground/80 print:mt-1 print:text-[10px] text-pretty">
                    {description}
                  </div>
                  <div className="mt-2">
                    {skills.length > 0 && (
                      <ul
                        className={cn(
                          "inline-flex list-none gap-x-1 p-0",
                          "-mx-2 flex-wrap gap-1 sm:hidden"
                        )}
                        aria-label="Technologies used"
                      >
                        {skills.map((skill) => (
                          <li key={skill}>
                            <Badge
                              variant="secondary"
                              className="align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
                            >
                              {skill}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
