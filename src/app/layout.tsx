import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Set up your Monad dev environment",
  description:
    "One-command setup for Scaffold-ETH 2 (Foundry) workshops, pre-wired for Monad Testnet. Windows, macOS, and Linux.",
  metadataBase: new URL("https://setup.devnads.com"),
  openGraph: {
    title: "Set up your Monad dev environment",
    description:
      "One-command setup for Scaffold-ETH 2 (Foundry) workshops, pre-wired for Monad Testnet.",
    url: "https://setup.devnads.com",
    siteName: "devnads",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
