'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface UsernameFormProps {
  onComplete: () => void
}

export default function UsernameForm({ onComplete }: UsernameFormProps) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('No user found')

      const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user.id)

      if (error) throw error

      onComplete()
    } catch (error) {
      console.error('Error setting username:', error)
      setError('Failed to set username. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-200">Choose Your Username</h2>
        <p className="text-sm text-slate-400">
          Before you begin your adventure, tell us what to call you.
        </p>
      </div>

      <div className="space-y-2">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="bg-slate-800/50 border-slate-700"
          required
          minLength={3}
          maxLength={20}
          pattern="[a-zA-Z0-9_-]+"
          title="Letters, numbers, underscores and hyphens only"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || username.length < 3}
        className="w-full"
      >
        {isLoading ? 'Setting Username...' : 'Continue'}
      </Button>
    </form>
  )
} 