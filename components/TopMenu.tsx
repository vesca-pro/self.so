import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function TopMenu() {
  return (
    <>
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-gray-200 w-6 h-6 rounded-md flex items-center justify-center">
            <span className="text-xs font-medium">S</span>
          </div>
          <span className="font-medium">Self.so</span>
        </Link>

        <div>
          <SignedIn>
            {/* User is signed in */}
            <UserButton />
          </SignedIn>
          <SignedOut>
            {/* User is signed out */}
            <Link href="/upload">
              <Button variant="outline" className="font-medium">
                Sign up &gt;&gt;
              </Button>
            </Link>
          </SignedOut>
        </div>
      </header>
    </>
  );
}
