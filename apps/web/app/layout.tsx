import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Ibibanza",
  description: "Ibibanza bigurishwa mu Rwanda, bifasha abaguzi kubona amakuru no gusaba gusura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="rw" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
