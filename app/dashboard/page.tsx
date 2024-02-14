import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import ProductsOrderedByCategory from '@/components/shared/charts/ProductsOrderedByCategory'
import { Suspense } from 'react'
import OrdersPerMonth from '@/components/shared/charts/OrdersPerMonth'

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div className="flex flex-col items-center w-full px-2 md:px-8 lg:px-12 py-8 gap-4">
      <div className="w-full max-w-xl flex flex-col gap-4">
        <div className="flex w-full justify-between items-start">
          <h2 className="text-primary text-4xl font-bold">Dashboard</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full">
        <Card>
          <CardContent>
            <h3 className="text-3xl">Average /month</h3>
            <p>€450.65</p>
            <h3 className="text-3xl">Last Month</h3>
            <p>€400.65</p>
          </CardContent>
        </Card>
        <Suspense
          fallback={<Skeleton className="w-auto h-[250px] bg-green-300" />}
        >
          <ProductsOrderedByCategory />
        </Suspense>
        <div className="w-auto col-span-3">
          <Suspense
            fallback={<Skeleton className="w-auto h-[400px] bg-green-300" />}
          >
            <OrdersPerMonth />
          </Suspense>
        </div>

        {/* graph */}
        {/* <Skeleton className="w-auto h-[400px] bg-red-200 col-span-2" />
        <Skeleton className="w-auto h-[250px] bg-red-200 col-span-1" /> */}
      </div>
    </div>
  )
}
