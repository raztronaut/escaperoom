import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { GameProvider } from '@/context/GameContext'
import { GameControls } from '@/components/GameControls'
import { CharacterStats } from '@/components/CharacterStats'
import { GameDisplay } from '@/components/GameDisplay'
import { ClientPuzzleWrapper } from '@/components/ClientPuzzleWrapper'
import GameTimer from '@/components/GameTimer'
import AuthDebug from '@/components/AuthDebug'

export default async function GamePage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-200">
      <AuthDebug />
      <GameTimer />
      <div className="container mx-auto min-h-screen p-4 flex flex-col">
        <GameProvider>
          {/* Header */}
          <div className="flex-none mb-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 text-center">
              Escape the Mansion!
            </h1>
          </div>

          {/* Game Layout */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,400px)] gap-4 min-h-0">
            {/* Left Column - Game Controls */}
            <div className="flex flex-col gap-4 min-h-0">
              {/* Stats Bar */}
              <div className="flex-none bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-xl p-3">
                <CharacterStats />
              </div>

              {/* Game Controls */}
              <div className="flex-1 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-xl overflow-auto">
                <GameControls />
              </div>
            </div>

            {/* Right Column - Room Info & Puzzles */}
            <div className="flex flex-col gap-4 min-h-0">
              {/* Room Description */}
              <div className="flex-none h-48 md:h-56 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-xl overflow-auto">
                <GameDisplay />
              </div>

              {/* Puzzle Area */}
              <div className="flex-1 min-h-[300px]">
                <ClientPuzzleWrapper />
              </div>
            </div>
          </div>
        </GameProvider>
      </div>
    </main>
  )
} 