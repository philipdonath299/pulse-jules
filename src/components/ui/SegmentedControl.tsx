"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SegmentedControlProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  return (
    <div
      className={cn(
        "flex p-1 bg-ios-secondary-bg dark:bg-ios-tertiary-bg rounded-xl relative",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "flex-1 py-1.5 text-xs font-semibold rounded-lg relative z-10 transition-colors",
            value === option ? "text-ios-label" : "text-ios-secondary-label"
          )}
        >
          {option}
          {value === option && (
            <motion.div
              layoutId="segmented-bg"
              className="absolute inset-0 bg-white dark:bg-ios-secondary-bg rounded-lg shadow-sm -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
