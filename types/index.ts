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

// export interface User {
//   company: string;
//   email: string;
//   full_name: string;
//   id: string;
//   updated_at: string;
// }

// export type ContextType = {
//   user: Pick<User, 'id' | 'email' >
// }
