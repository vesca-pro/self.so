import { generateObject } from "ai";
import { createTogetherAI } from "@ai-sdk/togetherai";
import { ResumeDataSchema } from "@/lib/resume";

const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_AI_API_KEY ?? "",
});

export const generateResumeObject = async (resumeText: string) => {
  const startTime = Date.now();
  // we can for now do the AI parsing here?
  const { object } = await generateObject({
    model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo"),
    schema: ResumeDataSchema,

    prompt: `Generate a resume object from the following resume text,
Generate a resume object from the following resume text. If the resume text does not include an 'about' section or specfic skills mentioned, please generate appropriate content for these sections based on the context of the resume and based on the job role:

For the about section: Create a professional summary that highlights the candidate's experience, expertise, and career objectives.

For the skills generate a maximum of 15 skills taken from the ones mentioned in the resume text or based on the job role / job title infer some if not present.
    ${resumeText}
    `,
  });

  const endTime = Date.now();
  console.log(
    `Generating resume object took ${(endTime - startTime) / 1000} seconds`
  );

  return object;
};
