"use client"
import React from 'react'
import type {ReactNode} from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { IoRadioSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

function Sidebar({ isAdmin }:{ isAdmin?:boolean }) {

  return (
    <>
        {
            !isAdmin && (
                <div
                    className='h-full w-[200px] flex flex-col justify-start items-start bg-white shadow-lg text-gray-900'
                >
                    <div className='w-full flex-1'>
                        <MenuItem
                            title='Stream'
                            link='/userDashboard/streams'
                            icon={()=><FaMoneyCheck size={20} />}
                        />
                        <MenuItem
                            title='Billing'
                            link='/userDashboard/billing'
                            icon={()=><FaUser size={20} />}
                        />
                        <MenuItem
                            title='Profile'
                            link='/userDashboard/profile'
                            icon={()=><IoRadioSharp size={20} />}
                        />
                    </div>
                
                    <div className='py-4 px-2 text-right w-full' onClick={async()=>await signOut({ callbackUrl:"/" })}>
                        <MenuItem
                            disable
                            title='Sign Out'
                            link='/dashboard/billing'
                            icon={()=><FaSignOutAlt size={20} />}
                        />
                    </div>
                </div>
            )
        }
        {
            isAdmin && (
                <div
                    className='h-full w-[200px] flex flex-col justify-start items-start bg-white shadow-lg text-gray-900'
                >
                    <div className='w-full flex-1'>
                        <MenuItem
                            title='Stream'
                            link='/dashboard/streams'
                            icon={()=><IoRadioSharp size={20} />}
                        />
                        <MenuItem
                            title='Users'
                            link='/dashboard/users'
                            icon={()=><FaUser size={20} />}
                        />
                        <MenuItem
                            title='Billing'
                            link='/dashboard/billing'
                            icon={()=><FaMoneyCheck size={20} />}
                        />
                    </div>
                
                    <div className='py-4 px-2 text-right w-full' onClick={async()=>await signOut({ callbackUrl:"/" })}>
                        <MenuItem
                            disable
                            title='Sign Out'
                            link='/dashboard/billing'
                            icon={()=><FaSignOutAlt size={20} />}
                        />
                    </div>
                </div>
            )
        }
    </>
  )
}

const MenuItem = ({title, link, icon, disable}: { title:string, link:string, icon: () => ReactNode, disable?:boolean }) => {
    return (
        <div className='w-full py-4 px-2 text-lg'>
            {
                !disable &&
                <Link  href={link} className='flex justify-start items-center gap-1'>
                    { icon() }
                    <p>{title}</p>
                </Link>
            }
            {
                disable &&
                <div className='flex justify-start items-center gap-1 cursor-pointer'>
                    { icon() }
                    <p>{title}</p>
                </div>
            }
        </div>
    )
}

export {Sidebar}