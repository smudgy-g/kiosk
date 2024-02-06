'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'

import SupplierForm from './forms/SupplierForm'
import { Supplier } from '@/types'
import { useState } from 'react'

export default function UpdateSupplierButton({ data }: { data: Supplier }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="p-1"
        >
          <Pencil2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Supplier Details</DialogTitle>
        </DialogHeader>
        <SupplierForm
          type="Update"
          supplier={data}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
