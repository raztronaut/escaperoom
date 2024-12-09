# Escape the Mansion 🏰

An immersive browser-based escape room experience where players solve puzzles and uncover mysteries in a haunted mansion. Built with modern web technologies for optimal performance and user experience.

## ⚡ Key Features

- 🧩 Challenging puzzles that test your wit and observation skills
- 🎮 Smooth, interactive gameplay with real-time state updates
- 👤 Customizable character progression system
- 🏆 Global leaderboard to compete with other players
- 📱 Fully responsive design optimized for all devices
- 🔒 Secure authentication and data persistence

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router for optimal performance
- **Language**: TypeScript for type-safe development
- **Styling**: Tailwind CSS + Shadcn UI for modern, responsive design
- **Backend**: Supabase for authentication and real-time database
- **State Management**: React Context API for efficient state handling
- **Performance**: Server Components and dynamic imports for fast loading

## 🚀 Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/raztronaut/escaperoom.git
   ```

2. **Install Dependencies**
   ```bash
   cd escaperoom
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Supabase**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Add your project URL and anon key to `.env.local`

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Launch the Game**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure