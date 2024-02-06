import CreateSupplierButton from '@/components/shared/CreateSupplierButton'
import SupplierList from '@/components/shared/SupplierList'

export default async function SupplierRoute() {
  return (
    <div className="py-12 px-8 w-full text-center">
      <h1 className="text-4xl mb-8">Suppliers</h1>
      <div className="flex flex-col items-center md:items-start space-y-4">
        <CreateSupplierButton />

        <SupplierList />
      </div>
    </div>
  )
}
