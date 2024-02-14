'use client'

import { averageOrdersPerMonth } from '@/lib/supabase/api/orders'
import DataChart from './DataChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MONTHS } from '@/constants'
import { ChartConfiguration } from 'chart.js'
import { cn } from '@/lib/utils'

export type RawData = {
  average: number
  month: string
  order_count: number
  total: number
  year: string
}
export default async function OrdersPerMonth({
  classesWrapper,
}: {
  classesWrapper?: string
}) {
  const res = await averageOrdersPerMonth()
  const rawData = res as RawData[]
  const labels = rawData.map((row) => MONTHS[parseInt(row.month) - 1])
  const totals = rawData.map((row) => row.total)
  const averages = rawData.map((row) => row.average)

  const options: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            if (+value >= 1000) {
              return (
                '€' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              )
            } else {
              return '€' + value
            }
          },
        },
        grid: {
          color: '#d3d3d3',
          drawTicks: false,
          lineWidth: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  if (rawData) {
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Totals /month',
          data: totals,
          backgroundColor: [
            // 'rgba(255, 99, 132, 0.2)',
            // 'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            // 'rgba(255, 99, 132, 1)',
            // 'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            // 'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
          order: 1,
        },
        {
          label: 'Averages /month',
          data: averages,
          type: 'line',
          borderColor: 'rgb(75, 192, 192)',
          order: 0,
        },
      ],
    }
    return (
      <div className={cn(classesWrapper)}>
        <h3 className="text-center text-xl">Orders Per Month</h3>
        <DataChart
          type="bar"
          data={data}
          options={options}
        />
      </div>
    )
  }
}
