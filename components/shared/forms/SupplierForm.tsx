import { GearIcon } from '@radix-ui/react-icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../../ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '../../ui/form'
import { newSupplierFormSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from '../../ui/use-toast'
import { Input } from '../../ui/input'
import { Supplier } from '@/types'
import { useRouter } from 'next/navigation'
import { useCreateSupplier, useUpdateSupplier } from '@/lib/queries/suppliers'
import { useSessionContext } from '../../context/SessionContext'
import { createClient } from '@/utils/supabase/client'

type SupplierFormProps = {
  type: 'Create' | 'Update'
  supplier?: Supplier
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function SupplierForm({
  type,
  supplier,
  setOpen,
}: SupplierFormProps) {
  const { mutateAsync: createSupplier } = useCreateSupplier()
  const {
    mutateAsync: updateSupplier,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useUpdateSupplier()
  const router = useRouter()
  const form = useForm<z.infer<typeof newSupplierFormSchema>>({
    resolver: zodResolver(newSupplierFormSchema),
    defaultValues: {
      contact_name: supplier?.contact_name || '',
      contact_number: supplier?.contact_number || '',
      email: supplier?.email || '',
      name: supplier?.name || '',
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof newSupplierFormSchema>> = async (
    data
  ) => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (type === 'Create') {
      if (!user) {
        return toast({
          title: 'Error',
          description: 'Something went wrong, please try again later.',
          variant: 'destructive',
        })
      }
      try {
        const newSupplier = await createSupplier({
          supplier: data,
          userId: user.id,
        })

        if (newSupplier) {
          form.reset()
          toast({
            title: 'Success!',
            description: 'Supplier created successfully.',
          })
          return router.push(`supplier/${newSupplier.id}`)
        }
      } catch (error) {
        console.log(error)
        toast({
          title: 'Error',
          description: 'Something went wrong, please try again later.',
          variant: 'destructive',
        })
      }
    } else if (type === 'Update') {
      if (!supplier) return router.back()

      try {
        const updatedSupplier = await updateSupplier({
          ...supplier,
          ...data,
        })

        if (updatedSupplier) {
          toast({
            title: 'Success!',
            description: 'Supplier updated successfully.',
          })

          router.refresh()
          return setOpen!(false)
        }
      } catch (error) {
        console.log(error)
        toast({
          title: 'Error',
          description: 'Something went wrong, please try again later.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormDescription>
                This is the email to send the orders to.
              </FormDescription>
              <FormControl>
                <Input
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telephone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <Button
        disabled={form.formState.isSubmitting}
        className="w-full mt-4"
        onClick={form.handleSubmit(onSubmit)}
      >
        {!form.formState.isSubmitting && <span>{type}</span>}
        {form.formState.isSubmitting && (
          <GearIcon className="animate-spin w-4 h-4" />
        )}
      </Button>
    </FormProvider>
  )
}
