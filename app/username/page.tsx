import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  // Dummy profile page
  const username = "username"

  return (
    <div className="flex flex-col items-center p-8 flex-1">
      <div className="w-full max-w-3xl space-y-12">
        <div className="flex justify-end">
          <Link href="/preview">
            <Button variant="outline" size="sm">
              Back to Preview
            </Button>
          </Link>
        </div>

        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{username}'s Profile</h1>
          <p className="text-xl text-muted-foreground">Professional Title Would Appear Here</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="text-muted-foreground">Profile information extracted from the resume would appear here.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <div className="border rounded-lg p-6">
            <p className="text-muted-foreground">Work experience extracted from the resume would appear here.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <div className="border rounded-lg p-6">
            <p className="text-muted-foreground">Skills extracted from the resume would appear here.</p>
          </div>
        </section>
      </div>
    </div>
  )
}

