'use client'

import { lastMonthOrdersByCategory } from '@/lib/supabase/api/orders'
import DataChart from './DataChart'
import { Card, CardContent } from '@/components/ui/card'

export type RawData = {
  total_products_ordered: number
  category: string
  total_category_products: number
  total_cost: number
  percentage_ordered: number
}
export default async function ProductsOrderedByCategory() {
  const res = await lastMonthOrdersByCategory('2024-02')
  const rawData = (res as RawData[]) || {}
  const labels = rawData.map((row) => row.category)
  const chartData = rawData.map((row) => row.total_cost)

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
      <Card>
        <CardContent>
          <DataChart
            type="doughnut"
            data={data}
          />
        </CardContent>
      </Card>
    )
  }
}
