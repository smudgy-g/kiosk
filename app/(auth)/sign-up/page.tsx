import SignUpForm from '@/components/shared/forms/SignUpForm'
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

const SignUpPage = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  if (data?.session) {
    redirect('/dashboard')
  }
  return (
    <Card className="bg-opacity-70">
      <CardHeader>
        <CardTitle className="text-4xl">Sign up today!</CardTitle>
        <CardDescription>
          We just need a few details to set up an account for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
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

export default SignUpPage
