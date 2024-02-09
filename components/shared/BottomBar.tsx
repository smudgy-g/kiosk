'use client'

import { NAV_LINKS } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BottomBar = () => {
  const pathname = usePathname()
  return (
    <section className="z-50 flex justify-around items-center w-full bg-background border-foreground border-t sticky bottom-0 px-5 py-1 md:hidden">
      {NAV_LINKS.map((link) => {
        const isActive = pathname.startsWith(link.route)
        return (
          <Link
            href={link.route}
            key={link.label}
            className={`${
              isActive && 'text-primary'
            } flex items-center flex-col gap-1 transition`}
          >
            <link.icon className="w-6 h-6" />
            <p className="text-sm leading-tight font-bold">{link.label}</p>
          </Link>
        )
      })}
    </section>
  )
}

export default BottomBar
