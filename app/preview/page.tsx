import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4">
      <div className="w-full max-w-3xl space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Website Preview</h1>
          <Link href="/upload">
            <Button variant="outline" size="sm">
              Back to Upload
            </Button>
          </Link>
        </div>

        <div className="border rounded-lg p-8 min-h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">Your website will appear here after uploading and processing your PDF</p>
        </div>

        <div className="pt-4">
          <Link href="/username">
            <Button className="w-full">Publish Website</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

