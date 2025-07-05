"use client"

import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-16 max-w-lg">
      <div className="flex flex-col items-center space-y-12">
        {/* Large centered logo */}
        <div className="scale-150">
          <Logo />
        </div>

        {/* Main headline */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold font-serif">Who are you?</h1>
        </div>

        {/* Choice buttons */}
        <div className="w-full grid grid-cols-1 gap-4">
          <CustomButton onClick={() => router.push("/user-login")} className="w-full" size="lg">
            I'm a Person
          </CustomButton>

          <CustomButton onClick={() => router.push("/admin-login")} className="w-full" size="lg" variant="secondary">
            I'm a Hub/Community
          </CustomButton>
        </div>
      </div>
    </div>
  )
}
