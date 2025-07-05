"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Smartphone, Copy, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const ensName = "alice.eth"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ensName)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQR = () => {
    // In a real app, this would generate and download a QR code
    alert("QR code download would start here")
  }

  const writeToNFC = () => {
    // In a real app, this would initiate NFC writing
    alert("NFC writing would start here")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-8">
        <Logo />

        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Credential Generated!</CardTitle>
            <CardDescription className="text-[#2e2a4d]/70">
              Your ENS access credential has been successfully created
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 mx-auto text-green-500" />

              <div className="space-y-2">
                <Badge className="bg-[#2e2a4d] text-white text-lg px-4 py-2">{ensName}</Badge>
                <p className="text-sm text-[#2e2a4d]/70">Your verified ENS credential</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex space-x-2">
                <CustomButton onClick={copyToClipboard} variant="secondary" className="flex-1">
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Copied!" : "Copy ENS"}
                </CustomButton>

                <CustomButton onClick={downloadQR} variant="secondary" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download QR
                </CustomButton>
              </div>

              <CustomButton onClick={writeToNFC} variant="secondary" className="w-full">
                <Smartphone className="mr-2 h-4 w-4" />
                Write to NFC Tag
              </CustomButton>

              <CustomButton onClick={() => router.push("/dashboard")} className="w-full" size="lg">
                Go to Dashboard
              </CustomButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
