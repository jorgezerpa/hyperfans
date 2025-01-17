"use client"
import React from 'react'
// import { useConnect,  useConnectors } from 'wagmi'

function Navbar() {
    // const { address } = useAccount()
    // const { disconnect } = useDisconnect()
    // const { connect } = useConnect()
    // const connectors = useConnectors()

    // const handleConnect = () => {
    //     connect({
    //         connector: connectors.find(con => con.id === "injected") || connectors[0]
    //     })
    // }

    // const handleDisconnect = () => {
    //     disconnect()
    // }

    // function shortenString(str: string): string {
    //     if (str.length <= 6) {
    //       return str; // If string is 6 characters or less, return it as is
    //     }
      
    //     return `${str.substring(0, 4)}...${str.substring(str.length - 2)}`;
    // }

    return (
        <nav
            className='flex justify-between items-center h-[80px] px-4 sm:px-8 bg-gray-900 shadow-sm text-gray-100 absolute top-0 left-0 right-0'
        >
            <div className=''>
                <h1 className='text-lg sm:text-2xl font-bold'>Hyperfans</h1>
            </div>
            <div className='flex-1 px-3 flex gap-3 justify-center items-center'>
                {/* <div>
                    <Link href="/">Initial</Link>
                </div>
                <div>
                    <Link href="/dashboard">Dashboard</Link>
                </div> */}
            </div>
            
        </nav>
    )
}

export {Navbar}