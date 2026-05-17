# Pulse — Premium Social Discovery

Pulse is a high-fidelity, consumer-ready social discovery platform designed to feel indistinguishable from a native iPhone app built with SwiftUI.

## ✨ Features

- **Native iOS Aesthetic:** Built following Apple's Human Interface Guidelines (HIG).
- **Dynamic Island:** Context-aware top UI for notifications and status.
- **Real Map Integration:** Powered by Mapbox for a smooth, high-performance mapping experience.
- **Backend Ready:** Integrated with Supabase for authentication and data management.
- **Glassmorphism:** Heavy use of translucency and background blurs.
- **Fluid Animations:** 60fps transitions using Framer Motion 12.
- **PWA Support:** Fully installable on iOS/Android with native-style splash screens.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12
- **Database/Auth:** Supabase
- **Maps:** Mapbox GL
- **State Management:** Zustand 5

## 🚀 Setup Instructions

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env.local` file with the following:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
   ```
4. **Run the app:**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/app`: Next.js App Router pages.
- `src/components`: UI and Layout components.
- `src/lib`: Services, supabase client, and mock data.
- `src/store`: Zustand state management.
- `src/types`: TypeScript definitions.

---

Built with ❤️ by Jules.
