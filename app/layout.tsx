import type React from "react";
import { Inter } from "next/font/google";
import { TopMenu } from "./components/TopMenu";
import { Footer } from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

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
