import type { Metadata } from "next";
import "./globals.css";

import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import Header from "./Header";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const cursive = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cursive",
});

export const metadata: Metadata = {
  title: "Avery & Liam",
  description: "Avery and Liam's website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geist.variable}
          ${geistMono.variable}
          ${cursive.variable}
          antialiased
        `}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
