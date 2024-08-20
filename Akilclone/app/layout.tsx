// app/layout.tsx or app/layout.js
"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head></head>
      <body>
        <Providers>
          <SessionProvider>{children}</SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
