import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

const SuccessPage = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  if (data.session) {
    redirect('/dashboard')
  }

  return (
    <Card className="h-full md:h-fit">
      <CardHeader>
        <CardTitle className="text-4xl">Success!</CardTitle>
        <CardDescription>You're almost there</CardDescription>
      </CardHeader>
      <CardContent>Check your email for the signup confirmation</CardContent>
      <CardFooter>
        <Link
          href="/sign-in"
          className="text-sm hover:text-primary"
        >
          Already a member? Sign in.
        </Link>
      </CardFooter>
    </Card>
  )
}

export default SuccessPage
