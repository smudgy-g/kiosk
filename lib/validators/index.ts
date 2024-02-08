import { z } from 'zod'

export const signUpFormSchema = z.object({
  name: z.string().min(5),
  company: z.string().min(3),
  address: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(3),
})

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

export const newSupplierFormSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email().min(3),
  contact_name: z.string().min(3).max(50),
  contact_number: z.string(),
})

export const productFormSchema = z.object({
  name: z.string().min(3).max(50),
  price: z.coerce.number().min(0.01),
  category: z.string(),
  product_code: z.string(),
})
