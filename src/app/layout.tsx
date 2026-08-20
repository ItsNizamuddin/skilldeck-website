import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "./sprites.css";
import "./typo.css";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Skilldeck — All-in-One Platform for Training Institutes",
    template: "%s | Skilldeck",
  },
  description: "Automate your marketing, sales, and operations. Skilldeck replaces 10+ tools with one powerful platform for training Institutes.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logos/mainlogo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.ico" },
    ],
  },
};

import { FormProvider } from "@/components/Forms/FormContext";
import LeadModal from "@/components/Forms/LeadModal";
import { LeadModalProvider } from "@/components/Forms/LeadModalContext";
import GeoLocationInitializer from "@/components/logic/GeoLocationInitializer";
import RouteProgressBar from "@/components/shared/RouteProgressBar";
import ScrollToTopOnRefresh from "@/components/shared/ScrollToTopOnRefresh";
import { Suspense } from "react";
import DynamicScripts from "@/lib/DynamicScripts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://skilldeck.net/#website",
    "name": "SkillDeck",
    "alternateName": ["Skilldeck", "SkillDeck SaaS", "skilldeck.net"],
    "url": "https://skilldeck.net/"
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://skilldeck.net/#organization",
    "name": "SkillDeck",
    "url": "https://skilldeck.net",
    "logo": "https://skilldeck.net/logos/mainlogo.svg",
    "sameAs": [
      "https://www.linkedin.com/company/skilldeck-software/",
    ]
  };

  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logos/mainlogo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://api64.ipify.org" />
        <link rel="preconnect" href="https://api.skilldeck.net" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.skilldeck.net" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([webSiteSchema, orgSchema]) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ScrollToTopOnRefresh />
        <DynamicScripts />
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <GeoLocationInitializer />
        <FormProvider>
          <LeadModalProvider>
            {children}
            <LeadModal />
          </LeadModalProvider>
        </FormProvider>
      </body>
    </html>
  );
}
