'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PostgrestError } from '@supabase/supabase-js'

export async function saveGameResult(timeTaken: number) {
  const supabase = createClientComponentClient()
  
  try {
    // Get current user with detailed error logging
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('Auth check - User:', user)
    console.log('Auth check - Error:', authError)
    
    if (authError) {
      console.error('Auth error details:', authError)
      throw new Error('Authentication error')
    }
    
    if (!user) {
      throw new Error('No authenticated user found')
    }

    const gameResult = {
      user_id: user.id,
      time_taken: timeTaken,
      completed_at: new Date().toISOString(),
      puzzle_id: 'secretRoom',
      moves_taken: 0
    }

    console.log('Attempting to save game result with data:', gameResult)

    const { data, error } = await supabase
      .from('game_results')
      .insert(gameResult)
      .select()
      .single()

    if (error) {
      console.error('Full database error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      throw error
    }

    console.log('Successfully saved game result:', data)
    return { error: null }

  } catch (err) {
    // Type-safe error handling
    const error = err as Error | PostgrestError
    console.error('Complete error object:', {
      name: error.name,
      message: error.message,
      ...(error instanceof Error && { stack: error.stack }),
      ...('code' in error && { code: error.code }),
      ...('details' in error && { details: error.details })
    })
    return { error }
  }
} 