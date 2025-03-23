import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
      <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
