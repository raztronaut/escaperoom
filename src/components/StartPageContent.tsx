'use client'

import { useState } from 'react'
import StartGameButton from './StartGameButton'
import UsernameForm from './UsernameForm'

interface StartPageContentProps {
  initialHasUsername: boolean
}

export default function StartPageContent({ initialHasUsername }: StartPageContentProps) {
  const [hasUsername, setHasUsername] = useState(initialHasUsername)

  return (
    <>
      {hasUsername ? (
        <>
          <p className="text-lg text-slate-400 text-center max-w-2xl mb-12">
            Are you ready to uncover the mysteries of this ancient mansion? Your time starts when you click the button below.
          </p>
          <StartGameButton />
        </>
      ) : (
        <div className="w-full max-w-md">
          <UsernameForm onComplete={() => setHasUsername(true)} />
        </div>
      )}
    </>
  )
} 