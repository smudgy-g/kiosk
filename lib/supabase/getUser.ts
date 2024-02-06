// import { createClient } from '@/utils/supabase/actions'
// // import useSupabaseBrowser from '@/utils/supabase/client'
// import { cookies } from 'next/headers'

// export async function getUser() {
//   const cookieStore = cookies()
//   const supabase = createClient(cookieStore)

//   try {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession()

//     if (session?.user) {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', session.user)
//         .single()
//       if (error) throw new Error(error.message)
//       return data
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }
