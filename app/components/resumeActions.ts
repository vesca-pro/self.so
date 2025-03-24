import { upstashRedis } from "@/lib/redis";
import { ResumeDataSchema } from "@/lib/resume";
import { z } from "zod";

// Define the file schema
const FileSchema = z.object({
  name: z.string(),
  url: z.string().optional(),
  size: z.number(),
});

// Define the complete resume schema
const ResumeSchema = z.object({
  file: FileSchema,
  fileContent: z.string().optional(),
  resumeData: ResumeDataSchema.optional(),
});

// Type inference for the resume data
export type ResumeData = z.infer<typeof ResumeDataSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

// Function to get resume data for a user
export async function getResume(userId: string): Promise<Resume | undefined> {
  try {
    const resume = await upstashRedis.get<Resume>(userId);
    return resume || undefined;
  } catch (error) {
    console.error("Error retrieving resume:", error);
    throw new Error("Failed to retrieve resume");
  }
}

// Function to store resume data for a user
export async function storeResume(
  userId: string,
  resumeData: Resume
): Promise<void> {
  try {
    const validatedData = ResumeSchema.parse(resumeData);
    await upstashRedis.set(userId, validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error;
    }
    console.error("Error storing resume:", error);
    throw new Error("Failed to store resume");
  }
}
