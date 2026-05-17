"use client"

import dynamic from "next/dynamic"

const MapContent = dynamic(
  () => import("@/components/map/MapContent").then((mod) => mod.MapContent),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-full bg-ios-secondary-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ios-blue" />
      </div>
    )
  }
)

export default function MapPage() {
  return (
    <div className="relative h-screen w-full bg-ios-secondary-bg overflow-hidden">
      <MapContent />
    </div>
  )
}
