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

    prompt: `Generate a resume object from the following resume text:
    ${resumeText}
    `,
  });

  return object;
};
