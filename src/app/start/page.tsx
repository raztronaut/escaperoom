import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import StartPageContent from '@/components/StartPageContent'

export default async function StartPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Check if user has a username
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', session.user.id)
    .single()

  const hasUsername = Boolean(profile?.username)

  return (
    <main className="min-h-screen bg-slate-900 text-slate-200">
      <div className="container mx-auto min-h-screen p-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 text-center mb-8">
          Escape the Mansion!
        </h1>

        <StartPageContent initialHasUsername={hasUsername} />
      </div>
    </main>
  )
} 