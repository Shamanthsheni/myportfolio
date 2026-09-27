import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serifFont = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shamanth S — AI, Computer Vision & Deep Learning",
  description:
    "Personal portfolio and research work of Shamanth S. Specializing in Computer Vision, Computational Pathology, Deep Learning architectures, and AI research intelligence.",
  keywords: [
    "Shamanth S",
    "Computer Vision",
    "Deep Learning",
    "Machine Learning",
    "Computational Pathology",
    "AI Research",
    "PyTorch",
    "Bengaluru",
    "CIIRC",
  ],
  authors: [{ name: "Shamanth S", url: "https://github.com/Shamanthsheni" }],
  creator: "Shamanth S",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shamanth.dev",
    title: "Shamanth S — AI, Computer Vision & Deep Learning",
    description:
      "Research engineer specializing in Computational Pathology, Multi-Scale Vision Architectures, and AI Research Intelligence.",
    siteName: "Shamanth S Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shamanth S — AI, Computer Vision & Deep Learning",
    description:
      "Research engineer specializing in Computational Pathology, Multi-Scale Vision Architectures, and AI Research Intelligence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable} font-sans bg-[#FBFBFA] text-[#191C1E] selection:bg-[#E2E8D8] selection:text-[#1E3A18] antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
