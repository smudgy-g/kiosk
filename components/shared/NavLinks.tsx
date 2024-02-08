'use client'

import { NAV_LINKS } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function NavLinks() {
  const pathname = usePathname()
  return (
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
  )
}
