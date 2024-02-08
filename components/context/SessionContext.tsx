'use client'

import {
  Children,
  ReactNode,
  createContext,
  useEffect,
} from 'react'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'


const SessionContext = createContext(Children)

const SessionProvider = ({
  accessToken,
  
  children,
}: {
  accessToken: any
  
  children: ReactNode
}) => {
  const supabase = createClientComponentClient()
  const router = useRouter()


  useEffect(() => {
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


  return (
    children
  )
}


export default SessionProvider
