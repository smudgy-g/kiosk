import { NAV_LINKS } from '@/constants'
import { Database } from '@/types/supabase'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Button } from '../ui/button'
import { createClient } from '@/utils/supabase/server'

const SideBar = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] border-white border-r">
      <div className="flex flex-col gap-11">
        <Link
          href="/dashboard"
          className="flex gap-3 items-center"
        >
          {/* <img
            src="/assets/images/logo.png"
            alt="logo"
            width={200}
          /> */}
          <h1 className="font-serif text-primary font-bold text-5xl tracking-tight">
            kyosk
          </h1>
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
            // const isActive = pathname === link.route
            return (
              <li
                key={link.label}
                className={`group font-bolb ${'link-active'}`}
              >
                <Link
                  href={link.route}
                  className="flex gap-4 items-center p-3"
                >
                  <link.icon className="h-6 w-6"/>
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
