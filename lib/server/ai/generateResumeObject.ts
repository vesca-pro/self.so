import { generateObject } from "ai";
import { createTogetherAI } from "@ai-sdk/togetherai";
import { ResumeDataSchema } from "@/lib/resume";

const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_AI_API_KEY ?? "",
});

export const generateResumeObject = async (resumeText: string) => {
  // we can for now do the AI parsing here?
  const { object } = await generateObject({
    model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"),
    schema: ResumeDataSchema,

    prompt: `Generate a resume object from the following resume text,
Generate a resume object from the following resume text. If the resume text does not include an 'about' section or any job with skills mentioned, please generate appropriate content for these sections based on the context of the resume:

For the about section: Create a professional summary that highlights the candidate's experience, expertise, and career objectives.

For the skills on each job: Extract and infer relevant technical and soft skills from the experience and education sections while keeping a max of 4 skills per job.
    ${resumeText}
    `,
  });

  return object;
};
