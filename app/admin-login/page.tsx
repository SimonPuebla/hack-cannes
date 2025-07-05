"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, ArrowLeft, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()

  const connectAdminWallet = async () => {
    setIsConnecting(true)

    // Simulate admin wallet connection
    setTimeout(() => {
      setIsConnecting(false)
      router.push("/company-check")
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
              <Users className="h-16 w-16 mx-auto text-[#2e2a4d]/60" />
              <h2 className="text-2xl font-bold font-serif">Community Hub Portal</h2>
              <p className="text-[#2e2a4d]/70">Sign in with your wallet to manage your community's credentials</p>

              <CustomButton onClick={connectAdminWallet} className="w-full" size="lg" disabled={isConnecting}>
                <Wallet className="mr-2 h-5 w-5" />
                {isConnecting ? "Connecting..." : "Sign in with wallet"}
              </CustomButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
