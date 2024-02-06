'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'

import { useState } from 'react'
import ProductForm from './forms/ProductForm'

export default function ProductButton({ supplierId }: { supplierId: string }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-fit h-14 px-6"
        >
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Add a new product for ordering</DialogDescription>
        </DialogHeader>
        <ProductForm
          type="Create"
          supplierId={supplierId}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
