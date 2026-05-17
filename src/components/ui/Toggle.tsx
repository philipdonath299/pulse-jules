"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  className?: string
}

export function Toggle({ enabled, onChange, className }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
        enabled ? "bg-ios-green" : "bg-ios-secondary-bg dark:bg-ios-tertiary-bg",
        className
      )}
    >
      <motion.span
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
      />
    </button>
  )
}
