import { Supplier } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { EyeOpenIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function SupplierCard({ data }: { data: Supplier }) {
  const { contact_name = '', email = '', name = '', id } = data
  return (
    <Card className="w-full md:min-w-[195px] md:w-52 max-w-64 flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-xl tracking-tight leading-6">
          {name}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          asChild
        >
          <Link href={`/dashboard/supplier/${id}`}>
            <EyeOpenIcon className="mr-2 h-4 w-4" />
            Details
          </Link>
        </Button>
        <Button
          size="lg"
          className="w-full"
          asChild
        >
          <Link href={`/dashboard/supplier/${id}`}>
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Order
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
