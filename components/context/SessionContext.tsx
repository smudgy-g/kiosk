'use client'

import {
  Children,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

type SessionContext = {
  user: User | undefined | null
}

const SessionContext = createContext<SessionContext>({user: null})

const SessionProvider = ({
  accessToken,
  sessionUser,
  children,
}: {
  accessToken: any
  sessionUser: User | undefined | null
  children: ReactNode
}) => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [user, setUser] = useState(sessionUser)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) setUser(user)
    }

    fetchUser()

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh()
      }
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [accessToken, supabase, router])

  const value = {
    user,
  }

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export const useSessionContext = () => useContext(SessionContext)

export default SessionProvider
