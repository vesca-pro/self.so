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
import { TopMenu } from "./components/TopMenu";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <TopMenu />

      <section className="flex-1 flex flex-col">
        <div className="flex flex-col min-h-screen">
          {/* Main content */}
          <div className="flex-1 flex flex-col md:flex-row">
            {/* Left side - Call to action */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-8 md:px-16 py-12">
              <div className="max-w-md">
                <div className="inline-block font-mono gap-2.5 px-2.5 py-1.5 rounded bg-gray-100 text-sm mb-5 text-design-gray">
                  100% free & open source
                </div>

                <h1 className="text-[32px] font-bold mb-4 flex items-center gap-2 flex-wrap text-design-black font-mono">
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

                <p className="text-xl text-gray-600 mb-[30px] font-mono">
                  Turn your resume/LinkedIn into a professional website.
                </p>

                <div className="relative flex flex-col items-center font-mono w-fit">
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
            <div className="w-full md:w-1/2 bg-gray-50 flex justify-center items-center p-8">
              <div className="relative w-full max-w-lg">
                {/* Shadow cards for depth effect */}
                <div className="absolute top-2 left-2 right-2 bottom-0 bg-white rounded-xl shadow-sm transform rotate-1"></div>
                <div className="absolute top-1 left-1 right-1 bottom-0 bg-white rounded-xl shadow-sm transform -rotate-1"></div>

                {/* Main profile card */}
                <div className="relative bg-white rounded-xl shadow-md p-6 overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">Bartosz Jarocki</h2>
                      <p className="text-gray-600 text-sm mt-1">
                        Full Stack Engineer focused on building products
                        <br />
                        with extra attention to details
                        <br />
                        Wrocław, Poland, CET
                      </p>

                      <div className="flex gap-3 mt-4">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <Phone className="h-4 w-4 text-gray-400" />
                        <Github className="h-4 w-4 text-gray-400" />
                        <Linkedin className="h-4 w-4 text-gray-400" />
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="shrink-0">
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-200">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="Profile"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold mb-2">About</h3>
                      <p className="text-sm text-gray-600">
                        As a Full Stack Engineer, I have successfully taken
                        multiple products from 0 to 1. I lead teams effectively,
                        ensuring an environment where people can do their best
                        work. Currently, I work mostly with TypeScript, React,
                        Node.js, and GraphQL. I have over 8 years of experience
                        in working remotely with companies all around the world.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-2">
                        Work Experience
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">
                              Parabol{" "}
                              <span className="text-xs text-gray-500">
                                Remote
                              </span>
                            </div>
                            <div className="text-sm">
                              Senior Full Stack Developer
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            2021 - 2024
                          </div>
                        </div>

                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">
                              Clevertech{" "}
                              <span className="text-xs text-gray-500">
                                Remote
                              </span>
                            </div>
                            <div className="text-sm">
                              Lead Android Developer + Full Stack Developer
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            2015 - 2021
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                          JavaScript
                        </span>
                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                          TypeScript
                        </span>
                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                          React/Next.js/Remix
                        </span>
                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                          Node.js
                        </span>
                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                          GraphQL
                        </span>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
