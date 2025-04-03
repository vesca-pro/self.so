import { auth } from '@clerk/nextjs/server';
import PreviewClient from './client';
import {
  createUsernameLookup,
  getResume,
  getUsernameById,
  storeResume,
} from '../../../lib/server/redisActions';
import { generateResumeObject } from '@/lib/server/ai/generateResumeObject';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import LoadingFallback from '../../../components/LoadingFallback';
import { MAX_USERNAME_LENGTH } from '@/lib/config';

async function LLMProcessing({ userId }: { userId: string }) {
  let resume = await getResume(userId);

  if (!resume?.fileContent) redirect('/upload');

  if (!resume.resumeData) {
    const resumeObject = await generateResumeObject(resume?.fileContent);
    await storeResume(userId, {
      ...resume,
      resumeData: resumeObject,
    });
    resume.resumeData = resumeObject;
  }

  // we set the username only if it wasn't already set for this user meaning it's new user
  const foundUsername = await getUsernameById(userId);

  const hashLength = 6;

  if (!foundUsername) {
    const username =
      (
        (resume.resumeData.header.name || 'user')
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-') + '-'
      ).slice(0, MAX_USERNAME_LENGTH - hashLength) +
      Math.random()
        .toString(36)
        .substring(2, 2 + hashLength);

    const creation = await createUsernameLookup({
      userId,
      username,
    });

    if (!creation) redirect('/upload?error=usernameCreationFailed');
  }

  return <PreviewClient />;
}

export default async function Preview() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <>
      <Suspense
        fallback={
          <LoadingFallback message='Creating your personal website...' />
        }
      >
        <LLMProcessing userId={userId} />
      </Suspense>
    </>
  );
}
