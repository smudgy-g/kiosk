'use client'

import { LocalStorageOrder, Product } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { Input } from '@/components/ui/input'
import { useOrderContext } from '@/components/context/OrderContext'

export const orderColumnsDef: ColumnDef<Product>[] = [
  // {
  //   accessorKey: 'product_code',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Code"
  //     />
  //   ),
  // },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Price"
      />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category"
      />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original
      const { orders, setOrders, currentSupplier } = useOrderContext()
      if (!currentSupplier) return
      const initialQuantity =
        orders[currentSupplier?.id]?.find((p) => p.id === product.id)
          ?.quantity || 0

      const handleQuantityChange = (product: Product, newQuantity: number) => {
        setOrders((prevState: LocalStorageOrder) => {
          const updatedOrders = { ...prevState }

          if (!(currentSupplier?.id in updatedOrders)) {
            updatedOrders[currentSupplier.id] = []
          }

          const productIndex = updatedOrders[currentSupplier.id].findIndex(
            (p) => p.id === product.id
          )
          if (newQuantity > 0) {
            if (productIndex !== -1) {
              updatedOrders[currentSupplier.id][productIndex].quantity =
                newQuantity
            } else {
              updatedOrders[currentSupplier.id].push({
                ...product,
                quantity: newQuantity,
              })
            }
          } else {
            if (productIndex !== -1) {
              updatedOrders[currentSupplier?.id].splice(productIndex, 1)
            }
          }

          return updatedOrders
        })
      }

      return (
        <div className="flex flex-nowrap">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleQuantityChange(product, initialQuantity + 1)}
          >
            <PlusCircledIcon className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            className="w-9 text-center px-1"
            step="1"
            min={0}
            value={initialQuantity}
            onChange={(e) => handleQuantityChange(product, +e.target.value)}
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleQuantityChange(product, initialQuantity - 1)}
          >
            <MinusCircledIcon className="w-4 h-4" />
          </Button>
        </div>
      )
    },
  },
]
