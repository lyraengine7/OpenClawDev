import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Mizolla — Creative Director & Designer",
  description: "Portfolio of Mizolla, creative director and visual designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans bg-[#FAFAFA] text-[#1A1A1A] antialiased overflow-x-hidden">
        <LoadingScreen />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
