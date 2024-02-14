import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import ProductsOrderedByCategory from '@/components/shared/charts/ProductsOrderedByCategory'
import { Suspense } from 'react'
import OrdersPerMonth from '@/components/shared/charts/OrdersPerMonth'
import CurrentMonthOrdersComparison from '@/components/shared/charts/CurrentMonthOrdersComparison'

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div className="flex flex-col items-center w-full px-2 md:px-8 lg:px-12 py-8 gap-4">
      <div className="w-full text-center mb-8">
        <h2 className="text-4xl font-bold">Dashboard</h2>
      </div>

      <div className="flex flex-wrap justify-evenly gap-6">
        <Suspense fallback={<Skeleton className="w-[200px] h-[175px]" />}>
          <CurrentMonthOrdersComparison classesWrapper='h-[200px]'/>
        </Suspense>
        <Suspense
          fallback={<Skeleton className="w-[300px] h-[250px]" />}
        >
          <ProductsOrderedByCategory classesWrapper="min-w-[300px]" />
        </Suspense>
        <Suspense
          fallback={<Skeleton className="max-w-xl h-[400px] col-span-3" />}
        >
          <OrdersPerMonth classesWrapper="relative h-auto max-h-[500px] w-[calc(100%-1rem)]" />
        </Suspense>
      </div>
    </div>
  )
}
