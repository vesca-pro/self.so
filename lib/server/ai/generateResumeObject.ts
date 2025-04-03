import { generateObject } from 'ai';
import { createTogetherAI } from '@ai-sdk/togetherai';
import { ResumeDataSchema } from '@/lib/resume';
import dedent from 'dedent';

const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_API_KEY ?? '',
});

export const generateResumeObject = async (resumeText: string) => {
  const startTime = Date.now();
  // we can for now do the AI parsing here?
  const { object } = await generateObject({
    model: togetherai('meta-llama/Llama-3.3-70B-Instruct-Turbo'),
    schema: ResumeDataSchema,
    prompt: dedent`You are an expert resume writer. Generate a resume object from the following resume text. Be professional and concise.

    ## Instructions:

    - If the resume text does not include an 'about' section or specfic skills mentioned, please generate appropriate content for these sections based on the context of the resume and based on the job role.
    - For the about section: Create a professional summary that highlights the candidate's experience, expertise, and career objectives.
    - For the skills: Generate a maximum of 10 skills taken from the ones mentioned in the resume text or based on the job role / job title infer some if not present.

    ## Resume text:

    ${resumeText}
    `,
  });

  const endTime = Date.now();
  console.log(
    `Generating resume object took ${(endTime - startTime) / 1000} seconds`
  );

  return object;
};
