import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const trustedCrawlers = [
  'Googlebot',
  'Bingbot',
  'Slurp',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Facebot',
  'Twitterbot',
  'Slackbot-LinkExpanding',
  'Applebot',
  'OpenGraphing',
];

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const userAgent = request.headers.get('user-agent') || '';

  // Function to check if the request comes from a trusted crawler
  const isCrawler = trustedCrawlers.some((crawler) =>
    userAgent.includes(crawler)
  );

  if (
    !isCrawler &&
    request.nextUrl.pathname.startsWith('/') &&
    process.env.NODE_ENV === 'production'
  ) {
    const basicAuth = request.headers.get('authorization');

    if (!basicAuth) {
      return new NextResponse('Auth required', {
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
        status: 401,
      });
    } else {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user !== 'togetherai' || pwd !== '7093ther') {
        return new NextResponse('Auth required', {
          headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
          },
          status: 401,
        });
      }
    }

    // This is apparently used by Clerk, but we're using it for basic HTTP auth
    // to keep the site hidden for now. So, we delete after verifying it so that
    // Clerk's middleware functions correctly.
    request.headers.delete('Authorization');
  }

  return clerkMiddleware()(request, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
