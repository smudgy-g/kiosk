'use client'

import { useGetSuppliers } from '@/lib/queries/suppliers'
import { SkeletonSupplierCard } from './SkeletonSupplierCard'
import SupplierCard from './SupplierCard'
import { useOrderContext } from '../context/OrderContext'

export default function SupplierList() {
  const { data: suppliers, isLoading, isError } = useGetSuppliers()
  const { orders } = useOrderContext()
  if (isError) return <h3>Error fetching suppliers</h3>
  return (
    <div className="flex flex-wrap justify-evenly md:justify-start gap-4">
      {isLoading &&
        [1, 2, 3, 4].map((e: number) => <SkeletonSupplierCard key={e} />)}
      {suppliers &&
        suppliers.map((supplier) => {
          const hasOrder = orders[supplier.id]
            ? orders[supplier.id].length > 0
            : false
          return (
            <SupplierCard
              key={supplier.id}
              data={supplier}
              hasOrder={hasOrder}
            />
          )
        })}
    </div>
  )
}
