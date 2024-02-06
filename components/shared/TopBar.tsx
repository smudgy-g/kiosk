import Link from 'next/link'
import { Button } from '../ui/button'

const TopBar = () => {
  return (
    <section className="sticky top-0 z-50 md:hidden bg-background border-foreground border-b w-full">
      <div className="flex justify-between items-center py-3 px-5">
        <Link
          href="/dashboard"
          className="flex gap-3 items-center"
        >
          {/* <img
            src="/assets/images/logo.png"
            alt="logo"
            width={170}
          /> */}
          <h1 className="font-serif text-primary font-bold text-3xl tracking-tight">
            kyosk
          </h1>
        </Link>

        <div className="flex gap-4">
          <form
            action="/auth/signout"
            method="post"
          >
            <Button type="submit">Sign out</Button>
          </form>
          <Link
            href={`dashboard/profile`}
            className="flex gap-3"
          >
            {/* <img
              src={user.imageUrl}
              alt="Profile"
              className="h-9"
            /> */}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopBar
