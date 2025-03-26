import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-4 px-6 flex justify-between items-center mt-auto flex-col-reverse md:flex-row gap-2 border-t border-gray-200">
      <div className="text-sm text-design-gray font-mono font-bold">
        Powered by{" "}
        <Link
          href="https://together.ai"
          className="text-design-black underline underline-offset-2"
        >
          Together.ai
        </Link>{" "}
        & <span className="text-design-black">Llama 3.1</span>
      </div>

      <div className="flex gap-2">
        <Link
          href="https://github.com"
          className="size-[22px] flex items-center justify-center border-design-gray border rounded-md"
        >
          <img src="/footer/github.svg" className="size-3" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link
          href="https://x.com"
          className="size-[22px] flex items-center justify-center border-design-gray border rounded-md"
        >
          <img src="/footer/x.svg" className="size-[15px]" />
          <span className="sr-only">Social</span>
        </Link>
      </div>
    </footer>
  );
}
