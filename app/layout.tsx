import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Haestus | AI-Powered Design & Development",
  description: "We build digital experiences for visionary brands. Design systems, web development, and brand identity powered by AI.",
  icons: {
    icon: [
      { url: '/anvil.png', sizes: '32x32', type: 'image/png' },
      { url: '/anvil.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/anvil.png',
    shortcut: '/anvil.png',
  },
  openGraph: {
    title: "Haestus | AI-Powered Design & Development",
    description: "We build digital experiences for visionary brands. Design systems, web development, and brand identity powered by AI.",
    url: "https://haestus.dev",
    siteName: "Haestus",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Haestus - AI-Powered Design & Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Haestus | AI-Powered Design & Development",
    description: "We build digital experiences for visionary brands. Design systems, web development, and brand identity powered by AI.",
    images: ['/og-image.png'],
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
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
