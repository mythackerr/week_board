import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat();

export const metadata: Metadata = {
  title: "Week Board",
  description: "A 7-day task planner",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${montserrat.className}`}>{children}</body>
    </html>
  );
}
