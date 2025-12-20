import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Rajdhani, Teko, Russo_One, Exo_2, Chakra_Petch, Black_Ops_One } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Font untuk layout Default - Futuristic & Tech
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Font untuk layout Classic - Bold & Strong
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Font untuk layout Futuristic - Tall & Modern
const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Font untuk layout Neon - Gaming & Bold
const russoOne = Russo_One({
  variable: "--font-russo",
  subsets: ["latin"],
  weight: "400",
});

// Font untuk layout Elegant - Premium & Stylish
const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Font untuk layout Cyber - Cyberpunk Style
const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Font untuk layout Minimal - Clean & Bold
const blackOpsOne = Black_Ops_One({
  variable: "--font-blackops",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "RTP991",
  description: "RTP Live Generator - Generate gambar RTP Live untuk website kasino online Indonesia. Support Pragmatic Play & PG Soft dengan berbagai layout menarik.",
  keywords: ["RTP991", "RTP Live", "Pragmatic Play", "PG Soft", "Slot Online", "Casino", "RTP Generator"],
  authors: [{ name: "RTP991 Team" }],
  openGraph: {
    title: "RTP991 - RTP Live Generator",
    description: "Generate gambar RTP Live untuk website kasino online Indonesia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RTP991 - RTP Live Generator",
    description: "Generate gambar RTP Live untuk website kasino online Indonesia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${rajdhani.variable} ${teko.variable} ${russoOne.variable} ${exo2.variable} ${chakraPetch.variable} ${blackOpsOne.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
