import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function IndexPage() {
  return (
    <div
      className="flex justify-center items-center min-h-screen flex-1 bg-norepeat bg-center bg-cover"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1632785984053-cc5777559c4c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="relative flex justify-center items-center text-center text-primary-foreground bg-white bg-opacity-70 rounded-3xl">
        <div className="max-w-md p-8">
          <h1 className="mb-5 text-5xl font-bold font-serif tracking-tighter">
            Welcome to kyosk
          </h1>
          <p className="mb-5 text-xl leading-5">
            Consolidate your ordering needs into one convenient platform, saving
            you time and effort. Whether you need to restock ingredients,
            beverages, or other supplies, kiosk has got you covered.
          </p>
          <Button
            asChild
            size={'lg'}
            className="font-bold"
          >
            <Link href="/sign-in">Get Started! 🍉</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
