"use client"
import React, { useEffect, useState } from 'react'
import type {ReactNode} from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { IoRadioSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { RiCloseLargeLine } from "react-icons/ri";

function Sidebar({ isAdmin }:{ isAdmin?:boolean }) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(()=>{
        const resizeHandler = () => {
            setWindowWidth(window.innerWidth)
        } 
        window.addEventListener("resize", resizeHandler)
    }, [])

  return (
    <div className={`${(windowWidth<800&&showMenu)&&"fixed top-5 left-5 bottom-5 right-5"} ${windowWidth>800&&"h-full"}`}>
        {
            !isAdmin && (
                <div
                    className={`${windowWidth<800&&!showMenu?"hidden":""} ${windowWidth<800?"w-full":"w-[200px]"} h-full flex flex-col justify-start items-start bg-white shadow-lg text-gray-900`}
                >
                    <div className='w-full flex-1'>
                        <MenuItem
                            title='Streams'
                            link='/userDashboard/streams'
                            icon={()=><IoRadioSharp size={20} />}
                            closeMenu={()=>{setShowMenu(false)}}
                        />
                        <MenuItem
                            title='Billing'
                            link='/userDashboard/billing'
                            icon={()=><FaMoneyCheck size={20} />}
                            closeMenu={()=>{setShowMenu(false)}}
                        />
                        <MenuItem
                            title='Profile'
                            link='/userDashboard/profile'
                            closeMenu={()=>{setShowMenu(false)}}
                            icon={()=><FaUser size={20} />}
                        />
                    </div>
                
                    <div className='py-4 px-2 text-right w-full' onClick={async()=>await signOut({ callbackUrl:"/" })}>
                        <MenuItem
                            disable
                            title='Sign Out'
                            link='/dashboard/billing'
                            closeMenu={()=>{setShowMenu(false)}}
                            icon={()=><FaSignOutAlt size={20} />}
                        />
                    </div>
                </div>
            )
        }
        {
            isAdmin && (
                <div
                    className={`${windowWidth<800&&!showMenu?"hidden":""} ${windowWidth<800?"w-full":"w-[200px]"} h-full flex flex-col justify-start items-start bg-white shadow-lg text-gray-900`}                >
                    <div className='w-full flex-1'>
                        <MenuItem
                            title='Stream'
                            link='/dashboard/streams'
                            icon={()=><IoRadioSharp size={20} />}
                            closeMenu={()=>{setShowMenu(false)}}
                        />
                        <MenuItem
                            title='Users'
                            link='/dashboard/users'
                            icon={()=><FaUser size={20} />}
                            closeMenu={()=>{setShowMenu(false)}}
                        />
                        <MenuItem
                            title='Billing'
                            link='/dashboard/billing'
                            icon={()=><FaMoneyCheck size={20} />}
                            closeMenu={()=>{setShowMenu(false)}}
                        />
                    </div>
                
                    <div className='py-4 px-2 text-right w-full' onClick={async()=>await signOut({ callbackUrl:"/" })}>
                        <MenuItem
                            disable
                            title='Sign Out'
                            link='/dashboard/billing'
                            icon={()=><FaSignOutAlt size={20} />}
                            closeMenu={()=>{setShowMenu(false)}}
                        />
                    </div>
                </div>
            )
        }
    <div className={`flex justify-center items-center fixed bottom-10 right-5 w-12 h-12 bg-purple-500 rounded-full ${windowWidth>800&&"hidden"}`} onClick={()=>setShowMenu(!showMenu)}>
        { !showMenu && <TiThMenu size={30} color='white' /> }
        { showMenu && <RiCloseLargeLine size={30} color='white' /> }
    </div>
    </div>
  )
}

const MenuItem = ({title, link, icon, disable, closeMenu}: { title:string, link:string, icon: () => ReactNode, disable?:boolean, closeMenu?:()=>void }) => {
    return (
        <div onClick={()=>closeMenu&&closeMenu()} className='w-full py-4 px-2 text-lg'>
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