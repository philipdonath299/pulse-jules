"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth, ...props }, ref) => {
    const variants = {
      primary: "bg-ios-blue text-white",
      secondary: "bg-ios-secondary-bg text-ios-blue dark:bg-ios-tertiary-bg",
      ghost: "bg-transparent text-ios-blue",
      danger: "bg-ios-red text-white",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-full",
      md: "px-6 py-3 text-base font-semibold rounded-ios-button",
      lg: "px-8 py-4 text-lg font-bold rounded-ios-button",
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "inline-flex items-center justify-center transition-colors disabled:opacity-50 disabled:pointer-events-none active:opacity-70",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
