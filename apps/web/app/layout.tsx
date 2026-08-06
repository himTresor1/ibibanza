import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="rw">
      <body>{children}</body>
    </html>
  );
}
