"use client"
import React from 'react'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react' 

function Navbar() {
    const { data: session, status } = useSession()

  return (
    <nav
        className='flex justify-between items-center py-4 px-8 bg-white shadow-sm text-gray-900'
    >
        <div className=''>
            <h1>Stream App</h1>
        </div>
        <div className='flex-1 px-3 flex gap-3 justify-center items-center'>
            <div>
                <Link href="/">Initial</Link>
            </div>
            <div>
                <Link href="/dashboard">Dashboard</Link>
            </div>
        </div>
        
        <div onClick={async()=>await signOut({ callbackUrl:"/" })}>
            Connect Wallet
        </div>
    </nav>
  )
}

export {Navbar}