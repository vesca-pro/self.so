"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function PreviewClient({
  initialUserName,
}: {
  initialUserName: string;
}) {
  const router = useRouter();
  const [userName, setUserName] = useState(initialUserName);

  const handlePublish = () => {
    console.log("publish");
    // redirect to the username page with the username
    router.push(`/${userName}`);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* URL Bar */}
      <div className="border-b font-mono">
        <div className="container flex items-center h-14 px-4 max-w-3xl mx-auto">
          <div className="flex items-center flex-1 gap-2">
            <div className="flex items-center h-9 bg-muted rounded-md px-3 flex-1 max-w-xl">
              <span className="text-muted-foreground text-sm">self.so/</span>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-transparent border-0 outline-none focus:outline-none flex-1 px-2 text-sm"
                placeholder="your-username"
              />
            </div>
            <Button variant="outline" size="sm">
              Share
            </Button>
            <Button variant="default" size="sm" onClick={handlePublish}>
              Publish »
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Your Name</h1>
              <p className="text-xl text-muted-foreground">Your Title</p>
              <p className="text-muted-foreground">Location</p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon">
                  📧
                </Button>
                <Button variant="ghost" size="icon">
                  📞
                </Button>
                <Button variant="ghost" size="icon">
                  💼
                </Button>
                <Button variant="ghost" size="icon">
                  🐦
                </Button>
              </div>
            </div>
            <div className="w-32 h-32 rounded-lg bg-muted" />
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your professional summary will appear here...
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Work Experience</h2>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">Company Name</h3>
                    <p className="text-muted-foreground">Your Role</p>
                  </div>
                  <span className="text-muted-foreground">Date Range</span>
                </div>
                <p className="text-muted-foreground">
                  Job description and achievements...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
