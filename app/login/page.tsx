"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [ensName, setEnsName] = useState("")
  const [credentialStatus, setCredentialStatus] = useState<"checking" | "valid" | "missing" | null>(null)
  const router = useRouter()

  const connectWallet = async () => {
    setIsConnecting(true)

    // Simulate wallet connection
    setTimeout(() => {
      setWalletConnected(true)
      setEnsName("alice.eth")
      setCredentialStatus("checking")
      setIsConnecting(false)

      // Simulate credential check
      setTimeout(() => {
        const hasCredential = Math.random() > 0.5
        setCredentialStatus(hasCredential ? "valid" : "missing")

        // Auto redirect after status is determined
        setTimeout(() => {
          if (hasCredential) {
            router.push("/dashboard")
          } else {
            router.push("/apply")
          }
        }, 1500)
      }, 2000)
    }, 1500)
  }

  const getStatusIcon = () => {
    switch (credentialStatus) {
      case "checking":
        return <AlertCircle className="h-5 w-5 text-yellow-500 animate-pulse" />
      case "valid":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "missing":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (credentialStatus) {
      case "checking":
        return "Checking credential status..."
      case "valid":
        return "Credential found! Redirecting to dashboard..."
      case "missing":
        return "No credential found. Redirecting to apply..."
      default:
        return ""
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-8">
        <Logo />

        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription className="text-[#2e2a4d]/70">
              Connect your wallet to access your ENS credential
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!walletConnected ? (
              <CustomButton onClick={connectWallet} className="w-full" size="lg" disabled={isConnecting}>
                <Wallet className="mr-2 h-5 w-5" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </CustomButton>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-semibold">{ensName}</div>
                  <div className="text-sm text-[#2e2a4d]/70">Connected</div>
                </div>

                {credentialStatus && (
                  <div className="flex items-center justify-center space-x-2 p-4 bg-white/50 rounded-lg">
                    {getStatusIcon()}
                    <span className="text-sm">{getStatusText()}</span>
                  </div>
                )}
              </div>
            )}

            <div className="text-center">
              <span className="text-sm text-[#2e2a4d]/70">
                Don't have a wallet?{" "}
                <button onClick={() => router.push("/")} className="text-[#2e2a4d] underline hover:no-underline">
                  Create account
                </button>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
