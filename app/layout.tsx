import "./globals.css";
import type { Metadata } from "next";
import { Inter, Jura } from "next/font/google";

const jura = Jura({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "MetaGallery",
  description: "Your NFTS, displayed the way they were meant to be.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jura.className}>{children}</body>
    </html>
  );
}
