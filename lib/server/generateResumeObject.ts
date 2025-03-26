import { generateObject } from "ai";
import { createTogetherAI } from "@ai-sdk/togetherai";

const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_AI_API_KEY ?? "",
});
import { ResumeDataSchema } from "@/lib/resume";

export const generateResumeObject = async (resumeText: string) => {
  // we can for now do the AI parsing here?
  const { object } = await generateObject({
    model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"),
    schema: ResumeDataSchema,
    prompt: `Generate a resume object from the following resume text:

    ${resumeText}
    `,
  });

  console.log("resume object", object);

  return object;
};
