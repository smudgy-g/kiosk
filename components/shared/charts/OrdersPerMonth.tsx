'use client'

import {
  averageOrdersPerMonth,
  lastMonthOrdersByCategory,
} from '@/lib/supabase/api/orders'
import DataChart from './DataChart'
import { Card, CardContent } from '@/components/ui/card'
import { months } from '@/lib/utils'

export type RawData = {
  average: number
  month: string
  order_count: number
  total: number
  year: string
}
export default async function OrdersPerMonth() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const res = await averageOrdersPerMonth()
  console.log(res)
  const rawData = (res as RawData[]) || {}
  const labels = rawData.map((row) => months[parseInt(row.month) - 1])
  const totals = rawData.map((row) => row.total)
  const averages = rawData.map((row) => row.average)

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'left',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Chart.js Combined Line/Bar Chart'
  //     }
  //   }
  // }
  // const labels = months({count: 12});
  if (rawData) {
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Totals /month',
          data: totals,
          order: 1,
        },
        {
          label: 'Averages /month',
          data: averages,
          // borderColor: ,
          // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
          type: 'line',
          order: 0,
        },
      ],
    }
    return (
      <Card>
        <CardContent className="w-[calc(100%-0.1rem)] h-full">
          <DataChart
            type="bar"
            data={data}
            // options={options}
          />
        </CardContent>
      </Card>
    )
  }
}
