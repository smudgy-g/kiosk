'use server'

import { NewOrder, ProductToOrder } from '@/types'
import { createClient } from '@/utils/supabase/actions'
import { cookies } from 'next/headers'

export async function createOrder(order: NewOrder, products: ProductToOrder[]) {
  console.log(order, products)
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
    console.log('newOrder', newOrder)
    console.log('products', products)
    const orderProducts = products.map((product) => ({
      order_id: newOrder.id,
      product_id: product.id,
      quantity: product.quantity,
    }))

    console.log('orderProducts', orderProducts)

    const { error: orderProductError } = await supabase
      .from('order_product')
      .insert(orderProducts)

    if (orderProductError) throw new Error(orderProductError.message)

    return newOrder
  } catch (error) {
    console.log(error)
  }
}
