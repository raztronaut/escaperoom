'use client'

import { useEffect, useState } from 'react'

export default function GameTimer() {
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  useEffect(() => {
    const startTime = localStorage.getItem('gameStartTime')
    if (!startTime) return

    const interval = setInterval(() => {
      const currentTime = new Date().getTime()
      const elapsed = Math.floor((currentTime - parseInt(startTime)) / 1000)
      setElapsedTime(elapsed)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed top-4 right-4 bg-black/50 rounded-lg px-4 py-2 text-white font-mono text-xl">
      {formatTime(elapsedTime)}
    </div>
  )
} 