import { User } from "@supabase/supabase-js"

export type NavLink = {
  icon: any
  route: string
  label: string
}

export type Supplier = {
  contact_name: string | null
  contact_number: string | null
  created_at: string
  email: string | null
  id: string
  name: string | null
  user_id: string | null
}

export type Product = {
  id: string
  name: string
  price: number
  supplier_id: string
  category: string
  product_code: string
}

export type Order = {
  id: string
  comment: string | null
  user_id: string
  supplier_id: string
  created_at: string
  delivery_date: string
}

export interface OrderWithTotal extends Order {
  total: number
}

export interface OrderWithSupplierName extends Order {
  supplier: string
}

export type NewProduct = Omit<Product, 'id' | 'supplier_id'>

export type NewUser = {
  email: string
  password: string
  name: string
  company: string
  address: string
}

export interface ProductWithQuantity extends Product {
  quantity: number | 0
}
export interface OrderProduct extends ProductWithQuantity {
  total: number | 0
}

export type LocalStorageOrder = {
  [supplierId: string]: ProductWithQuantity[]
}

export type OrderContextType = {
  orders: LocalStorageOrder
  setOrders: React.Dispatch<React.SetStateAction<LocalStorageOrder>>
  currentSupplier: Supplier | undefined
  setCurrentSupplier: React.Dispatch<React.SetStateAction<Supplier | undefined>>
}

export type NewOrder = {
  user_id: string
  supplier_id: string
  total: number
  comment: string
  delivery_date: string
}

export type UserProfile = {
  full_name: string | null
  company: string | null
  email: string | null
  address: string | null
}

export interface EmailPostData {
  user: User
  order: OrderWithTotal
  products: ProductWithQuantity[]
  supplier: Supplier
}
