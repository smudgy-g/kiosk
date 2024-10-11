'use server'

import { NewUser, UserProfile } from '@/types'
import { createClient } from '@/utils/supabase/actions'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createUserAccount({
  email,
  password,
  name,
  company,
  address,
}: NewUser) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  let redirectPath = 'sign-up/success'
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          company: company,
          address: address,
        },
      },
    })
    if (error) throw error
  } catch (error) {
    console.error(error)
    redirectPath = '/error'
  } finally {
    redirect(redirectPath)
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

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}

export async function getUser() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/sign-in')
  }

  return user
}

export async function getProfile() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser()
  if (getUserError || !user) {
    redirect('/sign-in')
  }

  const { data: profile, error: getProfileError } = await supabase
    .from('profiles')
    .select(`full_name, company, address`)
    .eq('id', user.id)
    .single()

  if (getProfileError) throw new Error(getProfileError.message)

  const profileData = {
    email: user.email,
    full_name: profile.full_name,
    company: profile.company,
    address: profile.address,
  }

  return JSON.parse(JSON.stringify(profileData))
}

export async function updateProfile({
  full_name,
  address,
  company,
}: UserProfile) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser()

  if (getUserError || !user) {
    redirect('/sign-in')
  }

  const { data, error: updateError } = await supabase
    .from('profiles')
    .update({
      full_name,
      company,
      address,
    })
    .eq('id', user.id)
    .select()
    .single()

  if (updateError) throw new Error(updateError.message)

  return data
}
