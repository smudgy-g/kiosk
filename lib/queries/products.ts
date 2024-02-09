import { NewProduct, Product } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createProduct,
  deleteProduct,
  getProductsByOrder,
  getProductsBySupplier,
  updateProductDetails,
} from '../supabase/api/products'
import { QUERY_KEYS } from './queryKeys'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      product,
      supplierId,
    }: {
      product: NewProduct
      supplierId: string
    }) => createProduct(product, supplierId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCTS_BY_SUPPLIER_ID, data?.supplier_id],
      })
    },
  })
}

export function useGetProductsBySupplier(supplierId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS_BY_SUPPLIER_ID, supplierId],
    queryFn: () => getProductsBySupplier(supplierId),
  })
}

export function useGetProductsByOrder(orderId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS_BY_ORDER_ID, orderId],
    queryFn: () => getProductsByOrder(orderId),
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (product: Product) => updateProductDetails(product),
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(
        [QUERY_KEYS.GET_PRODUCTS_BY_SUPPLIER_ID, updatedProduct?.supplier_id],
        updatedProduct
      )
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCTS_BY_SUPPLIER_ID],
      })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCTS_BY_SUPPLIER_ID],
      })
    },
  })
}
