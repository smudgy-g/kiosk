import CreateSupplierButton from '@/components/shared/CreateSupplierButton'
import SupplierList from '@/components/shared/SupplierList'
import { Separator } from '@/components/ui/separator'

export default async function SupplierRoute() {
  return (
    <div className="py-12 px-8 w-full">
      <h1 className="text-4xl mb-8">Suppliers</h1>
      <div className="flex flex-col items-center md:items-start space-y-4">
        <CreateSupplierButton />
        <Separator />

        <SupplierList />
      </div>
    </div>
  )
}
