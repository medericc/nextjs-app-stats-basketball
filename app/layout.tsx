import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";


 
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Player Stats",
  description: "Discover the statistics of your favorite players, whether from Mondeville, Duke, Rhode Island, ESBVA, or even Fenerbahce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background dark font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
