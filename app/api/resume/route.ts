import { upstashRedis } from "@/lib/redis";
import { ResumeDataSchema } from "@/lib/resume";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
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
  resumeData: ResumeDataSchema.optional(),
});

// Type inference for the resume data
export type ResumeData = z.infer<typeof ResumeDataSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

// API Response Types
export type GetResumeResponse = { resume?: Resume } | { error: string };
export type PostResumeResponse =
  | { success: true }
  | { error: string; details?: z.ZodError["errors"] };

// GET endpoint to retrieve resume
export async function GET(): Promise<NextResponse<GetResumeResponse>> {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resume = await upstashRedis.get<Resume>(user.id);
    if (!resume) {
      return NextResponse.json({ resume: undefined });
    }

    return NextResponse.json({ resume: resume });
  } catch (error) {
    console.error("Error retrieving resume:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST endpoint to store resume
export async function POST(
  request: Request
): Promise<NextResponse<PostResumeResponse>> {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = ResumeSchema.parse(body);

    await upstashRedis.set(user.id, validatedData);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data format", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error storing resume:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
