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
  metadataBase: new URL("https://khushaanvirk.com"),
  title: "Khushaan Virk",
  description:
    "Electrical Engineering student at UBC. Embedded systems, PCB design, and hardware-software integration.",
  openGraph: {
    title: "Khushaan Virk",
    description:
      "Electrical Engineering student at UBC. Embedded systems, PCB design, and hardware-software integration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0A0A] text-[#F5F5F5]`}
      >
        {children}
      </body>
    </html>
  );
}
