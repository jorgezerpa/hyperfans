"use client"
import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

function Navbar() {

  return (
    <nav
        className='flex justify-between items-center h-[80px] px-8 bg-gray-900 shadow-sm text-gray-100 absolute top-0 left-0 right-0'
    >
        <div className=''>
            <h1 className='text-2xl font-bold'>Hyper fans</h1>
        </div>
        <div className='flex-1 px-3 flex gap-3 justify-center items-center'>
            {/* <div>
                <Link href="/">Initial</Link>
            </div>
            <div>
                <Link href="/dashboard">Dashboard</Link>
            </div> */}
        </div>
        
        <div className='bg-purple-700 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-purple-600' onClick={async()=>await signOut({ callbackUrl:"/" })}>
            Connect Wallet
        </div>
    </nav>
  )
}

export {Navbar}