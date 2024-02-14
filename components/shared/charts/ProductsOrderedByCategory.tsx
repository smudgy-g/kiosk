'use client'

import { lastMonthOrdersByCategory } from '@/lib/supabase/api/orders'
import DataChart from './DataChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfiguration } from 'chart.js'
import { cn } from '@/lib/utils'

export type RawData = {
  total_products_ordered: number
  category: string
  total_category_products: number
  total_cost: number
  percentage_ordered: number
}
export default async function ProductsOrderedByCategory({
  classesWrapper,
}: {
  classesWrapper?: string
}) {
  const res = await lastMonthOrdersByCategory('2024-02')
  const rawData = res as RawData[]
  const labels = rawData.map((row) => row.category)
  const chartData = rawData.map((row) => row.total_cost)

  const options: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
    plugins: {
      legend: {
        position: 'right',
      },
    },
  }

  if (rawData) {
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Amount in euros',
          data: chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
    return (
      <div className={cn(classesWrapper)}>
          <h3 className="text-xl">
            Orders by Category
          </h3>
        <div className="relative h-auto max-h-[250px] w-[calc(100%-1rem)]">
          <DataChart
            type="doughnut"
            data={data}
            options={options}
          />
        </div>
      </div>
    )
  }
}
