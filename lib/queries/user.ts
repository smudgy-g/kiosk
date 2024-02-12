import { NewUser, UserProfile } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createUserAccount,
  getProfile,
  signInUser,
  updateProfile,
} from '../supabase/api/user'
import { QUERY_KEYS } from './queryKeys'

export function useGetProfile() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PROFILE],
    queryFn: () => getProfile(),
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (profile: UserProfile) => updateProfile(profile),
    onSuccess: (updatedProfile) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROFILE],
      })
    },
  })
}

export function useCreateUser() {
  return useMutation({
    mutationFn: (user: NewUser) => createUserAccount(user),
  })
}

export function useSignInUser() {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => signInUser(user),
  })
}
