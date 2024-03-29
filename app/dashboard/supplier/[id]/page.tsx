'use client'

import DeleteSupplierButton from '@/components/shared/DeleteSupplierButton'
import ProductButton from '@/components/shared/ProductButton'
import UpdateSupplierButton from '@/components/shared/UpdateSupplierButton'
import { productColumnsDef } from '@/components/shared/tables/ProductsColumnsActionsDef'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetProductsBySupplier } from '@/lib/queries/products'
import { useGetSupplierById } from '@/lib/queries/suppliers'
import { Product } from '@/types'
import {
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  PaperPlaneIcon,
  PersonIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

type SupplierSlugRoute = {
  params: { id: string }
}

export default function SupplierSlugRoute({
  params: { id },
}: SupplierSlugRoute) {
  const { data: supplier, isLoading: isLoadingSupplier } =
    useGetSupplierById(id)
  const { data: products, isLoading: isLoadingProducts } =
    useGetProductsBySupplier(id)

  return (
    <div className="flex flex-col items-center w-full px-2 md:px-8 lg:px-12 py-8 gap-4">
      {isLoadingSupplier && (
        <Skeleton className="w-full max-w-xl h-[300px] md:h-[250px]" />
      )}
      {supplier && (
        <div className="w-full max-w-xl flex flex-col gap-4">
          <div className="flex w-full justify-between items-start">
            <h2 className="text-primary text-4xl font-bold">{supplier.name}</h2>
            <div className="flex py-1 flex-row items-end gap-2">
              <UpdateSupplierButton data={supplier} />
              <DeleteSupplierButton id={supplier.id} />
            </div>
          </div>
          <div className="flex flex-col mt-4 gap-3">
            <h4 className="text-xl font-bold">Contact Details</h4>
            <div className="space-y-1">
              <div className="flex items-center">
                <EnvelopeClosedIcon className="w-4 h-4 mr-4" />
                <Link
                  href={`mailto:${supplier.email}`}
                  className=""
                >
                  {supplier.email}
                </Link>
              </div>
              <div className="flex items-center">
                <PersonIcon className="w-4 h-4 mr-4" />
                <p>{supplier.contact_name}</p>
              </div>
              <div className="flex items-center">
                <ChatBubbleIcon className="w-4 h-4 mr-4" />
                <p>{supplier.contact_number}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <ProductButton supplierId={id} />
            <Button
              variant="outline"
              size="lg"
              className="w-fit h-14 px-6"
            >
              <Link href={`/dashboard/supplier/${id}/order`} className='inline-flex items-center justify-center'>
                <PaperPlaneIcon className="mr-2 h-4 w-4" />
                New Order
              </Link>
            </Button>
          </div>
        </div>
      )}
      <Separator />

      <div className="w-full flex flex-col gap-4">
        {isLoadingProducts && (
          <Skeleton className="w-full h-[300px] md:h-[450px]" />
        )}
        {products && (
          <DataTable
            columns={productColumnsDef}
            data={products as Product[]}
            searchPlaceholder="Search products..."
          />
        )}
      </div>
    </div>
  )
}
