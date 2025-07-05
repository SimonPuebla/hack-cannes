"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Users, AlertTriangle } from "lucide-react"

// Mock data - only showing Crecimiento.eth credentials
const mockStats = {
  active: 89,
  pending: 5,
  revoked: 2,
}

const mockCredentials = [
  {
    id: "1",
    ensName: "alice.crecimiento.eth",
    status: "pending",
    submittedAt: "2024-01-15",
    community: "Crecimiento",
  },
  {
    id: "2",
    ensName: "carlos.crecimiento.eth",
    status: "active",
    submittedAt: "2024-01-14",
    community: "Crecimiento",
  },
  {
    id: "3",
    ensName: "maria.crecimiento.eth",
    status: "pending",
    submittedAt: "2024-01-13",
    community: "Crecimiento",
  },
  {
    id: "4",
    ensName: "diego.crecimiento.eth",
    status: "active",
    submittedAt: "2024-01-12",
    community: "Crecimiento",
  },
  {
    id: "5",
    ensName: "sofia.crecimiento.eth",
    status: "pending",
    submittedAt: "2024-01-11",
    community: "Crecimiento",
  },
  {
    id: "6",
    ensName: "pablo.crecimiento.eth",
    status: "active",
    submittedAt: "2024-01-10",
    community: "Crecimiento",
  },
]

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(mockStats)
  const [credentials, setCredentials] = useState(mockCredentials)
  const [processingId, setProcessingId] = useState<string | null>(null)

  const handleApprove = async (id: string) => {
    setProcessingId(id)

    // Simulate API call
    setTimeout(() => {
      setCredentials((prev) => prev.map((cred) => (cred.id === id ? { ...cred, status: "active" } : cred)))
      setStats((prev) => ({
        ...prev,
        active: prev.active + 1,
        pending: prev.pending - 1,
      }))
      setProcessingId(null)
    }, 1500)
  }

  const handleRevoke = async (id: string, ensName: string) => {
    if (confirm(`Revoke credential ${ensName}?`)) {
      setProcessingId(id)

      // Simulate API call
      setTimeout(() => {
        setCredentials((prev) => prev.map((cred) => (cred.id === id ? { ...cred, status: "revoked" } : cred)))
        setStats((prev) => ({
          ...prev,
          active: prev.active - 1,
          revoked: prev.revoked + 1,
        }))
        setProcessingId(null)
      }, 1500)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "revoked":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "revoked":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col items-center space-y-8">
        <Logo />

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold font-serif">Crecimiento Community Hub</h1>
          <p className="text-[#2e2a4d]/70">Manage your community member credentials</p>
        </div>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#ffffffee] backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-[#2e2a4d]/70">Active Members</span>
              </div>
              <div className="text-3xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#ffffffee] backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-[#2e2a4d]/70">Pending Review</span>
              </div>
              <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#ffffffee] backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-[#2e2a4d]/70">Revoked</span>
              </div>
              <div className="text-3xl font-bold text-red-600">{stats.revoked}</div>
            </CardContent>
          </Card>
        </div>

        {/* Credentials List */}
        <Card className="w-full bg-[#ffffffee] backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="font-serif">Latest Crecimiento.eth Credentials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {credentials.map((credential) => (
                <div
                  key={credential.id}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-[#2e2a4d]/10"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {getStatusIcon(credential.status)}
                      <span className="font-medium">{credential.ensName}</span>
                    </div>
                    <div className="text-sm text-[#2e2a4d]/70">
                      Status: <Badge className={getStatusColor(credential.status)}>{credential.status}</Badge> •
                      Submitted: {credential.submittedAt}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {credential.status === "pending" && (
                      <CustomButton
                        onClick={() => handleApprove(credential.id)}
                        size="sm"
                        disabled={processingId === credential.id}
                      >
                        {processingId === credential.id ? "Approving..." : "Approve"}
                      </CustomButton>
                    )}

                    {credential.status === "active" && (
                      <CustomButton
                        onClick={() => handleRevoke(credential.id, credential.ensName)}
                        size="sm"
                        variant="secondary"
                        disabled={processingId === credential.id}
                      >
                        {processingId === credential.id ? "Revoking..." : "Revoke"}
                      </CustomButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
