import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prakharbhatia.com"),
  title: {
    default: "Prakhar Bhatia — Full-Stack Developer · Agentic AI · Web3",
    template: "%s",
  },
  description:
    "Prakhar Bhatia builds full-stack products with AI, Rust, Python, Node.js, React and Next.js. 20+ years across the stack, agentic AI systems, Web3 and FinTech. Founder of Nandann Creative Agency.",
  keywords: [
    "Prakhar Bhatia", "full-stack developer", "agentic AI", "Rust", "Python",
    "Node.js", "React", "Next.js", "Web3", "DeFi", "Salesforce", "FinTech",
    "LLM integration", "voice AI", "Nandann Creative Agency",
  ],
  authors: [{ name: "Prakhar Bhatia", url: "https://prakharbhatia.com" }],
  creator: "Prakhar Bhatia",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://prakharbhatia.com",
    siteName: "Prakhar Bhatia",
    title: "Prakhar Bhatia — Full-Stack · Agentic AI · Web3",
    description:
      "Full-stack products with AI, Rust, Python & the modern web. 20+ years, agentic AI systems, Web3, FinTech.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prakhar Bhatia — Full-Stack · Agentic AI · Web3",
    description:
      "Full-stack products with AI, Rust, Python & the modern web. 20+ years, agentic AI systems, Web3, FinTech.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
