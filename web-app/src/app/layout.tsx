import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import PrivyProviderWrapper from "@/components/privy-provider-wrapper";

export const metadata: Metadata = {
  title: "Far-Reach",
  description: "For merchants and affiliates to connect and sell products together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${GeistMono.className}`}>
        <PrivyProviderWrapper>
          <>{children}</>
        </PrivyProviderWrapper>
      </body>
    </html>
  );
}
