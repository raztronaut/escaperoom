'use client'

import { AuthModal } from "@/components/auth/AuthModal"
import { useAuth } from "@/components/providers/AuthProvider"

export function Header() {
  const { user, isLoading } = useAuth()
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold">Puzzle Game</h1>
        {!isLoading && <AuthModal />}
      </div>
    </header>
  )
} 