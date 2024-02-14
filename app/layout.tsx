import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cn } from '@/lib/utils'

import { fontSans, fontSerif } from '@/components/shared/Font'
import { Providers } from '@/components/context/Providers'

export const metadata: Metadata = {
  title: 'Kyosk',
  description:
    'Consolidate your ordering needs into one convenient platform saving you time and effort. Whether you need to restock ingredients, beverages, or other supplies, kyosk has got you covered.',
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
        <Providers accessToken={session}>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
