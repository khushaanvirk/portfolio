import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khushaanvirk.com"),
  title: "Khushaan Virk",
  description:
    "Electrical Engineering student at UBC. I design PCBs and write embedded firmware, from schematic to bring-up.",
  openGraph: {
    title: "Khushaan Virk",
    description:
      "Electrical Engineering student at UBC. I design PCBs and write embedded firmware, from schematic to bring-up.",
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
        className={`${inter.variable} ${jetbrainsMono.variable} bg-background font-sans text-[15px] leading-[1.6] text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
