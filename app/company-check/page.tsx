"use client"

import { useState, useEffect } from "react"
import { Logo } from "@/components/logo"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CompanyCheckPage() {
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate API call to check if community exists
    const checkCommunity = async () => {
      setTimeout(() => {
        setIsChecking(false)
        // Simulate random result - in real app this would be based on wallet address
        const hasCommunity = Math.random() > 0.5

        if (hasCommunity) {
          router.push("/admin-dashboard")
        } else {
          router.push("/company-create")
        }
      }, 3000)
    }

    checkCommunity()
  }, [router])

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="flex flex-col items-center space-y-8">
        <Logo />

        <Card className="w-full bg-[#ffffffee] backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <Users className="h-16 w-16 mx-auto text-[#2e2a4d]/60" />
              <h2 className="text-2xl font-bold font-serif">Checking Community...</h2>

              {isChecking && (
                <div className="space-y-4">
                  <div className="w-16 h-16 border-4 border-[#2e2a4d] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-[#2e2a4d]/70">Verifying your community hub...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
