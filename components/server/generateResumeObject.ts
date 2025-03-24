import { generateObject } from "ai";
import { createTogetherAI } from "@ai-sdk/togetherai";

const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_AI_API_KEY ?? "",
});
import { ResumeDataSchema } from "@/lib/resume";

const resumeText = `RICCARDO EMANUELE GIORATO
https://linkedin.com/in/riccardo-giorato/ | riccardoemanuelegiorato@gmail.com
https://riccardogiorato.com
SUMMARY
Product Engineer with 6+ years experience building scalable web apps with React, Node.js and
TypeScript. Expert in cloud-native solutions and serverless technologies. Passionate mentor who has
guided 20+ engineers. Seeking remote position.
WORK EXPERIENCE
TEERO
Founding Software Engineer | Remote | June 2022 – current | (2 years 8 months)
• Architected scalable infrastructure using Next.js and TypeScript from Seed to Series A;
• Built nationwide AI/LLM operations using Vercel AI and Claude/Gpt-4o;
• Established engineering best practices and development workflows.
NEULABS @ AMUSI.IT & TRAMUNDI.IT
Product Engineer | Remote | November 2020 – June 2022 | (1 year 6 months)
• Achieved 10x faster query speeds through GraphQL CDN implementation;
• Reduced support tickets by 50% with comprehensive E2E testing strategy.
ATOMS STUDIO
Full Stack Engineer | Padova, Italy | March 2020 – October 2020 | (7 months)
• Led migration from Heroku to AWS Cloud (Lambda, Cloudfront, S3), reducing costs by 30%;
• Optimized CI/CD pipeline reducing build times from 30 to 10 minutes.
DIANA CORP
Junior Front-End Engineer | Padova, Italy | February 2019 – March 2020 | (1 year 1 month)
• Engineered UI component library with Storybook and React with Tailwind CSS.
PROJECTS
MENTOMENTO
• Mentored 20+ software engineers in modern web development.
BETTER PROGRAMMING
• Published 15+ technical articles reaching 50,000+ readers.
EDUCATION
B.S. OR BACHELOR'S DEGREE IN COMPUTER SCIENCE
Università degli Studi di Padova ( Faculty of Mathematics ): 2015 - 2018
SKILLS
Next.js, Typescript, Node.js, TRPC, Tailwind, GraphQL, Vercel AI, Git, Github Actions, Temporal,
Storybook, AWS Lambda, Stripe, Framer Motion, Agile, Technical Writing, Mentoring.
LANGUAGES
English ( Proficient - C2 ) • Italian ( Native Speaker )`;

export const generateResumeObject = async () => {
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
