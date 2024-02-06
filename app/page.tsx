import { Button } from '@/components/ui/button'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function IndexPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in')
  }
  return (
    <div
      className="flex justify-center items-center min-h-screen flex-1 bg-repeat"
      style={{
        backgroundImage: 'url(/assets/images/bg.svg)',
      }}
    >
      <div className="relative flex justify-center items-center text-center text-white">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hey there! 👋</h1>
          <p className="mb-5">
            Consolidate your ordering needs into one convenient platform, saving
            you time and effort. Whether you need to restock ingredients,
            beverages, or other supplies, kiosk has got you covered.
          </p>
          <Button asChild size={'lg'}>
            <Link href="/sign-in">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
