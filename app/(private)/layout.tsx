import type React from "react";
import { TopMenu } from "../../components/TopMenu";
import { Footer } from "../../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopMenu />
      <section className="flex-1 flex flex-col min-h-[90vh]">
        {children}
      </section>
      <Footer />
    </>
  );
}
