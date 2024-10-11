'use server'

import { NewProduct, Product } from '@/types'
import { createClient } from '@/utils/supabase/actions'
import { cookies } from 'next/headers'

export async function createProduct(product: NewProduct, supplierId: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { error: supplierError } = await supabase
      .from('suppliers')
      .select()
      .eq('id', supplierId)
    if (supplierError) throw new Error('Supplier not found.')

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name: product.name,
          price: product.price,
          product_code: product.product_code,
          category: product.category,
          supplier_id: supplierId,
        },
      ])
      .select()
      .single()

    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getProductsBySupplier(id: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data, error } = await supabase
      .from('products')
      .select()
      .eq('supplier_id', id)

    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    console.error(error)
  }
}
export async function getProductsByOrder(id: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data, error } = await supabase
      .from('order_product')
      .select(
        `
      quantity,
      products (
        *
      )
      `
      )
      .eq('order_id', id)

    if (error) throw new Error(error.message)
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function updateProductDetails({
  id,
  name,
  price,
  product_code,
  category,
}: Product) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase
      .from('products')
      .update({
        name,
        price,
        product_code,
        category,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    console.error(error)
  }
}

export async function deleteProduct(id: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) throw new Error(error.message)

    return
  } catch (error) {
    console.error(error)
  }
}
