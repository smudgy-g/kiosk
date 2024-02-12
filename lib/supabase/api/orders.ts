'use server'

import { NewOrder, ProductWithQuantity } from '@/types'
import { createClient } from '@/utils/supabase/actions'
import { cookies } from 'next/headers'

export async function createOrder(
  order: NewOrder,
  products: ProductWithQuantity[]
) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { comment, delivery_date, supplier_id, user_id, total } = order

    const { data: newOrder, error: newOrderError } = await supabase
      .from('order')
      .insert([
        {
          comment: comment,
          delivery_date: delivery_date,
          total: total,
          user_id: user_id,
          supplier_id: supplier_id,
        },
      ])
      .select()
      .single()

    if (newOrderError) throw new Error(newOrderError.message)
    const orderProducts = products.map((product) => ({
      order_id: newOrder.id,
      product_id: product.id,
      quantity: product.quantity,
    }))

    const { error: orderProductError } = await supabase
      .from('order_product')
      .insert(orderProducts)

    if (orderProductError) throw new Error(orderProductError.message)

    return newOrder
  } catch (error) {
    console.log(error)
  }
}

export async function getOrders() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase
      .from('order')
      .select(
        `
      *,
      suppliers (
        name
      )
    `
      )
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getOrderById(id: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data: order, error } = await supabase
      .from('order')
      .select(
        `
      *,
      suppliers (
        name
      )
    `
      )
      .eq('id', id)
      .single()

    if (error) throw new Error(error.message)
    return order
  } catch (error) {
    console.log(error)
  }
}
