import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopMenu } from "@/components/TopMenu";
import { Footer } from "@/components/Footer";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Self.so - Resume to Website",
  description: "Convert your resume to a personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ReactQueryClientProvider>
        <html lang="en">
          <body className={`${inter.className} min-h-screen flex flex-col`}>
            <TopMenu />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <Toaster richColors />
          </body>
        </html>
      </ReactQueryClientProvider>
    </ClerkProvider>
  );
}

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
