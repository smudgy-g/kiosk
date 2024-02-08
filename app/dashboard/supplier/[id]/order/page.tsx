'use client'

import { DataTable } from '@/components/ui/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetProductsBySupplier } from '@/lib/queries/products'
import { useGetSupplierById } from '@/lib/queries/suppliers'
import { orderColumnsDef } from '@/components/shared/tables/OrderColumnsDef'
import { Product } from '@/types'
import {
  Order,
  ProductToOrder,
  useOrderContext,
} from '@/components/context/OrderContext'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import UpdateSupplierButton from '@/components/shared/UpdateSupplierButton'
import { useRouter } from 'next/navigation'
import ConfirmOrderButton from '@/components/shared/ConfirmOrderButton'

type SupplierOrderRoute = {
  params: { id: string }
}
export default function SupplierOrderRoute({
  params: { id },
}: SupplierOrderRoute) {
  const router = useRouter()
  const { setCurrentSupplier, orders, setOrders } = useOrderContext()

  const { data: supplier, isLoading: isLoadingSupplier } =
    useGetSupplierById(id)

  setCurrentSupplier(supplier)

  const { data: products, isLoading: isLoadingProducts } =
    useGetProductsBySupplier(id)

  const confirmOrder = () => {
    console.log('Supplier:', supplier)
    console.log(orders[id].length)
  }

  const cancelOrder = () => {
    setOrders((prevOrders: Order) => {
      const updatedOrders = { ...prevOrders }
      delete updatedOrders[id]
      return updatedOrders
    })
    router.push('/dashboard/supplier')
  }

  if (isLoadingSupplier || isLoadingProducts) {
    return (
      <div className="flex flex-col items-center w-full px-2 md:px-8 py-8 lg:px-12 gap-4">
        <Skeleton className="w-full max-w-xl h-[120px] md:h-[100px]" />
        <Skeleton className="w-full max-w-xl h-[300px] md:h-[450px]" />
      </div>
    )
  }

  if (products) {
    const productsWithQuantity = products?.map((p) => ({
      ...p,
      quantity: 0,
    }))
    return (
      <div className="flex flex-col items-center w-full px-2 md:px-8 py-8 lg:px-12 gap-4">
        <div className="w-full max-w-xl flex flex-col gap-4">
          <h2 className="text-primary text-4xl font-bold">{supplier?.name}</h2>
          <h3 className="text-2xl font-bold">Order</h3>
        </div>
        <Separator />

        <DataTable
          columns={orderColumnsDef}
          data={productsWithQuantity as ProductToOrder[]}
        />

        <div className="flex gap-4 justify-center">
          <Button
            onClick={cancelOrder}
            variant="destructive"
          >
            Cancel Order
          </Button>
          <ConfirmOrderButton disabled={orders[id] && orders[id].length < 1} />
        </div>
      </div>
    )
  }
}
