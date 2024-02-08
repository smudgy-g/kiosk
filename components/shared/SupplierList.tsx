'use client'

import { useGetSuppliers } from '@/lib/queries/suppliers'
import { SkeletonSupplierCard } from './SkeletonSupplierCard'
import SupplierCard from './SupplierCard'

export default function SupplierList() {
  const { data: suppliers, isLoading, isError } = useGetSuppliers()

  if (isError) return <h3>Error fetching suppliers</h3>
  return (
    <div className="flex flex-wrap justify-evenly md:justify-start gap-4">
      {isLoading &&
        [1, 2, 3, 4].map((e: number) => <SkeletonSupplierCard key={e} />)}
      {suppliers &&
        suppliers.map((supplier) => (
          <SupplierCard
            key={supplier.id}
            data={supplier}
          />
        ))}
    </div>
  )
}
