import { EmailTemplate } from '@/components/shared/EmailTemplate'
import { EmailPostData } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.NEXT_RESEND_API_KEY)

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json()
  const { user, order, products, supplier }: EmailPostData = data

  try {
    const data = await resend.emails.send({
      from: 'Kyosk <kyosk@adamgriff.dev>', // 'Acme <onboarding@resend.dev>',
      to: [supplier.email!],
      subject: `Order for ${user.user_metadata.company} for delivery ${order.delivery_date}`,
      react: EmailTemplate({
        user,
        order,
        products,
        supplier,
      }) as React.ReactElement,
    })
    if (data.error) {
      return NextResponse.json({ success: false, message: data.error })
    } else if (data.data) {
      return NextResponse.json({ success: true, message: data.data })
    }
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}

/**
data {
  order: {
    comment: 'Ring bell on arrival',
    delivery_date: 'Fri Feb 23 2024',
    supplier_id: '51c55651-7236-4cd1-a1f8-58885490fd76',
    total: 414.66,
    user_id: '0ab847f4-0d66-44c8-b4d0-1cf1695ee876'
  },
  products: [
    {
      id: 'e864494f-e6de-4248-8147-7e80ab4c93cd',
      created_at: '2024-02-06T18:07:14.536545+00:00',
      name: 'Lazy Sunday Hazy Pale Ale 30L',
      price: 125,
      category: 'Beer',
      product_code: '5443',
      supplier_id: '51c55651-7236-4cd1-a1f8-58885490fd76',
      quantity: 2
    },
    {
      id: '750dd7d6-cbf9-47a1-b121-da1d05f25d28',
      created_at: '2024-02-06T12:00:52.308087+00:00',
      name: 'Longview Lager 24x330ml',
      price: 54.66,
      category: 'Beer',
      product_code: '08642',
      supplier_id: '51c55651-7236-4cd1-a1f8-58885490fd76',
      quantity: 1
    },
    {
      id: '41494100-e1a0-43e7-9ae2-3ce9922d76c4',
      created_at: '2024-02-06T13:45:41.525516+00:00',
      name: 'Hoppy Head IPA 50L Keg',
      price: 110,
      category: 'Beer',
      product_code: '876',
      supplier_id: '51c55651-7236-4cd1-a1f8-58885490fd76',
      quantity: 1
    }
  ],
  currentSupplier: {
    id: '51c55651-7236-4cd1-a1f8-58885490fd76',
    created_at: '2024-02-02T13:40:53.164215+00:00',
    name: 'Beer Dewds',
    email: 'beer@beerdewds.com',
    contact_name: 'Beerdy Mann',
    contact_number: '030 123 78697',
    user_id: '0ab847f4-0d66-44c8-b4d0-1cf1695ee876'
  }
}
 */
