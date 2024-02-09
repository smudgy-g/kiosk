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
} from '../../ui/form'
import { productFormSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from '../../ui/use-toast'
import { Input } from '../../ui/input'
import { useRouter } from 'next/navigation'
import { Product } from '@/types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { PRODUCT_TYPES } from '@/constants'
import { useCreateProduct, useUpdateProduct } from '@/lib/queries/products'

type ProductFormProps = {
  supplierId?: string
  type: 'Create' | 'Update'
  product?: Product
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function ProductForm({
  supplierId,
  type,
  product,
  setOpen,
}: ProductFormProps) {
  const { mutateAsync: createProduct } = useCreateProduct()
  const {
    mutateAsync: updateProduct,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useUpdateProduct()
  const router = useRouter()
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      category: product?.category || '',
      product_code: product?.product_code || '',
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof productFormSchema>> = async (
    data
  ) => {

    if (type === 'Create') {
      if (!supplierId) {
        return toast({
          title: 'Error',
          description: 'Something went wrong, please try again later.',
          variant: 'destructive',
        })
      }

      try {
        const newProduct = await createProduct({
          product: data,
          supplierId,
        })

        if (newProduct) {
          form.reset()
          toast({
            title: 'Success!',
            description: 'Product created successfully.',
          })
          router.refresh()
          if (setOpen) return setOpen(false)
        }
      } catch (error) {
        console.log(error)
        toast({
          title: 'Error updating',
          description: 'Something went wrong, please try again later.',
          variant: 'destructive',
        })
      }
    } else if (type === 'Update') {
      if (!product) return router.back()

      try {
        const updatedProduct = await updateProduct({
          ...product,
          ...data,
        })

        if (updatedProduct) {
          toast({
            title: 'Success!',
            description: 'Product updated successfully.',
          })

          if (setOpen) return setOpen(false)
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
              <FormLabel>Product Name</FormLabel>
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
          name="product_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Product</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Product type</SelectLabel>
                      {PRODUCT_TYPES.map((type) => (
                        <SelectItem
                          value={type}
                          key={type}
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
        {form.formState.isSubmitting && (
          <ReloadIcon className="animate-spin w-4 h-4" />
        )}
        <span>{type}</span>
      </Button>
    </FormProvider>
  )
}
