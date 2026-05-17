"use client"

import { usePulseStore } from "@/store/useStore"
import { Card } from "@/components/ui/Card"
import { Toggle } from "@/components/ui/Toggle"
import { ChevronRight, Globe, Lock, Bell, Moon } from "lucide-react"

export default function SettingsPage() {
  const { isOnboarded, setOnboarded } = usePulseStore()

  return (
    <div className="p-6 space-y-8">
      <header className="pt-12">
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
      </header>

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-ios-secondary-label uppercase tracking-widest px-2">Preferences</h2>
          <Card padding="none" className="divide-y divide-ios-secondary-bg dark:divide-white/5">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-ios-blue/10 text-ios-blue">
                  <Moon className="w-5 h-5" />
                </div>
                <span className="font-semibold">Dark Mode</span>
              </div>
              <Toggle enabled={true} onChange={() => {}} />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-ios-green/10 text-ios-green">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="font-semibold">Push Notifications</span>
              </div>
              <Toggle enabled={true} onChange={() => {}} />
            </div>
          </Card>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-bold text-ios-secondary-label uppercase tracking-widest px-2">App</h2>
          <Card padding="none" className="divide-y divide-ios-secondary-bg dark:divide-white/5">
            <button className="w-full flex items-center justify-between p-4 active:bg-ios-secondary-bg transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-ios-orange/10 text-ios-orange">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="font-semibold">Language</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-ios-secondary-label">English</span>
                <ChevronRight className="w-5 h-5 text-ios-tertiary-label" />
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 active:bg-ios-secondary-bg transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-ios-red/10 text-ios-red">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="font-semibold">Privacy Policy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-ios-tertiary-label" />
            </button>
          </Card>
        </div>

        <div className="pt-4">
          <button
            onClick={() => setOnboarded(false)}
            className="w-full p-4 rounded-2xl bg-ios-secondary-bg text-ios-red font-bold active:scale-[0.98] transition-transform"
          >
            Reset Onboarding
          </button>
          <p className="text-center text-xs text-ios-tertiary-label mt-4">
            Pulse Version 1.0.0 (Build 42)
          </p>
        </div>
      </div>
    </div>
  )
}
