'use client'

import { orderProductsColumnsDef } from '@/components/shared/tables/OrderProductsColumnsDef'
import { DataTable } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetOrderById } from '@/lib/queries/orders'
import { useGetProductsByOrder } from '@/lib/queries/products'
import { OrderProduct } from '@/types'
import { format } from 'date-fns'

export default function OrderSlugRoute({
  params: { id },
}: {
  params: { id: string }
}) {
  let formattedProducts
  const { data: order, isLoading: isLoadingOrder } = useGetOrderById(id)
  const { data: products, isLoading: isLoadingProducts } =
    useGetProductsByOrder(id)

  if (products) {
    formattedProducts = products.map((p) => {
      const { quantity, ...rest } = p
      return {
        ...rest.products,
        quantity,
        total: quantity! * rest.products?.price! || 0,
      }
    })
  }

  return (
    <div className="flex flex-col items-center w-full px-2 md:px-8 lg:px-12 py-8 gap-4">
      {isLoadingOrder && (
        <Skeleton className="w-full max-w-xl h-[300px] md:h-[250px]" />
      )}
      {order && (
        <div className="w-full max-w-xl flex flex-col gap-4">
          <div className="w-full text-left">
            <h2 className="text-4xl font-bold">
              Order from <br></br>
              <span className="text-primary">{order.suppliers?.name}</span>
            </h2>
          </div>
          <div className="flex flex-col mt-4 gap-3">
            <h4 className="text-xl font-bold">Order Details</h4>
            <div className="space-y-1">
              <p>Order date: {format(order.created_at, 'PPPp')}</p>
              <p>
                Delivery date: {format(Date.parse(order.delivery_date!), 'PPP')}
              </p>
              <p>Total: €{order.total}</p>
              <p>Comments: {order.comment}</p>
            </div>
          </div>
        </div>
      )}
      <Separator />

      <div className="w-full flex flex-col gap-4">
        {isLoadingProducts && (
          <Skeleton className="w-full h-[300px] md:h-[450px]" />
        )}
        {formattedProducts && (
          <DataTable
            columns={orderProductsColumnsDef}
            data={formattedProducts as OrderProduct[]}
            searchPlaceholder="Search products..."
          />
        )}
      </div>
    </div>
  )
}
