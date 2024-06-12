import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import PrivyProviderWrapper from "@/components/privy-provider-wrapper";
import { UserProfileProvider } from "./providers/profileProvider";

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
          <UserProfileProvider>
            <>{children}</>
          </UserProfileProvider>
        </PrivyProviderWrapper>
      </body>
    </html>
  );
}
