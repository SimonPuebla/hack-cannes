"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Upload, Shield, CheckCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProofOfHumanityPage() {
  const [verificationMethod, setVerificationMethod] = useState<"nfc" | "upload" | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()

  const handleVerification = (method: "nfc" | "upload") => {
    setVerificationMethod(method)
    setIsVerifying(true)

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)

      // Auto redirect to apply page after success
      setTimeout(() => {
        router.push("/apply")
      }, 2000)
    }, 3000)
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
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Verify Your Humanity</CardTitle>
            <CardDescription className="text-[#2e2a4d]/70">
              Prove you're a real person privately using Self Protocol
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isVerified && !isVerifying && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Privacy First</p>
                      <p>No personal data is stored. We only verify that you're human using zero-knowledge proofs.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <CustomButton
                    onClick={() => handleVerification("nfc")}
                    className="w-full"
                    size="lg"
                    variant="primary"
                  >
                    <Smartphone className="mr-2 h-5 w-5" />
                    Scan with NFC
                  </CustomButton>

                  <div className="text-center text-sm text-[#2e2a4d]/60">or</div>

                  <CustomButton
                    onClick={() => handleVerification("upload")}
                    className="w-full"
                    size="lg"
                    variant="secondary"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Document
                  </CustomButton>
                </div>
              </>
            )}

            {isVerifying && (
              <div className="text-center space-y-4 py-8">
                <div className="w-16 h-16 border-4 border-[#2e2a4d] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div>
                  <p className="font-medium">Generating zk-proof with Self Protocol</p>
                  <p className="text-sm text-[#2e2a4d]/70 mt-1">This may take a moment...</p>
                </div>
              </div>
            )}

            {isVerified && (
              <div className="text-center space-y-4 py-8">
                <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
                <div className="space-y-2">
                  <Badge className="bg-green-100 text-green-800 border-green-200 text-lg px-4 py-2">
                    Humanity Verified
                  </Badge>
                  <p className="text-sm text-[#2e2a4d]/70">Redirecting to application...</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
