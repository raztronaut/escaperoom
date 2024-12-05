import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import StartGameButton from '@/components/StartGameButton'

export default async function StartPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-200">
      <div className="container mx-auto min-h-screen p-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 text-center mb-8">
          Escape the Mansion!
        </h1>
        <p className="text-lg text-slate-400 text-center max-w-2xl mb-12">
          Are you ready to uncover the mysteries of this ancient mansion? Your time starts when you click the button below.
        </p>
        <StartGameButton />
      </div>
    </main>
  )
} 