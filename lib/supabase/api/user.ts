'use server'

import { NewUser } from '@/types'
import { Database } from '@/types/supabase'
// import useSupabaseBrowser from '@/utils/supabase/client'
import { createClient } from '@/utils/supabase/actions'
import { revalidatePath } from 'next/cache'
// import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createUserAccount({
  email,
  password,
  name,
  company,
}: NewUser) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          company: company,
        },
      },
    })
    if (error) {
      redirect('/error')
    }

    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
  } catch (error) {
    console.log(error)
  }
}

export async function signInUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      redirect('/error')
    }

    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
  } catch (error) {
    console.log(error)
  }
}

export async function getUser() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      redirect('/sign-in')
    }
    return data
  } catch (error) {
    console.log(error)
  }
}
