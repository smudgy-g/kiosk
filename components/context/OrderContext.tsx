import { Order, OrderContextType, Product, Supplier } from '@/types'
import { createContext, useContext, useState, useEffect } from 'react'



const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const useOrderContext = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider')
  }
  return context
}

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order>(() => {
    const storedOrders = localStorage.getItem('orders')
    return storedOrders ? JSON.parse(storedOrders) : {}
  })
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | undefined>()

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])
  return (
    <OrderContext.Provider
      value={{ orders, setOrders, currentSupplier, setCurrentSupplier }}
    >
      {children}
    </OrderContext.Provider>
  )
}
