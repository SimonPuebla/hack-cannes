"use client"

import type React from "react"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ApplyEdgePage() {
  const [subname, setSubname] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const params = new URLSearchParams({
        community: "edge",
        subname: subname,
        ens: `${subname}.edge.eth`,
        reason: reason,
      })
      router.push(`/credential-payment?${params.toString()}`)
    }, 1000)
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
            <div className="text-center space-y-2 mb-6">
              <h1 className="text-2xl font-bold font-serif">Apply to Edge City</h1>
              <p className="text-[#2e2a4d]/70">Join the network state pioneers</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subname">Preferred Subname</Label>
                <div className="flex">
                  <Input
                    id="subname"
                    placeholder="yourname"
                    value={subname}
                    onChange={(e) => setSubname(e.target.value)}
                    className="rounded-r-none"
                    required
                  />
                  <div className="bg-gray-100 border border-l-0 border-gray-300 px-3 py-2 rounded-r-md text-sm text-gray-600 flex items-center">
                    .edge.eth
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Why do you want to join?</Label>
                <Textarea
                  id="reason"
                  placeholder="Tell us about your interest in joining Edge City..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <CustomButton type="submit" className="w-full" size="lg" disabled={isSubmitting || !subname || !reason}>
                {isSubmitting ? "Processing Application..." : "Continue to Payment"}
              </CustomButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
