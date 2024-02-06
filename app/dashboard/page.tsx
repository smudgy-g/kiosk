import BottomBar from '@/components/shared/BottomBar'
import Loading from '@/components/shared/Loading'
import SideBar from '@/components/shared/SideBar'
import TopBar from '@/components/shared/TopBar'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div
      className="flex flex-1 h-full"
      style={{
        backgroundImage: 'url(/assets/images/bg.svg)',
      }}
    >
      Dashboard Home Page
      <p>Hello {data.user.email}</p>
    </div>
  )
}
