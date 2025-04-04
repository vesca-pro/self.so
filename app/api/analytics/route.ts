import { upstashRedis } from '@/lib/server/redis';
import { Resume } from '@/lib/server/redisActions';
import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

// API Response Types
export type GetResponse =
  | {
      totalResumes: number;
      publishedResumes: number;
    }
  | { error: string };

// Cached function to fetch analytics
const getCachedAnalytics = unstable_cache(
  async () => {
    const keys = await upstashRedis.keys('resume:*');
    let publishedCount = 0;

    for (const key of keys) {
      const resume = (await upstashRedis.get(key)) as Resume;
      if (resume && resume.status === 'live') {
        publishedCount++;
      }
    }

    return {
      totalResumes: keys.length,
      publishedResumes: publishedCount,
    };
  },
  ['analytics'],
  {
    tags: ['analytics'],
    revalidate: 60, // Cache for 1 minute
  }
);

// GET endpoint to fetch resume analytics
export async function GET(): Promise<NextResponse<GetResponse>> {
  try {
    const analytics = await getCachedAnalytics();
    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching resume analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
