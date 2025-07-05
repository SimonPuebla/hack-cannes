"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProofPage() {
  const [isScanning, setIsScanning] = useState(false)
  const router = useRouter()

  const startScan = async () => {
    setIsScanning(true)

    // Simulate Self Protocol scanning
    setTimeout(() => {
      setIsScanning(false)
      router.push("/communities")
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="flex flex-col items-center space-y-8">
        <Logo />

        <Card className="w-full bg-[#ffffffee] backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold font-serif">Scan Passport with Self Protocol</h2>

              {!isScanning ? (
                <>
                  <div className="py-8">
                    <Smartphone className="h-16 w-16 mx-auto text-[#2e2a4d]/60 mb-4" />
                  </div>

                  <CustomButton onClick={startScan} className="w-full" size="lg">
                    Start NFC / Camera Scan
                  </CustomButton>
                </>
              ) : (
                <div className="py-8 space-y-4">
                  <div className="w-16 h-16 border-4 border-[#2e2a4d] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="font-medium">Scanning with Self Protocol...</p>
                </div>
              )}

              <div className="flex items-center justify-center space-x-2 text-sm text-[#2e2a4d]/70">
                <Shield className="h-4 w-4" />
                <span>We store only a zero-knowledge proof — never your data.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
