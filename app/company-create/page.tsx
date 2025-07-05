"use client"

import type React from "react"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CompanyCreatePage() {
  const [communityName, setCommunityName] = useState("")
  const [description, setDescription] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to create community
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/admin-dashboard")
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
          <CardContent className="p-8">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold font-serif">New Community Hub</h2>
              <p className="text-[#2e2a4d]/70">Set up your community to manage member credentials</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="community-name">Community Name</Label>
                <Input
                  id="community-name"
                  placeholder="Enter your community name"
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your community and its purpose..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo (optional JPG/PNG)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleLogoChange}
                    className="flex-1"
                  />
                  <Upload className="h-5 w-5 text-[#2e2a4d]/50" />
                </div>
                {logo && <p className="text-sm text-[#2e2a4d]/70">Selected: {logo.name}</p>}
              </div>

              <CustomButton
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting || !communityName || !description}
              >
                {isSubmitting ? "Creating Community..." : "Create Community Hub"}
              </CustomButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
