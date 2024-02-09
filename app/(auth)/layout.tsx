'use client'

import Loading from '@/components/shared/Loading'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  return (
    <div
      className="min-h-screen flex w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1632785984053-cc5777559c4c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="w-full h-full flex justify-center items-center text-primary-foreground bg-green-300 bg-opacity-70">
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </div>
    </div>
  )
}

export default AuthLayout
