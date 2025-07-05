"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"

const communityInfo = {
  crecimiento: { name: "Crecimiento", color: "bg-green-100 text-green-800 border-green-200" },
  edge: { name: "Edge City", color: "bg-blue-100 text-blue-800 border-blue-200" },
  urbe: { name: "Urbe", color: "bg-purple-100 text-purple-800 border-purple-200" },
}

export default function CredentialPaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [community, setCommunity] = useState("crecimiento")
  const [ensName, setEnsName] = useState("")
  const [subname, setSubname] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const communityParam = searchParams.get("community") || "crecimiento"
    const ensParam = searchParams.get("ens") || ""
    const subnameParam = searchParams.get("subname") || ""

    setCommunity(communityParam)
    setEnsName(ensParam)
    setSubname(subnameParam)
  }, [searchParams])

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      const params = new URLSearchParams({
        community: community,
        ens: ensName,
      })
      router.push(`/dashboard?${params.toString()}`)
    }, 3000)
  }

  const communityData = communityInfo[community as keyof typeof communityInfo] || communityInfo.crecimiento

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
              <h2 className="text-2xl font-bold font-serif">Finalize Your Credential</h2>

              {ensName && (
                <div className="space-y-2">
                  <p className="text-sm text-[#2e2a4d]/70">Your selected ENS name:</p>
                  <Badge className="bg-[#2e2a4d] text-white text-lg px-4 py-2">{ensName}</Badge>
                  <div className="flex justify-center">
                    <Badge className={communityData.color}>{communityData.name}</Badge>
                  </div>
                </div>
              )}

              <p className="text-[#2e2a4d]/80 leading-relaxed">
                To continue and mint your credential pass, please complete a one-time payment of $50.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">What you get:</p>
                  <ul className="text-left space-y-1">
                    <li>• Verified anonymous identity credential</li>
                    <li>• Access to exclusive community features</li>
                    <li>• Your personalized ENS subdomain: {ensName}</li>
                    <li>• Real-world access capabilities</li>
                  </ul>
                </div>
              </div>

              {!isProcessing ? (
                <CustomButton onClick={handlePayment} className="w-full" size="lg">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pay $50 to proceed
                </CustomButton>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 border-4 border-[#2e2a4d] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="font-medium">Processing payment...</p>
                  <p className="text-sm text-[#2e2a4d]/70">Please wait while we process your transaction</p>
                </div>
              )}

              <div className="text-xs text-[#2e2a4d]/60">
                Secure payment processing • One-time fee • No recurring charges
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
