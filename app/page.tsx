import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  Play,
  Mail,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { TopMenu } from "../components/TopMenu";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <TopMenu />

      <section className="flex-1 flex flex-col">
        <div className="flex flex-col min-h-[80vh]">
          {/* Main content */}
          <div className="flex-1 flex flex-col md:flex-row max-w-4xl mx-auto items-center px-5 pt-8 md:pt-0">
            {/* Left side - Call to action */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start max-w-96">
              <div className="max-w-md text-center md:text-left">
                <div className="inline-block font-mono gap-2.5 px-2.5 py-1.5 rounded bg-gray-100 text-sm mb-5 text-design-gray">
                  100% free & open source
                </div>

                <h1 className="text-[32px] font-bold mb-4 flex items-center justify-center md:justify-start gap-2 flex-wrap text-design-black font-mono">
                  <span>LinkedIn</span>
                  <img
                    src="/right-arrow.png"
                    alt="Arrow Right Icon"
                    width={32}
                    height={32}
                    className="inline size-8"
                  />
                  <span>Website</span>
                  <br />
                  <span>
                    in one <span className="hidden sm:inline">click</span>
                  </span>
                  <img
                    src="/highlight-pointer.png"
                    alt="Pointer Icon"
                    width={37}
                    height={37}
                    className="size-[37px] text-gray-400"
                  />
                </h1>

                <p className="text-xl text-gray-600 mb-[30px] font-mono text-center md:text-left">
                  Turn your resume/LinkedIn into a professional website.
                </p>

                <div className="relative flex flex-col items-center font-mono w-full md:w-fit">
                  <Link href="/upload">
                    <Button className="bg-design-black hover:bg-design-black/95 text-white px-6 py-3 h-auto text-lg">
                      <img
                        src="/sparkle.png"
                        alt="Sparkle Icon"
                        className="h-5 w-5 mr-2"
                      />
                      Upload Resume
                    </Button>
                  </Link>

                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Takes 1 minute!
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Preview */}
            <div className="w-full md:w-1/2 flex justify-center items-center flex-1 relative max-h-[700px] animate-in fade-in scale-95 duration-1000">
              <div className="absolute inset-0 -bottom-4 rounded-3xl bg-black/5 blur-xl h-full"></div>

              <img
                src="/cv-home.png"
                className="relative w-full max-w-[480px] h-[auto] object-fit overflow-hidden"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
