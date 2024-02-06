// import AccountForm from '@/components/shared/account-form'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import React from 'react'

const UpdateUserPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user)
    return (
      <div>
        Update Account Details
        {/* <AccountForm user={user} /> */}
      </div>
    )
}

export default UpdateUserPage
