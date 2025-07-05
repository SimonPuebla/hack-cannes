"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Share } from "lucide-react"

const communityInfo = {
  crecimiento: { name: "Crecimiento", color: "bg-green-100 text-green-800 border-green-200" },
  edge: { name: "Edge City", color: "bg-blue-100 text-blue-800 border-blue-200" },
  urbe: { name: "Urbe", color: "bg-purple-100 text-purple-800 border-purple-200" },
}

export default function DashboardPage() {
  const [copied, setCopied] = useState(false)
  const [ensName, setEnsName] = useState("")
  const [community, setCommunity] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const communityParam = searchParams.get("community") || "crecimiento"
    const ensParam = searchParams.get("ens") || "anonibara.crecimiento.eth"
    setCommunity(communityParam)
    setEnsName(decodeURIComponent(ensParam))
  }, [searchParams])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ensName)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareCredential = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Anonibara Identity",
        text: `Check out my ENS identity: ${ensName}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`Check out my ENS identity: ${ensName}`)
      alert("Link copied to clipboard!")
    }
  }

  const communityData = communityInfo[community as keyof typeof communityInfo] || communityInfo.crecimiento

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="flex flex-col items-center space-y-8">
        <Logo />

        <Card className="w-full bg-[#ffffffee] backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold font-serif">ENS Pass</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl font-medium">{ensName}</span>
                  <button onClick={copyToClipboard} className="p-1 hover:bg-gray-100 rounded">
                    {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex justify-center">
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending credential</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <CustomButton onClick={shareCredential} className="w-full" size="lg">
                  <Share className="mr-2 h-5 w-5" />
                  Share
                </CustomButton>

                <div className="text-sm text-[#2e2a4d]/70">Your identity pass is ready for real-world access</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
