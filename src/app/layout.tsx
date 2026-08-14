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
    default: "Skilldeck — All-in-One Platform for Training Companies",
    template: "%s | Skilldeck",
  },
  description: "Automate your marketing, sales, and operations. Skilldeck replaces 10+ tools with one powerful platform for training companies.",
};

import { FormProvider } from "@/components/Forms/FormContext";
import LeadModal from "@/components/Forms/LeadModal";
import { LeadModalProvider } from "@/components/Forms/LeadModalContext";
import GeoLocationInitializer from "@/components/logic/GeoLocationInitializer";
import RouteProgressBar from "@/components/shared/RouteProgressBar";
import { Suspense } from "react";
import DynamicScripts from "@/lib/DynamicScripts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SkillDeck",
    "url": "https://www.skilldeck.net",
    "logo": "https://cloud-local.skilldeck.net/7c33d526-309d-4fc9-83ac-1312cb8c343b/public/uploads/skilldeck_logo-f60d95bc-7df7-45fe-87ac-2e014025a085.png",
    "sameAs": [
      "https://www.linkedin.com/company/skilldeck",
      "https://twitter.com/skilldeck"
    ]
  };

  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://api.skilldeck.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.skilldeck.net" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
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
