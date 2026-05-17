"use client"

export function useHaptics() {
  const trigger = (style: "light" | "medium" | "heavy" = "light") => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      const patterns = {
        light: 10,
        medium: 20,
        heavy: 50
      }
      navigator.vibrate(patterns[style])
    }
  }

  return { trigger }
}
