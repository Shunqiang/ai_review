import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI代码审查仪表盘",
  description: "AI Code Review Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="dark">
      <body>{children}</body>
    </html>
  );
}
