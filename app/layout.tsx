import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Happy Birthday, My Love",
  description: "A special birthday surprise made just for you",
  generator: "Kunal Shroff",
  icons: {
    icon: [
      {
        url: "/img-9.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/img-9.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/img-9.jpeg",
        type: "image/svg+xml",
      },
    ],
    apple: "/img-9.jpeg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
