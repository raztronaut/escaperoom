'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function StartGameButton() {
  const router = useRouter()

  function handleStartGame() {
    // Store start time in localStorage
    const startTime = new Date().getTime()
    localStorage.setItem('gameStartTime', startTime.toString())
    
    // Navigate to game
    router.push('/game')
  }

  return (
    <Button 
      onClick={handleStartGame}
      className="text-lg px-8 py-6"
    >
      Start Game
    </Button>
  )
} 