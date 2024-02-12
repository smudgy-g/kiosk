import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="flex justify-center items-center min-h-screen flex-1 bg-norepeat bg-center bg-cover"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1632785984053-cc5777559c4c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="w-full h-full flex justify-center items-center text-white bg-red-800 bg-opacity-30">
        <div className="max-w-xl px-6">
          <h1 className="mb-5 text-5xl font-bold font-serif tracking-tighter">
            Woops! You seem to have strayed off the path.
          </h1>
          <p className="mb-5 text-xl text-left leading-6 ">
            Never mind, you can still rejoin us.
          </p>
          <Button
            asChild
            size={'lg'}
            className="font-bold"
          >
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
