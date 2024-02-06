import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'
import type { TypedSupabaseClient } from '../../lib/supabase/types/client'
import { useMemo } from 'react'

let client: TypedSupabaseClient | undefined

function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}