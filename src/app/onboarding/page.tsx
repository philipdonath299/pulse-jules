"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { usePulseStore } from "@/store/useStore"
import { MapPin, Sparkles, Heart, Apple, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Discover Hidden Gems",
    description: "Explore the most trending spots in your city through a curated visual feed.",
    icon: <Sparkles className="w-12 h-12 text-ios-yellow" />,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=1200&fit=crop"
  },
  {
    title: "Location Based",
    description: "Find exactly what you're looking for, right around the corner.",
    icon: <MapPin className="w-12 h-12 text-ios-red" />,
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&h=1200&fit=crop"
  },
  {
    title: "Join Pulse",
    description: "Connect with the community and save your favorite collections.",
    icon: <Heart className="w-12 h-12 text-ios-green" />,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=1200&fit=crop",
    isAuth: true
  }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const setOnboarded = usePulseStore((state) => state.setOnboarded)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleAuth = () => {
    setOnboarded(true)
    router.push("/explore")
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={steps[currentStep].image}
            alt="background"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex flex-col justify-end p-8 pb-16">
        <motion.div
          key={`content-${currentStep}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md w-20 h-20 rounded-3xl flex items-center justify-center border border-white/20">
            {steps[currentStep].icon}
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">
              {steps[currentStep].title}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              {steps[currentStep].description}
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            {!steps[currentStep].isAuth ? (
              <Button size="lg" fullWidth onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <div className="space-y-3">
                <Button size="lg" fullWidth className="bg-white text-black hover:bg-white/90" onClick={handleAuth}>
                  <Apple className="w-5 h-5 mr-2 fill-current" />
                  Sign in with Apple
                </Button>
                <Button size="lg" fullWidth variant="secondary" onClick={handleAuth}>
                  <Mail className="w-5 h-5 mr-2" />
                  Sign in with Email
                </Button>
              </div>
            )}

            <div className="flex justify-center gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === currentStep ? "w-8 bg-white" : "w-2 bg-white/20"
                  )}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
