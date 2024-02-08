import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cn } from '@/lib/utils'

import QueryProvider from '@/components/context/QueryProvider'
import SessionProvider from '@/components/context/SessionContext'
import { fontSans, fontSerif } from '@/components/shared/Font'
import { ThemeProvider } from '@/components/context/ThemeProvider'

export const metadata: Metadata = {
  title: 'Kiosk',
  description:
    'Consolidate your ordering needs into one convenient platform saving you time and effort. Whether you need to restock ingredients, beverages, or other supplies, kiosk has got you covered.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <html lang="en">
      <body
        className={cn(
          'flex h-dvh bg-background font-sans antialiased',
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <SessionProvider
          accessToken={session?.access_token}
          sessionUser={session?.user}
        >
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
