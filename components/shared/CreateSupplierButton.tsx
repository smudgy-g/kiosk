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

import SupplierForm from './forms/SupplierForm'

export default function CreateSupplierButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className='h-14 px-6'>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>
          <DialogDescription>
            Add a new supplier to your repertoire
          </DialogDescription>
        </DialogHeader>
        <SupplierForm type="Create" />
      </DialogContent>
    </Dialog>
  )
}
