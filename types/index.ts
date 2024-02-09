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

export type NewProduct = Omit<Product, 'id' | 'supplier_id'>

export type NewUser = {
  email: string
  password: string
  name: string
  company: string
  address: string
}

export interface ProductToOrder extends Product {
  quantity: number | 0
}
export interface Order {
  [supplierId: string]: ProductToOrder[]
}

export interface OrderContextType {
  orders: Order
  setOrders: React.Dispatch<React.SetStateAction<Order>>
  currentSupplier: Supplier | undefined
  setCurrentSupplier: React.Dispatch<React.SetStateAction<Supplier | undefined>>
}

export interface NewOrder {
  user_id: string
  supplier_id: string
  total: number
  comment: string
  delivery_date: string
}
