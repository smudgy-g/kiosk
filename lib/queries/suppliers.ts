import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Supplier } from '@/types'
import {
  createSupplier,
  deleteSupplier,
  getSupplierById,
  getSuppliers,
  updateSupplierDetails,
} from '../supabase/api/suppliers'
import { QUERY_KEYS } from './queryKeys'

export function useGetSuppliers() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SUPPLIERS],
    queryFn: () => getSuppliers(),
  })
}

export function useGetSupplierById(supplierId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SUPPLIER_BY_ID, supplierId],
    queryFn: () => getSupplierById(supplierId),
  })
}

export function useCreateSupplier() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      supplier,
      userId,
    }: {
      supplier: Omit<Supplier, 'id' | 'created_at' | 'user_id'>
      userId: string
    }) => createSupplier(supplier, userId),
    onSuccess: (newSupplier) => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_SUPPLIERS]})
    },
  })
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (supplier: Supplier) =>
      updateSupplierDetails(supplier),
    onSuccess: (updatedSupplier) => {
      queryClient.setQueryData(
        [QUERY_KEYS.GET_SUPPLIER_BY_ID, updatedSupplier?.id],
        updatedSupplier
      )
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_SUPPLIERS]
      // })
    },
  })
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (supplierId: string) => deleteSupplier(supplierId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SUPPLIERS]
      })
    }
  })
}