"use client"

import type React from "react"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ApplyPage() {
  const [ensSubname, setEnsSubname] = useState("")
  const [motivation, setMotivation] = useState("")
  const [referralSource, setReferralSource] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate application submission
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
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
            <CardTitle className="text-2xl">Join the Community</CardTitle>
            <CardDescription className="text-[#2e2a4d]/70">
              Submit your application to join Crecimiento and mint your identity pass
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-800">Humanity verified ✓</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ens-subname">Preferred ENS Subname</Label>
                <div className="flex">
                  <Input
                    id="ens-subname"
                    placeholder="yourname"
                    value={ensSubname}
                    onChange={(e) => setEnsSubname(e.target.value)}
                    className="rounded-r-none"
                    required
                  />
                  <div className="bg-gray-100 border border-l-0 border-gray-300 px-3 py-2 rounded-r-md text-sm text-gray-600 flex items-center">
                    .crecimiento.eth
                  </div>
                </div>
                <p className="text-xs text-[#2e2a4d]/60">
                  Your full ENS name will be: {ensSubname || "yourname"}.crecimiento.eth
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Tell us why you want to join</Label>
                <Textarea
                  id="motivation"
                  placeholder="Share your motivation for joining the Crecimiento community..."
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>How did you hear about us?</Label>
                <Select value={referralSource} onValueChange={setReferralSource} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <CustomButton
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting || !ensSubname || !motivation || !referralSource}
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </CustomButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
