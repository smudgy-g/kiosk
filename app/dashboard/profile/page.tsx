'use client'

import UpdateProfileButton from '@/components/shared/UpdateProfileButton'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetProfile } from '@/lib/queries/user'
import { UserProfile } from '@/types'
import { EnvelopeClosedIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function ProfilePage() {
  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError,
  } = useGetProfile()
  const { address = '', company = '', email = '', full_name } = profile || {}

  return (
    <div className="flex flex-col items-center w-full px-2 md:px-8 lg:px-12 py-8 gap-4">
      {isLoadingProfile && (
        <Skeleton className="w-full max-w-xl h-[300px] md:h-[250px]" />
      )}
      {profile && (
        <div className="w-full max-w-xl flex flex-col gap-4">
          <div className="flex w-full justify-between items-start">
            <h2 className="text-primary text-4xl font-bold">{company}</h2>
            <div className="flex py-1 flex-row items-end gap-2">
              <UpdateProfileButton data={profile as UserProfile} />
            </div>
          </div>
          <div className="flex flex-col mt-4 gap-3">
            <h4 className="text-xl font-bold">Your Contact Details</h4>
            <div className="space-y-1">
              <div className="flex items-center">
                <EnvelopeClosedIcon className="w-4 h-4 mr-4" />
                {email}
              </div>
              <div className="flex items-center">
                <PersonIcon className="w-4 h-4 mr-4" />
                <p>{full_name}</p>
              </div>
              <div className="flex items-center">
                <HomeIcon className="w-4 h-4 mr-4" />
                <p>{address}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
