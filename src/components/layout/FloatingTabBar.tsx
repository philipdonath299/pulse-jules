"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Compass, Map as MapIcon, Bookmark, User, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { icon: Compass, label: "Explore", path: "/explore" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: MapIcon, label: "Map", path: "/map" },
  { icon: Bookmark, label: "Saved", path: "/saved" },
  { icon: User, label: "Profile", path: "/profile" },
]

export function FloatingTabBar() {
  const pathname = usePathname()

  // Don't show tab bar on onboarding
  if (pathname === "/onboarding" || pathname === "/") return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <div className="glass rounded-full px-4 py-3 flex items-center justify-between shadow-2xl border border-white/20 dark:border-white/10">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.path)
          const Icon = tab.icon

          return (
            <Link key={tab.path} href={tab.path} className="relative px-3 py-1">
              <div className="flex flex-col items-center gap-1">
                <Icon
                  className={cn(
                    "w-6 h-6 transition-colors duration-200",
                    isActive ? "text-ios-blue" : "text-ios-secondary-label"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 w-1 h-1 bg-ios-blue rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
