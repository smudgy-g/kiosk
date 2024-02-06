
import { NewUser } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createUserAccount, getUser, signInUser } from '../supabase/api/user'

export default function useGetUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })
}

export function useCreateUser(){
  return useMutation({
    mutationFn: (user: NewUser) => createUserAccount(user)
  })
}

export function useSignInUser(){
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInUser(user),
  })
}
