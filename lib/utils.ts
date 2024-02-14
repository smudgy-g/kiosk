import { MONTHS } from '@/constants'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const months = (config: any) => {
  const cfg = config || {}
  const count = cfg.count || 12
  const section = cfg.section
  const values = []
  let i, value

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12]
    values.push(value.substring(0, section))
  }

  return values
}
