# Pulse — Premium Social Discovery

Pulse is a high-fidelity, production-ready web application designed to feel indistinguishable from a native iPhone app built with SwiftUI. It serves as a social discovery platform for trending places, cafes, and hidden gems.

## ✨ Features

- **Native iOS Aesthetic:** Built following Apple's Human Interface Guidelines (HIG).
- **Dynamic Island:** Context-aware top UI for notifications and status.
- **Glassmorphism:** Heavy use of translucency and background blurs.
- **Fluid Animations:** 60fps transitions using Framer Motion.
- **Vertical Discovery Feed:** Instagram-style vertical snap scrolling for place discovery.
- **Interactive Map:** Apple Maps inspired map interface with custom markers.
- **Native-style Sheets:** Bottom drawers for detailed place information.
- **PWA Support:** Installable on iOS with splash screens and manifest support.
- **Dark Mode:** System-aware dark/light mode support (Dark by default).

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12
- **State Management:** Zustand 5
- **Icons:** Lucide React
- **UI Components:** Vaul (Drawers), Radix UI-inspired custom components
- **Language:** TypeScript

## 📱 Design Techniques Used

- **Safe Area Handling:** Used `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` to ensure perfect layout on notched/Dynamic Island iPhones.
- **iOS Colors:** Implemented the full Apple System Gray and Accent color palette.
- **Momentum Scrolling:** Enabled native-feeling overscroll and elasticity.
- **Haptic Logic:** Included mock haptic feedback triggers for touch interactions.
- **SF Pro Typography:** Configured system font stacks to match Apple's native look.

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components/ui`: Reusable atomic UI components (Button, Toggle, SegmentedControl).
- `src/components/layout`: Global layout components (TabBar, DynamicIsland).
- `src/store`: Global state management with Zustand.
- `src/lib`: Mock data, utilities, and custom hooks.
- `src/types`: Centralized TypeScript definitions.

---

Built with ❤️ to feel like a native app.
