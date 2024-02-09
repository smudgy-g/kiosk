import Link from 'next/link'
import { Button } from '../ui/button'
import { createClient } from '@/utils/supabase/server'
import NavLinks from './NavLinks'
import { cookies } from 'next/headers'
import { ExitIcon } from '@radix-ui/react-icons'

const SideBar = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav className="hidden md:flex px-6 py-10 flex-col justify-between max-w-[250px] border-[hsl(var(--highlight))] border-r">
      <div className="flex flex-col gap-11">
        <Link
          href="/dashboard"
          className="flex gap-3 items-center"
        >
          <h1 className="logo">kyosk</h1>
        </Link>
        <Link
          href={`dashboard/profile`}
          className="flex gap-3"
        >
          <div className="flex flex-col">
            <p className="text-xl font-bold">{user?.user_metadata?.company}</p>
            <p className="text-sm">{user?.email}</p>
          </div>
        </Link>
        <NavLinks />
        
      </div>
      <form
        action="/auth/signout"
        method="post"
      >
        <Button
          className="btn"
          type="submit"
        >
          <ExitIcon className='w-4 h-4 mr-2' />
          Sign out
        </Button>
      </form>
    </nav>
  )
}

export default SideBar
