export default function OrderSlugRoute({
  params: { id },
}: {
  params: { id: string }
}) {
  return <div>Order for {id}</div>
}
