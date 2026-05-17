"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean
  padding?: "none" | "sm" | "md" | "lg"
}

export function Card({
  className,
  glass = false,
  padding = "md",
  children,
  ...props
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  }

  return (
    <div
      className={cn(
        "rounded-ios-card overflow-hidden transition-all",
        glass ? "glass" : "bg-white dark:bg-ios-secondary-bg",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
