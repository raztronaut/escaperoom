'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/components/providers/AuthProvider'

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createClient()
  const { user } = useAuth()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setIsOpen(false)
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">Hello, {user.email}</span>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
        </DialogHeader>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#404040',
                  brandAccent: '#2563eb',
                }
              }
            }
          }}
          theme="dark"
          providers={[]}
          redirectTo={`${window.location.origin}/auth/callback`}
        />
      </DialogContent>
    </Dialog>
  )
} 