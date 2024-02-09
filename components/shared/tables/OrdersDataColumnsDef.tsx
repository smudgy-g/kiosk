'use client'

import { OrderWithSupplierName } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { EyeOpenIcon } from '@radix-ui/react-icons'

export const ordersColumnsDef: ColumnDef<OrderWithSupplierName>[] = [
  
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Order Date"
      />
    ),
  },
  {
    accessorKey: 'supplier',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="supplier"
      />
    ),
  },
  {
    accessorKey: 'delivery_date',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Delivery Date"
      />
    ),
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total"
      />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('total'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original
      
      return (
        <Button asChild variant='outline' size='sm'>
          <Link href={`/dashboard/order/${order.id}`}>
            <EyeOpenIcon className='mr-2 h-4 w-4' />
            View
          </Link>
        </Button>
      )
    }
  }
  
  
]
