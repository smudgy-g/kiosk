import SignInForm from '@/components/shared/forms/SignInForm'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

const SignInPage = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  if (data?.session) {
    redirect('/dashboard')
  }
  return (
    <Card className="bg-opacity-70">
      <CardHeader>
        <CardTitle className="text-4xl">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <Link
          href="/sign-up"
          className="text-sm hover:text-primary"
        >
          Not a member? Sign up today.
        </Link>
      </CardFooter>
    </Card>
  )
}

export default SignInPage
