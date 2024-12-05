'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function AuthDebug() {
  const [userId, setUserId] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function checkAuth() {
      const { data: { user }, error } = await supabase.auth.getUser()
      console.log('Auth Debug - User:', user)
      console.log('Auth Debug - Error:', error)
      if (user) {
        setUserId(user.id)
      }
    }
    checkAuth()
  }, [])

  return (
    <div className="fixed top-0 left-0 m-4 p-2 bg-black/50 text-xs text-white rounded">
      User ID: {userId || 'Not authenticated'}
    </div>
  )
} 