"use client"
import React, { useState } from 'react'
import { useSDK } from "@metamask/sdk-react";

function Navbar() {
    const { sdk } = useSDK();
    const [account, setAccount] = useState<string>();

    const connect = async () => {
        try {
          const accounts = await sdk?.connect();
          setAccount(accounts?.[0]);
        } catch (err) {
          console.warn("failed to connect..", err);
        }
    };

    const disconnect = async() => {
        await sdk?.disconnect()
        setAccount("")
    }

  return (
    <nav
        className='flex justify-between items-center h-[80px] px-4 sm:px-8 bg-gray-900 shadow-sm text-gray-100 absolute top-0 left-0 right-0'
    >
        <div className=''>
            <h1 className='text-lg sm:text-2xl font-bold'>Hyper fans</h1>
        </div>
        <div className='flex-1 px-3 flex gap-3 justify-center items-center'>
            {/* <div>
                <Link href="/">Initial</Link>
            </div>
            <div>
                <Link href="/dashboard">Dashboard</Link>
            </div> */}
        </div>
        
        <div onClick={account?disconnect:connect} className='bg-purple-700 text-white py-1 px-2 sm:py-2 sm:px-4 text-sm sm:text-base rounded-md cursor-pointer hover:bg-purple-600'>
            {account?"disconnect":"connect"} Wallet
        </div>
    </nav>
  )
}

export {Navbar}