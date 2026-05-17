"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function DynamicIsland() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [notification, setNotification] = useState<{title: string, icon: string} | null>(null)

  // Example trigger for notification
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({ title: "New Place Found", icon: "✨" })
      setTimeout(() => setNotification(null), 5000)
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]">
      <motion.div
        layout
        initial={{ width: 120, height: 36, borderRadius: 20 }}
        animate={{
          width: isExpanded ? 350 : (notification ? 200 : 120),
          height: isExpanded ? 200 : 36,
          borderRadius: isExpanded ? 40 : 20
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-black text-white flex items-center justify-center cursor-pointer overflow-hidden shadow-lg"
      >
        <AnimatePresence mode="wait">
          {!isExpanded && !notification && (
            <motion.div
              key="pulse-logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs font-bold tracking-widest uppercase"
            >
              Pulse
            </motion.div>
          )}

          {!isExpanded && notification && (
            <motion.div
              key="notification"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 px-4 w-full"
            >
              <span className="text-sm">{notification.icon}</span>
              <span className="text-xs font-medium truncate">{notification.title}</span>
            </motion.div>
          )}

          {isExpanded && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 w-full h-full flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">Paris, France</h3>
                  <p className="text-xs text-white/60">Trending in your area</p>
                </div>
                <div className="bg-ios-blue rounded-full px-3 py-1 text-[10px] font-bold">
                  LIVE
                </div>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-xl bg-white/10" />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
