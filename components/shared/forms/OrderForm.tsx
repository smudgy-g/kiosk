import { useOrderContext } from '@/components/context/OrderContext'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { useCreateOrder } from '@/lib/queries/orders'
import { useGetProfile } from '@/lib/queries/user'
import { cn } from '@/lib/utils'
import { orderConfirmFormSchema } from '@/lib/validators'
import { NewOrder, LocalStorageOrder } from '@/types'
import { createClient } from '@/utils/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function OrderForm({
  total,
  supplierId,
}: {
  total: number
  supplierId: string
}) {
  const { orders, setOrders, currentSupplier } = useOrderContext()
  const { mutateAsync: createOrder } = useCreateOrder()
  const { data: profile } = useGetProfile()
  const router = useRouter()

  const form = useForm<z.infer<typeof orderConfirmFormSchema>>({
    resolver: zodResolver(orderConfirmFormSchema),
  })

  const onSubmit: SubmitHandler<
    z.infer<typeof orderConfirmFormSchema>
  > = async (data) => {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const order: NewOrder = {
      comment: data.comment,
      delivery_date: data.deliveryDate.toDateString(),
      supplier_id: supplierId,
      total: total,
      user_id: user.id,
    }

    const products = orders[supplierId]
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: profile,
          order,
          products,
          supplier: currentSupplier,
        }),
      })

      if (!res.ok) throw new Error('Error sending email.')

      const newOrder = await createOrder({
        order: order,
        products: products,
      })

      if (!newOrder) throw new Error('Error adding order to database.')

      form.reset()

      setOrders((prevOrders: LocalStorageOrder) => {
        const updatedOrders = { ...prevOrders }
        delete updatedOrders[supplierId]
        return updatedOrders
      })

      toast({
        title: 'Success!',
        description: 'Order has been sent.',
      })

      router.push(`/dashboard/order/${newOrder.id}`)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again later.',
        variant: 'destructive',
      })
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Delivery Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="bg-popover rounded-md border"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please delivery after 3pm."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {form.formState.isSubmitting && (
            <ReloadIcon className="animate-spin w-4 h-4 mr-3" />
          )}
          Place Order
        </Button>
      </form>
    </Form>
  )
}
