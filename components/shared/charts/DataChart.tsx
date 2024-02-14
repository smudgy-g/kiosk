'use client'

import { Chart, registerables, ChartConfiguration } from 'chart.js'
import React, { useEffect, useRef } from 'react'

function DataChart(props: ChartConfiguration) {
  const { data, options } = props
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        ...props,
        options: {
          ...options,
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
