import BottomBar from '@/components/shared/BottomBar'
import Loading from '@/components/shared/Loading'
import SideBar from '@/components/shared/SideBar'
import TopBar from '@/components/shared/TopBar'
import { Suspense } from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  

  return (
    <div className="w-full flex flex-col md:flex-row">
      <TopBar />
      <SideBar />

      <section className="flex flex-1 px-2">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </section>

      <BottomBar />
    </div>
  )
}

export default DashboardLayout
