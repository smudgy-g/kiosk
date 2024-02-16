'use client'

import { ThemeProvider } from '@/components/context/ThemeProvider'
import { OrderProvider } from './OrderContext'
import QueryProvider from './QueryProvider'
import SessionProvider from './SessionContext'
export function Providers({
  children,
  accessToken,
}: {
  children: React.ReactNode
  accessToken: any
}) {
  return (
    <SessionProvider accessToken={accessToken?.access_token}>
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <OrderProvider>{children}</OrderProvider>
        </ThemeProvider>
      </QueryProvider>
    </SessionProvider>
  )
}
