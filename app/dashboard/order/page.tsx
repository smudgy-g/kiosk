'use client'

import { ordersColumnsDef } from '@/components/shared/tables/OrdersDataColumnsDef'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetOrders } from '@/lib/queries/orders'
import { OrderWithSupplierName } from '@/types'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import Link from 'next/link'

export default function OrderRoute() {
  let ordersWithSupplierName
  const { data: orders, isLoading } = useGetOrders()

  if (orders) {
    ordersWithSupplierName = orders.map((order) => {
      const { suppliers, created_at, delivery_date, ...rest } = order
      return {
        ...rest,
        supplier: suppliers?.name,
        created_at: format(created_at, 'PPP'),
        delivery_date: format(Date.parse(delivery_date!), 'PPP'),
      }
    })
  }
  return (
    <div className="py-12 px-8 w-full">
      <h1 className="text-4xl mb-8 text-center md:text-left">Orders</h1>
      <div className="flex flex-col items-center md:items-start space-y-4">
        <Button
          variant="outline"
          className="h-14 px-6"
          asChild
        >
          <Link href='/dashboard/supplier'>
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            New Order
          </Link>
        </Button>
        <Separator />

        {isLoading && (
          <Skeleton className="w-full h-[300px] md:h-[450px]" />
        )}
        {ordersWithSupplierName && (
          <DataTable
            columns={ordersColumnsDef}
            data={ordersWithSupplierName as OrderWithSupplierName[]}
          />
        )}
      </div>
    </div>
  )
}
