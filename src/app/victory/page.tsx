import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  searchParams: { [key: string]: string | undefined }
}

interface GameResult {
  profiles: {
    username: string
  }
  time_taken: number
  completed_at: string
}

export default async function VictoryPage({ searchParams }: PageProps) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Now try the joined query with user_id instead of profiles
  const { data: leaderboard, error: leaderboardError } = await supabase
    .from('game_results')
    .select(`
      time_taken,
      completed_at,
      user_id
    `)
    .order('time_taken', { ascending: true })
    .limit(10)

  // Fetch usernames separately
  const userIds = leaderboard?.map(result => result.user_id) || []
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, username')
    .in('id', userIds)

  // Combine the data
  const leaderboardWithUsernames = leaderboard?.map(result => ({
    ...result,
    username: profiles?.find(p => p.id === result.user_id)?.username || 'Unknown Player'
  }))

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-200">
      <div className="container mx-auto min-h-screen p-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 text-center mb-8">
          Congratulations!
        </h1>
        
        {searchParams?.time && (
          <p className="text-2xl text-slate-300 mb-8">
            You completed the game in {formatTime(Number(searchParams.time))}!
          </p>
        )}

        <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-xl p-6 mb-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
          <div className="space-y-2">
            {leaderboardWithUsernames?.map((result, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-2 rounded bg-slate-700/20"
              >
                <span className="flex items-center gap-2">
                  <span className="text-slate-400">{index + 1}.</span>
                  <span>{result.username}</span>
                </span>
                <span className="font-mono">{formatTime(result.time_taken)}</span>
              </div>
            ))}
            {!leaderboardWithUsernames?.length && (
              <p className="text-slate-400 text-center py-4">
                No completions yet. You're the first!
              </p>
            )}
          </div>
        </div>

        <Link 
          href="/start" 
          className="text-slate-200 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg transition-colors"
        >
          Play Again
        </Link>
      </div>
    </main>
  )
} 