'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import NavLinks from './NavLinks'
import { ExitIcon } from '@radix-ui/react-icons'
import { useGetProfile } from '@/lib/queries/user'

export default function SideBar() {
  const { data: profile } = useGetProfile()

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
            <p className="text-xl font-bold">{profile?.company}</p>
            <p className="text-sm">{profile?.email}</p>
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
          <ExitIcon className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </form>
    </nav>
  )
}
