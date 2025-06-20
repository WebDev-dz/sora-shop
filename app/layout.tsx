import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import QueryProvider from "@/components/providers/query-provider";

const cairo = Cairo({ subsets: ["arabic", "latin"] });

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

// Define metadata for better SEO
export const metadata: Metadata = {
  title: {
    default: "متجر الكتروني جزائري | Ménage Bazita",
    template: "%s | Ménage Bazita",
  },
  description:
    "Ménage Bazita - تسوق أفضل المنتجات بأسعار تنافسية مع خدمة توصيل سريعة",
  generator: "Next.js",
  applicationName: "متجر الكتروني جزائري",
  keywords: [
    "تسوق عبر الإنترنت",
    "متجر الكتروني",
    "الجزائر",
    "بيع",
    "شراء",
    "منتجات",
    "توصيل",
  ],
  authors: [{ name: "متجر الكتروني جزائري" }],
  creator: "متجر الكتروني جزائري",
  publisher: "متجر الكتروني جزائري",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ), // Dynamic base URL
  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
      fr: "/",
      en: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar",
    alternateLocale: ["fr", "en"],
    url: "/",
    title: "متجر الكتروني جزائري",
    description:
      "متجر الكتروني جزائري للتسوق عبر الإنترنت - تسوق أفضل المنتجات بأسعار تنافسية مع خدمة توصيل سريعة",
    siteName: "متجر الكتروني جزائري",
    images: [
      {
        url: "/store.logo.jpeg", // Reference logo from public folder
        width: 1200,
        height: 630,
        alt: "متجر الكتروني جزائري",
      },
    ],
  },
  
  
  category: "Ecommerce",
};

// Define viewport for responsive design
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Favicon and manifest */}
        <link
          rel="icon"
          
          href={NEXT_PUBLIC_BASE_URL + "/favicon.ico"}
        />
       
        <meta name="msapplication-TileColor" content="#da532c" />

        {/* Preload critical images */}
        <link
          rel="preload"
          href="/store.logo.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/landing.image.png"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className={cairo.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LanguageProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 flex flex-col justify-center items-center min-h-[60vh]">{children}</main>
                <Footer />
              </div>
            </LanguageProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}