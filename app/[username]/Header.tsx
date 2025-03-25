import {
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResumeDataSchemaType } from "@/lib/resume";

interface SocialButtonProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

function SocialButton({ href, icon: Icon, label }: SocialButtonProps) {
  return (
    <Button className="size-8" variant="outline" size="icon" asChild>
      <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="size-4" aria-hidden="true" />
      </a>
    </Button>
  );
}

/**
 * Header component displaying personal information and contact details
 */
export function Header({
  header,
  picture,
}: {
  header: ResumeDataSchemaType["header"];
  picture?: string;
}) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex-1 space-y-1.5">
        <h1 className="text-2xl font-bold" id="resume-name">
          {header.name}
        </h1>
        <p
          className="max-w-md text-pretty font-mono text-sm text-foreground/80 print:text-[12px]"
          aria-labelledby="resume-name"
        >
          {header.shortAbout}
        </p>

        <p className="max-w-md items-center text-pretty font-mono text-xs text-foreground">
          <a
            className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              header.location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Location: ${header.location}`}
          >
            <GlobeIcon className="size-3" aria-hidden="true" />
            {header.location}
          </a>
        </p>

        <div
          className="flex gap-x-1 pt-1 font-mono text-sm text-foreground/80 print:hidden"
          role="list"
          aria-label="Contact links"
        >
          {header.contacts.website && (
            <SocialButton
              href={header.contacts.website}
              icon={GlobeIcon}
              label="Personal website"
            />
          )}
          {header.contacts.email && (
            <SocialButton
              href={`mailto:${header.contacts.email}`}
              icon={MailIcon}
              label="Email"
            />
          )}
          {header.contacts.phone && (
            <SocialButton
              href={`tel:${header.contacts.phone}`}
              icon={PhoneIcon}
              label="Phone"
            />
          )}
          {header.contacts.github && (
            <SocialButton
              href={`${header.contacts.github}`}
              icon={Github}
              label="GitHub"
            />
          )}
          {header.contacts.twitter && (
            <SocialButton
              href={`${header.contacts.twitter}`}
              icon={Twitter}
              label="Twitter"
            />
          )}
          {header.contacts.linkedin && (
            <SocialButton
              href={`${header.contacts.linkedin}`}
              icon={Linkedin}
              label="LinkedIn"
            />
          )}
        </div>

        <div
          className="hidden gap-x-2 font-mono text-sm text-foreground/80 print:flex print:text-[12px]"
          aria-label="Print contact information"
        >
          {header.contacts.website && (
            <>
              <a
                className="underline hover:text-foreground/70"
                href={header.contacts.website}
              >
                {new URL(header.contacts.website).hostname}
              </a>
              <span aria-hidden="true">/</span>
            </>
          )}
          {header.contacts.email && (
            <>
              <a
                className="underline hover:text-foreground/70"
                href={`mailto:${header.contacts.email}`}
              >
                {header.contacts.email}
              </a>
              <span aria-hidden="true">/</span>
            </>
          )}
          {header.contacts.phone && (
            <a
              className="underline hover:text-foreground/70"
              href={`tel:${header.contacts.phone}`}
            >
              {header.contacts.phone}
            </a>
          )}
        </div>
      </div>

      <Avatar className="size-28" aria-hidden="true">
        <AvatarImage src={picture} alt={`${header.name}'s profile picture`} />
        <AvatarFallback>
          {header.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
