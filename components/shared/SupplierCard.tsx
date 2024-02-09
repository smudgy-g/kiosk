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
import { Badge } from '@/components/ui/badge'

import { EyeOpenIcon, PaperPlaneIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function SupplierCard({
  data,
  hasOrder,
}: {
  data: Supplier
  hasOrder?: boolean
}) {
  const { contact_name = '', email = '', name = '', id } = data
  return (
    <Card className="w-full md:min-w-[195px] max-w-56 flex flex-col justify-between text-center">
      <CardHeader>
        <CardTitle className="text-xl tracking-tight leading-6">
          {name}
        </CardTitle>
        <CardDescription>
          {hasOrder && (
            <Badge className="bg-[hsl(var(--highlight))]">
              Order in progress
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="lg"
          asChild
        >
          <Link href={`/dashboard/supplier/${id}`}>
            <EyeOpenIcon className="mr-2 h-4 w-4" />
            Details
          </Link>
        </Button>
        <Button
          size="lg"
          asChild
        >
          <Link href={`/dashboard/supplier/${id}/order`}>
            <PaperPlaneIcon className="mr-2 h-4 w-4" />
            Order
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
