import { ReloadIcon } from '@radix-ui/react-icons'
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
import { updateProfileFormSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from '../../ui/use-toast'
import { Input } from '../../ui/input'
import { UserProfile } from '@/types'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateProfile } from '@/lib/queries/user'

type SupplierFormProps = {
  profile: UserProfile
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function SupplierForm({ profile, setOpen }: SupplierFormProps) {
  const { mutateAsync: updateProfile } = useUpdateProfile()
  const router = useRouter()
  const form = useForm<z.infer<typeof updateProfileFormSchema>>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      address: profile?.address || '',
      email: profile?.email || '',
      company: profile?.company || '',
    },
  })

  const onSubmit: SubmitHandler<
    z.infer<typeof updateProfileFormSchema>
  > = async (data) => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return toast({
        title: 'Error',
        description: 'Something went wrong, please try again later.',
        variant: 'destructive',
      })
    }

    try {
      const updatedProfile = await updateProfile({
        ...profile,
        ...data,
      })

      if (updatedProfile) {
        toast({
          title: 'Success!',
          description: 'Profile updated successfully.',
        })

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

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
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
              <FormControl>
                <Input
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Company</FormLabel>
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Address</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="no-resize"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <Button
        disabled={form.formState.isSubmitting}
        className="mt-4"
        onClick={form.handleSubmit(onSubmit)}
      >
        {form.formState.isSubmitting && (
          <ReloadIcon className="animate-spin w-4 h-4 mr-3" />
        )}
        <span>Update</span>
      </Button>
    </FormProvider>
  )
}
