"use client";

import "~/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col justify-between bg-gradient-to-b from-[#1e2124] to-[#282B30]">
        {children}
      </body>
    </html>
  );
}
