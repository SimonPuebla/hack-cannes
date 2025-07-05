"use client"

import { useState, useEffect } from "react"
import { Logo } from "@/components/logo"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAccount } from 'wagmi';


import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function UserLoginPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      router.push("/proof");
    }
  }, [isConnected, router]);


  const connectWallet = async () => {
    setIsConnecting(true)

    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false)
      router.push("/proof")
    }, 2000)
  }


  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </button>
          <Logo />
        </div>

        <Card className="w-full bg-[#ffffffee] backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold font-serif">Connect Wallet</h2>
              <p className="text-[#2e2a4d]/70">Connect your wallet to get started with your anonymous identity</p>

              <ConnectButton showBalance={false} />

              {/* <CustomButton onClick={connectWallet} className="w-full" size="lg" disabled={isConnecting}>
                <Wallet className="mr-2 h-5 w-5" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </CustomButton> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
