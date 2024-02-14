import { Card, CardContent } from '@/components/ui/card'
import { currentMonthOrdersComparison } from '@/lib/supabase/api/orders'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type RawData = {
  total_current_month_orders: number
  total_previous_month_orders: number
  difference: number
}
export default async function CurrentMonthOrdersComparison({
  classesWrapper,
}: {
  classesWrapper?: string
}) {
  const data = (await currentMonthOrdersComparison()) as RawData

  if (data) {
    return (
      <div className={cn(classesWrapper)}>
        <div className="flex items-center justify-center gap-4">
          <Image
            alt="arrow"
            src="/assets/images/arrow.svg"
            height={100}
            width={100}
            className={cn('opacity-55', { 'rotate-180': data.difference > 0 })}
          />
          <div>
            <h3 className="text-acccent">Orders this month:</h3>
            <p className="text-2xl font-bold">
              €{data.total_current_month_orders}
            </p>
            <h3 className="text-acccent">Last Month:</h3>
            <p className="text-2xl font-bold">
              €{data.total_previous_month_orders}
            </p>
            <p className="text-sm mt-5">
              Difference of{' '}
              <span
                className={cn('text-primary font-bold', {
                  'text-destructive': data.difference > 0,
                })}
              >
                {data.difference}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
