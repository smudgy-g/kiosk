'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { useDeleteSupplier } from '@/lib/queries/suppliers'
import { useRouter } from 'next/navigation'
import { toast } from '../ui/use-toast'

export default function DeleteSupplierButton({ id }: { id: string }) {
  const { mutate: deleteSupplier, error } = useDeleteSupplier()
  const router = useRouter()

  const handleDelete = () => {
    try {
      deleteSupplier(id)
      toast({
        title: 'Success!',
        description: 'Supplier deleted successfully.',
      })
      return router.replace('/dashboard/supplier')
    } catch (error) {
      console.log(error)
      return toast({
        title: 'Error',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      })
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          className=""
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Supplier</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this supplier?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
