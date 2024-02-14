'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'

import { useState } from 'react'
import { UserProfile } from '@/types'
import ProfileForm from './forms/ProfileForm'

export default function UpdateProfileButton({ data }: { data: UserProfile }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button variant='icon'>
          <Pencil2Icon className="h-5 w-5 mr-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Your Details</DialogTitle>
        </DialogHeader>
        <ProfileForm
          profile={data}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
