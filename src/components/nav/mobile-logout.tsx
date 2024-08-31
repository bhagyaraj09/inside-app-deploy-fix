"use client"
import Link from 'next/link'
import HSpacer from '@/components/ui/h-spacer'
import { useSession } from "next-auth/react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function MobileLogout() {
  const { data: session, status } = useSession();
  return (
    <div className="block md:hidden">
        <HSpacer />
        <div className="pl-2 text-green-500 text-sm">SECURITY</div>
        <div className="flex justify-center h-12 w-full"> 
            <Avatar>
              <AvatarImage src={session?.user.picture?? ''} />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
        </div>
        <div className="flex justify-center w-full text-slate-500 text-sm mt-2">{session?.user.name}</div>
        <div className="flex justify-center w-full text-slate-500 text-sm mt-2">
          <Link className='text-green-500' href="/api/auth/signout">(Sign Out?)</Link>
        </div>
    </div>
  );
}