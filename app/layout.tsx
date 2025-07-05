import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Anonibara - Private ENS Communities",
  description: "Join private communities with verified identity using ENS and zero-knowledge proofs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-serif`}>
        <div className="min-h-screen bg-gradient-to-br from-[#fff4ec] via-[#f2bfa4] to-[#2e2a4d] text-[#2e2a4d]">
          {children}
        </div>
      </body>
    </html>
  )
}
