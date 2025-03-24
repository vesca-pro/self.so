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
      <div className="border rounded-md flex items-center w-fit mx-auto min-w-[800px] font-mono">
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

      <iframe src={`/${userName}`} className="w-full h-full min-h-screen" />
    </div>
  );
}
