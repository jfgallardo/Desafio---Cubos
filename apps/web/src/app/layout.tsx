import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { CONFIG } from "@/config-global";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { cookies } from "next/headers";
import UITopBar from "@/components/shared/ui-topBar";
import UIFooter from "@/components/shared/ui-footer";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: CONFIG.site.name,
  description: CONFIG.site.description,
};

export default async function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session;
}>) {
  const cookieStore = cookies();
  const theme = (await cookieStore).get("theme");

  return (
    <html lang="pt-br" data-theme={theme?.value}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.className} antialiased `}
      >
        <ToastContainer />
        <SessionProvider session={session} refetchInterval={0}>
          <UITopBar initialValue={theme?.value as "light" | "dark"} />

          <div id="body">{children}</div>

          <UIFooter />
        </SessionProvider>
      </body>
    </html>
  );
}
