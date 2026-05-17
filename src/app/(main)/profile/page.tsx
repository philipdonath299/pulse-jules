"use client"

import { usePulseStore } from "@/store/useStore"
import { Card } from "@/components/ui/Card"
import { Settings as SettingsIcon, Bell, Shield, HelpCircle, ChevronRight, LogOut, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  const { user } = usePulseStore()

  // For consumer-readiness, we provide a default user if not logged in
  const displayUser = user || {
    name: "Alex River",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    savedPlaces: []
  }

  const menuItems = [
    { icon: Bell, label: "Notifications", color: "text-ios-red" },
    { icon: Shield, label: "Privacy & Security", color: "text-ios-green" },
    { icon: MapPin, label: "Location Services", color: "text-ios-blue" },
    { icon: HelpCircle, label: "Support", color: "text-ios-orange" },
  ]

  return (
    <div className="p-6 space-y-8 pb-32">
      <header className="pt-12 flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-ios-secondary-bg shadow-xl">
            <img src={displayUser.avatar} className="w-full h-full object-cover" alt={displayUser.name} />
          </div>
          <button className="absolute bottom-0 right-0 bg-ios-blue text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-ios-bg">
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{displayUser.name}</h1>
          <p className="text-ios-secondary-label text-sm">Paris, France</p>
        </div>
      </header>

      <div className="flex gap-4">
        <Card className="flex-1 text-center py-4 bg-ios-secondary-bg/50 border-none shadow-none">
          <p className="text-2xl font-bold">12</p>
          <p className="text-[10px] uppercase tracking-wider font-bold text-ios-secondary-label">Visits</p>
        </Card>
        <Card className="flex-1 text-center py-4 bg-ios-secondary-bg/50 border-none shadow-none">
          <p className="text-2xl font-bold">48</p>
          <p className="text-[10px] uppercase tracking-wider font-bold text-ios-secondary-label">Reviews</p>
        </Card>
        <Card className="flex-1 text-center py-4 bg-ios-secondary-bg/50 border-none shadow-none">
          <p className="text-2xl font-bold">156</p>
          <p className="text-[10px] uppercase tracking-wider font-bold text-ios-secondary-label">Followers</p>
        </Card>
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-bold text-ios-secondary-label uppercase tracking-widest px-2">Account</h2>
        <Card padding="none" className="divide-y divide-ios-secondary-bg dark:divide-white/5 overflow-hidden">
          {menuItems.map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between p-4 active:bg-ios-secondary-bg transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg bg-ios-secondary-bg", item.color)}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-ios-tertiary-label" />
            </button>
          ))}
        </Card>
      </div>

      <button className="w-full flex items-center justify-center gap-2 p-4 text-ios-red font-bold">
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </div>
  )
}
