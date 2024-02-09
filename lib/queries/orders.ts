'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NewOrder, ProductToOrder } from '@/types'
import { createOrder, getOrderById, getOrders } from '../supabase/api/orders'
import { QUERY_KEYS } from './queryKeys'

export function useGetOrders() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ORDERS],
    queryFn: () => getOrders(),
  })
}

export function useGetOrderById(orderId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ORDER_BY_ID, orderId],
    queryFn: () => getOrderById(orderId),
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      order,
      products,
    }: {
      order: NewOrder
      products: ProductToOrder[]
    }) => createOrder(order, products),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ORDERS] })
    },
  })
}
