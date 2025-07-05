"use client"

import { Logo } from "@/components/logo"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

import { ConnectButton } from '@rainbow-me/rainbowkit';


const communities = [
  {
    name: "Crecimiento",
    description: "Growth-focused community for entrepreneurs and builders",
    route: "/apply-crecimiento",
  },
  {
    name: "Edge City",
    description: "Network state pioneers and digital nomads",
    route: "/apply-edge",
  },
  {
    name: "Urbe",
    description: "Urban innovation and city development collective",
    route: "/apply-urbe",
  },
]

export default function CommunitiesPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="flex flex-col items-center space-y-8">
        <Logo />               
        <ConnectButton showBalance={false} />
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold font-serif">Choose a Community</h1>
          <p className="text-[#2e2a4d]/70">Select which community you'd like to join</p>
        </div>

        <div className="w-full space-y-4">
          {communities.map((community) => (
            <Card
              key={community.name}
              className="bg-[#ffffffee] backdrop-blur-sm border border-[#2e2a4d]/20 cursor-pointer hover:bg-white/90 transition-colors"
              onClick={() => router.push(community.route)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{community.name}</h3>
                    <p className="text-sm text-[#2e2a4d]/70">{community.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#2e2a4d]/50" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
