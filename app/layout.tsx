"use client"

import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"


import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  Theme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

// export const metadata: Metadata = {
//   title: "Anonibara - Private ENS Communities",
//   description: "Join private communities with verified identity using ENS and zero-knowledge proofs",
//     generator: 'v0.dev'
// }

// Define your custom theme using CSS variables from globals.css
const myCustomTheme: Theme = {
  blurs: {
    modalOverlay: 'blur(10px)', // Example value
  },
  colors: {
    accentColor: '#F5C3A6', // Lighter peach for buttons
    accentColorForeground: '#FFFFFF', // White text on peach button
    actionButtonBorder: '#C79C8B', // Darker peach for border
    actionButtonBorderMobile: '#C79C8B',
    actionButtonSecondaryBackground: '#F5C3A6', // Lighter peach for secondary actions
    closeButton: '#FFFFFF', // White close button
    closeButtonBackground: '#F5C3A6', // Lighter peach background for close button
    connectButtonBackground: '#F5C3A6', // Lighter peach background for connect button
    connectButtonBackgroundError: '#C79C8B', // Darker peach for error
    connectButtonInnerBackground: '#FFF0F5', // Lavender blush for inner background
    connectButtonText: '#FFFFFF', // White text
    connectButtonTextError: '#FFFFFF', // White text on error
    connectionIndicator: '#F5C3A6', // Lighter peach indicator
    downloadBottomCardBackground: '#FFF0F5', // Lavender blush
    downloadTopCardBackground: '#FFF0F5',
    error: '#C79C8B', // Darker peach for errors
    generalBorder: '#C79C8B', // Darker peach for borders
    generalBorderDim: '#C79C8B',
    menuItemBackground: '#FFF0F5', // Lavender blush for menu items
    modalBackdrop: 'rgba(0, 0, 0, 0.7)', // Solid backdrop
    modalBackground: '#F5C3A6', // Lighter peach background for modal
    modalBorder: '#C79C8B', // Darker peach for modal border
    modalText: '#000000', // Black text for modal
    modalTextDim: '#696969', // Dim gray for secondary text
    modalTextSecondary: '#A9A9A9', // Dark gray for secondary text
    profileAction: '#F5C3A6', // Lighter peach for profile actions
    profileActionHover: '#C79C8B', // Darker peach on hover
    profileForeground: '#000000', // Black text for profile
    selectedOptionBorder: '#F5C3A6', // Lighter peach border for selected options
    standby: '#F5C3A6', // Lighter peach for standby
  },
  fonts: {
    body: 'Arial, sans-serif', // Directly set font
  },
  radii: {
    actionButton: '0.5rem',
    connectButton: '0.5rem',
    menuButton: '0.5rem',
    modal: '0.5rem',
    modalMobile: '0.5rem',
  },
  shadows: {
    connectButton: '0 4px 6px rgba(0, 0, 0, 0.2)', // Slightly darker shadow
    dialog: '0 4px 6px rgba(0, 0, 0, 0.3)', // Darker shadow for depth
    profileDetailsAction: '0 4px 6px rgba(0, 0, 0, 0.2)',
    selectedOption: '0 4px 6px rgba(0, 0, 0, 0.2)',
    selectedWallet: '0 4px 6px rgba(0, 0, 0, 0.2)',
    walletLogo: '0 4px 6px rgba(0, 0, 0, 0.2)',
  },
};


const queryClient = new QueryClient();


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const clientConfig = getDefaultConfig({
      appName: process.env.APP_NAME || 'Default App Name',
      projectId: process.env.PROJECT_ID || 'Default Project ID',
      chains: [mainnet, polygon, optimism, arbitrum, base],
      ssr: true,
    });

  return (
    <WagmiProvider config={clientConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={myCustomTheme}>
        <html lang="en">
          <body className={`${playfair.variable} ${inter.variable} font-serif`}>
            <div className="min-h-screen bg-gradient-to-br from-[#fff4ec] via-[#f2bfa4] to-[#2e2a4d] text-[#2e2a4d]">
              {children}
            </div>
          </body>
        </html>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
