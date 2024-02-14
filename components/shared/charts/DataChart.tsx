'use client'

import { months } from '@/lib/utils'
import { Chart, registerables, ChartConfiguration } from 'chart.js'
import React, { useEffect, useRef } from 'react'
import { darkOptions } from './Themes'

function DataChart(props: ChartConfiguration) {
  const { data, options } = props
  const chartRef = useRef<HTMLCanvasElement>(null)

  // const labels = months({ count: 7 })

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        ...props,
        options: {
          ...options,
          ...darkOptions,
        },
      })
      return () => {
        chart.destroy()
      }
    }
  }, [data])
  return <canvas ref={chartRef} />
}

Chart.register(...registerables)

export default DataChart
