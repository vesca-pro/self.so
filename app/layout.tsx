import type React from "react";
import { JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Metadata } from "next";

const mono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://self.so"),
  title: "Self.so - Resume to Website",
  description: "LinkedIn to Website in one click!",
  openGraph: {
    images: "/og.png",
  },
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
          <body className={`${mono.className} min-h-screen flex flex-col`}>
            <main className="flex-1 flex flex-col">{children}</main>
            <Toaster richColors />
          </body>
        </html>
      </ReactQueryClientProvider>
    </ClerkProvider>
  );
}
