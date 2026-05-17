"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePulseStore } from "@/store/useStore"

export default function HomePage() {
  const { isOnboarded } = usePulseStore()
  const router = useRouter()

  useEffect(() => {
    if (isOnboarded) {
      router.push("/explore")
    } else {
      router.push("/onboarding")
    }
  }, [isOnboarded, router])

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="text-white font-bold text-2xl animate-pulse uppercase tracking-[0.2em]">
        Pulse
      </div>
    </div>
  )
}
