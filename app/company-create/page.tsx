// ENS Minting Logic Integrated into Community Creation

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useWalletClient, usePublicClient } from "wagmi"
import { keccak256, toBytes, getContract } from "viem"

import { controllerAbiJson } from "./controllerAbi"

import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload } from "lucide-react"

export default function CompanyCreatePage() {
  const [communityName, setCommunityName] = useState("")
  const [description, setDescription] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  const controllerAddress = "0xfb3cE5D01e0f33f41DbB39035dB9745962F1f968"
  const controllerAbi = controllerAbiJson

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      if (!walletClient || !publicClient) throw new Error("Wallet not connected")

      const ensController = getContract({
        address: controllerAddress,
        abi: controllerAbi,
        client: { public: publicClient, wallet: walletClient },
      })

      console.log("ENS Controller Contract:", ensController)

      const label = communityName.toLowerCase().replace(/[^a-z0-9-]/g, "")
      const duration = 31556952 // 1 year
      const secret = keccak256(toBytes("anon-secret"))
      const address = walletClient.account.address

      const registration = {
        name: label,
        owner: address,
        duration,
        secret,
        resolver: "0x0000000000000000000000000000000000000000",
        data: [],
        reverseRecord: true,
        ownerControlledFuses: 0
      }

      console.log("Parameters for makeCommitment:", registration)

      // console.log("Calling makeCommitment...");
      // const commitment = await ensController.read.makeCommitment([
      //   {
      //     label: "crecimiento",
      //     owner: address,
      //     duration,
      //     secret,
      //     resolver: "0x0000000000000000000000000000000000000000",
      //     data: [],
      //     reverseRecord: true, // ✅ must be uint8: 0 or 1
      //     referrer: "0x0000000000000000000000000000000000000000000000000000000000000000"
      //   }
      // ]);
      // console.log("Commitment received:", commitment);
      // 
      // if (!commitment) {
      //   throw new Error("makeCommitment returned no data");
      // }

      // console.log("Calling commit...");
      // await ensController.write.commit([commitment]);
      // console.log("Commitment sent. Waiting 60 seconds...");

      // await new Promise((res) => setTimeout(res, 65000));

      // console.log("Calling rentPrice...");
      // const priceResult = await ensController.read.rentPrice(["crecimiento", duration]) as bigint;

      // console.log("Price Result:", priceResult);

      // console.log("Calling register...");
      // await ensController.write.register([registration], {
      //   value: priceResult
      // });
      // console.log("ENS name minted");

      // Simulate saving community to backend
      setTimeout(() => {
        router.push("/admin-dashboard")
      }, 2000)
    } catch (err: any) {
      console.error("Error during ENS registration:", err)
      setError(err.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
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
              <p className="text-[#2e2a4d]/70">
                Set up your community and mint its ENS name
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="community-name">Community Name (.eth)</Label>
                <Input
                  id="community-name"
                  placeholder="anonibara"
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your community..."
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

              {error && <p className="text-sm text-red-500">{error}</p>}

              <CustomButton
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting || !communityName || !description}
              >
                {isSubmitting ? "Registering ENS..." : "Create Community Hub & Mint ENS"}
              </CustomButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
