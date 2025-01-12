"use client"
import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

function Sidebar({ isAdmin }:{ isAdmin?:boolean }) {

  return (
    <>
        {
            !isAdmin && (
                <div
                    className='h-full flex flex-col justify-start items-start py-4 px-4 bg-white shadow-md text-gray-900'
                >
                    <div>
                        <Link href="/userDashboard/streams">Streams</Link>
                    </div>
                    <div>
                        <Link href="/userDashboard/billing">Billing</Link>
                    </div>
                    <div>
                        <Link href="/userDashboard/profile">Profile</Link>
                    </div>
                
                    <div onClick={async()=>await signOut({ callbackUrl:"/" })}>
                        Sign Out
                    </div>
                </div>
            )
        }
        {
            isAdmin && (
                <div
                    className='h-full flex flex-col justify-start items-start py-4 px-4 bg-white shadow-md text-gray-900'
                >
                    <div>
                        <Link href="/dashboard/streams">Streams</Link>
                    </div>
                    <div>
                        <Link href="/dashboard/users">Users</Link>
                    </div>
                    <div>
                        <Link href="/dashboard/billing">Billing</Link>
                    </div>

                
                    <div onClick={async()=>await signOut({ callbackUrl:"/" })}>
                        Sign Out
                    </div>
                </div>
            )
        }
    </>
  )
}

export {Sidebar}