'use server'

import { Supplier } from '@/types'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function createSupplier(
  {
    name,
    email,
    contact_name,
    contact_number,
  }: Omit<Supplier, 'id' | 'created_at' | 'user_id'>,
  userId: string
) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data, error } = await supabase
      .from('suppliers')
      .insert([
        {
          contact_name: contact_name,
          contact_number: contact_number,
          email: email,
          name: name,
          user_id: userId,
        },
      ])
      .select()
      .single()

    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getSuppliers() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data, error } = await supabase.from('suppliers').select()

    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getSupplierById(id: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data, error } = await supabase
      .from('suppliers')
      .select()
      .eq('id', id)
      .single()

    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function updateSupplierDetails({
  id,
  name,
  email,
  contact_name,
  contact_number,
}: Supplier) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data, error } = await supabase
      .from('suppliers')
      .update({
        contact_name,
        contact_number,
        email,
        name,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function deleteSupplier(id: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { error } = await supabase.from('suppliers').delete().eq('id', id)

    if (error) throw new Error(error.message)

    return
  } catch (error) {
    console.log(error)
  }
}
