import { EmailPostData } from '@/types'
import * as React from 'react'

export const EmailTemplate: React.FC<Readonly<EmailPostData>> = ({
  user,
  order,
  products,
  supplier,
}) => (
  <div>
    <body>
      <h1>Order for {user.user_metadata.company}</h1>

      <p>Dear {supplier.name},</p>

      <p>
        {user.user_metadata.company} would like to order the following items for
        delivery: <strong>{order.delivery_date}</strong>
      </p>
      <p>Additional comments:</p>
      <p>{order.comment}</p>

      <table style={{ width: '100%', tableLayout: 'auto', borderCollapse: 'collapse' }}>
        <thead style={{backgroundColor: '#88efdd'}}>
          <tr>
            <th style={{ textAlign: 'start', fontSize: '.75rem', border: '1px dashed #ddd', padding: '8px' }}>
              Product ID
            </th>
            <th style={{ textAlign: 'start', fontSize: '.75rem', border: '1px dashed #ddd', padding: '8px' }}>
              Product Name
            </th>
            <th style={{ textAlign: 'end', fontSize: '.75rem', border: '1px dashed #ddd', padding: '8px' }}>
              Listed Price
            </th>
            <th style={{ textAlign: 'end', fontSize: '.75rem', border: '1px dashed #ddd', padding: '8px' }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td style={{ textAlign: 'start', border: '1px dashed #ddd', padding: '8px' }}>{product.product_code}</td>
              <td style={{ textAlign: 'start', border: '1px dashed #ddd', padding: '8px' }}>{product.name}</td>
              <td style={{ textAlign: 'end', border: '1px dashed #ddd', padding: '8px' }}>{product.price}</td>
              <td style={{ textAlign: 'end', border: '1px dashed #ddd', padding: '8px' }}>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Please let us know if you have any questions or concerns about this
        order. Thank you for your prompt attention to this matter.
      </p>

      <p>Best regards,</p>
      <p>{user.user_metadata.full_name}</p>
      <a href="mailto:${client.email}">{user.email}</a>
    </body>
  </div>
)
