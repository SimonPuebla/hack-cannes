"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<"granted" | "denied" | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const router = useRouter()

  const startScan = () => {
    setIsScanning(true)
    setScanResult(null)

    // Simulate QR code detection and verification
    setTimeout(() => {
      setIsScanning(false)
      setIsVerifying(true)

      setTimeout(() => {
        const accessGranted = Math.random() > 0.3
        setScanResult(accessGranted ? "granted" : "denied")
        setIsVerifying(false)
      }, 2000)
    }, 3000)
  }

  const resetScan = () => {
    setScanResult(null)
    setIsScanning(false)
    setIsVerifying(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </button>
          <Logo />
        </div>

        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Scan to Access</CardTitle>
            <CardDescription className="text-[#2e2a4d]/70">
              Point your camera at the QR code to verify access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-square bg-black/10 rounded-lg flex items-center justify-center relative overflow-hidden">
              {!isScanning && !isVerifying && !scanResult && (
                <div className="text-center space-y-4">
                  <Camera className="h-12 w-12 mx-auto text-[#2e2a4d]/50" />
                  <p className="text-sm text-[#2e2a4d]/70">Camera will appear here</p>
                </div>
              )}

              {isScanning && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-[#2e2a4d] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm">Scanning for QR code...</p>
                </div>
              )}

              {isVerifying && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm">Verifying credential...</p>
                </div>
              )}

              {scanResult === "granted" && (
                <div className="text-center space-y-4 text-green-600">
                  <CheckCircle className="h-16 w-16 mx-auto" />
                  <div>
                    <p className="text-lg font-semibold">Access Granted</p>
                    <p className="text-sm">Welcome! Door unlocked.</p>
                  </div>
                </div>
              )}

              {scanResult === "denied" && (
                <div className="text-center space-y-4 text-red-600">
                  <XCircle className="h-16 w-16 mx-auto" />
                  <div>
                    <p className="text-lg font-semibold">Access Denied</p>
                    <p className="text-sm">Invalid or expired credential.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {!isScanning && !isVerifying && !scanResult && (
                <CustomButton onClick={startScan} className="w-full" size="lg">
                  <Camera className="mr-2 h-5 w-5" />
                  Start Scanning
                </CustomButton>
              )}

              {scanResult && (
                <CustomButton onClick={resetScan} variant="secondary" className="w-full" size="lg">
                  Scan Again
                </CustomButton>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
