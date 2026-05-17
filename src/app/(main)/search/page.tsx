"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/Skeleton"

const SearchContent = dynamic(
  () => import("@/components/search/SearchContent").then((mod) => mod.SearchContent),
  {
    ssr: false,
    loading: () => (
      <div className="p-6 space-y-6">
        <div className="pt-12 h-40">
           <Skeleton className="h-10 w-3/4 mb-4" />
           <Skeleton className="h-14 w-full rounded-2xl" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
           <Skeleton className="h-64 w-full rounded-2xl" />
           <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    )
  }
)

export default function SearchPage() {
  return <SearchContent />
}
