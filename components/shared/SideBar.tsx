'use client'

import { NAV_LINKS } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/button'
import { createClient } from '@/utils/supabase/client'

const SideBar = async () => {
  const pathname = usePathname()
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav className="hidden md:flex px-6 py-10 flex-col justify-between max-w-[250px] border-white border-r">
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

        <ul className="flex flex-col space-y-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.route)
            return (
              <li
                key={link.label}
                className={`font-bold hover:text-primary ${
                  isActive && 'text-primary'
                }`}
              >
                <Link
                  href={link.route}
                  className="flex gap-2 items-center p-3"
                >
                  <link.icon className="h-6 w-6" />
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <form
        action="/auth/signout"
        method="post"
      >
        <Button
          className="btn"
          type="submit"
        >
          Sign out
        </Button>
      </form>
    </nav>
  )
}

export default SideBar
