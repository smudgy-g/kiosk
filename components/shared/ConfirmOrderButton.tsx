'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'

import OrderForm from './forms/OrderForm'

type ConfirmOrderButtonProps = {
  disabled: boolean
  total: number
  supplierId: string
}
export default function ConfirmOrderButton({
  disabled,
  total,
  supplierId
}: ConfirmOrderButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Confirm Order</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delivery Details</DialogTitle>
        </DialogHeader>
        <OrderForm total={total} supplierId={supplierId}/>
      </DialogContent>
    </Dialog>
  )
}
