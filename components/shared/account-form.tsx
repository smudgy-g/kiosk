// 'use client'
// import { useCallback, useEffect, useState } from 'react'
// import {
//   User,
//   createClientComponentClient,
// } from '@supabase/auth-helpers-nextjs'
// import { Database } from '@/types/supabase'
// import { Button } from '../ui/button'

// export default function AccountForm({ user }: { user: User | null }) {
//   const supabase = createClientComponentClient<Database>()
//   const [loading, setLoading] = useState(true)
//   const [fullname, setFullname] = useState<string | null>(null)
//   const [company, setCompany] = useState<string | null>(null)
//   const [email, setEmail] = useState<string | null>(null)

//   const getProfile = useCallback(async () => {
//     try {
//       setLoading(true)

//       const { data, error, status } = await supabase
//         .from('profiles')
//         .select(`full_name, company, email`)
//         .eq('id', user!.id)
//         .single()

//       if (error && status !== 406) {
//         throw error
//       }

//       if (data) {
//         setFullname(data.full_name)
//         setCompany(data.company)
//         setEmail(data.email)
//       }
//     } catch (error) {
//       alert('Error loading user data!')
//     } finally {
//       setLoading(false)
//     }
//   }, [user, supabase])

//   useEffect(() => {
//     getProfile()
//   }, [user, getProfile])

//   async function updateProfile({
//     company,
//     fullname,
//     email,
//   }: {
//     company: string | null
//     fullname: string | null
//     email: string | null
//   }) {
//     try {
//       setLoading(true)

//       const { error } = await supabase.from('profiles').upsert({
//         id: user?.id as string,
//         full_name: fullname,
//         company,
//         fullname,
//         email,
//         updated_at: new Date().toISOString(),
//       })
//       if (error) throw error
//       alert('Profile updated!')
//     } catch (error) {
//       alert('Error updating the data!')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="form-widget">
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="text"
//           value={user?.email}
//           disabled
//         />
//       </div>
//       <div>
//         <label htmlFor="fullName">Full Name</label>
//         <input
//           id="fullName"
//           type="text"
//           value={fullname || ''}
//           onChange={(e) => setFullname(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="company">Company</label>
//         <input
//           id="company"
//           type="text"
//           value={company || ''}
//           onChange={(e) => setCompany(e.target.value)}
//         />
//       </div>

//       <div>
//         <Button
//           onClick={() => updateProfile({ fullname, company, email })}
//           disabled={loading}
//         >
//           {loading ? 'Loading ...' : 'Update'}
//         </Button>
//       </div>

//       <div>
//         <form
//           action="/auth/signout"
//           method="post"
//         >
//           <Button type="submit">Sign out</Button>
//         </form>
//       </div>
//     </div>
//   )
// }
