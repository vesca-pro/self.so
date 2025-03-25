import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-4 px-6 flex justify-between items-center mt-auto">
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
          className="text-gray-600 hover:text-gray-900"
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link
          href="#"
          className="text-gray-600 hover:text-gray-900 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center"
        >
          <span className="sr-only">Social</span>
        </Link>
      </div>
    </footer>
  );
}
