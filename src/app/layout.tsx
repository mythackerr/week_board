import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Provider } from "jotai";

const montserrat = Montserrat();

export const metadata: Metadata = {
  title: "Week Board",
  description: "A 7-day task planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={`antialiased ${montserrat.className}`}>
          {children}
        </body>
      </Provider>
    </html>
  );
}
