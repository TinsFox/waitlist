import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { ViewTransitions } from "next-view-transitions"
import { TooltipProvider } from "@/components/ui/tooltip"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ReactQueryProviders } from "./providers"
import { MdxProvider } from "@/components/mdx-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Professional Product Waitlist Templates",
  description:
    "Professional product waitlist templates, help you quickly build professional product waitlist pages, improve conversion rate",
  keywords: [
    "waitlist",
    "product",
    "template",
    "landing page",
    "product launch",
    "early access",
    "signup page",
    "conversion optimization",
  ],
  metadataBase: new URL("https://waitlist.afjs.dev"),
  authors: [{ name: "TinsFox" }],
  creator: "TinsFox",
  publisher: "TinsFox",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "zh-CN": "/zh",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/light-logo.svg",
        href: "/light-logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    title: "Professional Product Waitlist Templates",
    description:
      "Professional product waitlist templates, help you quickly build professional product waitlist pages, improve conversion rate",
    siteName: "Waitlist Templates",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Waitlist Templates Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Product Waitlist Templates",
    description:
      "Professional product waitlist templates, help you quickly build professional product waitlist pages, improve conversion rate",
    creator: "@your_twitter_handle",
    images: ["/og.png"],
  },
  category: "Technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang="zh" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <MdxProvider>
                <ReactQueryProviders>
                  <NuqsAdapter>
                    <div className="flex min-h-screen flex-col bg-background relative">
                      {children}
                    </div>
                  </NuqsAdapter>
                </ReactQueryProviders>
                <Toaster />
              </MdxProvider>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
