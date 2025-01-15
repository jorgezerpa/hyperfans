'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from 'next-auth/react'


export default function Home() {
  const router = useRouter()

  const [page, setPage] = useState(1)

  return (
    <>
      {
        page === 1 &&
          <div className="bg-black min-h-screen">
            <div className="flex justify-end items-center h-12 px-10" onClick={async()=>await signOut({ callbackUrl:"/" })}>
              <div className="text-white font-bold text-xl cursor-pointer">Logout</div>
            </div>
            <h1 className="text-white text-center pt-20 font-bold text-3xl sm:text-4xl pb-10">Hyper Fans</h1>
            <div className="flex flex-col justify-center items-center min-h-[600px]">
              <div onClick={()=>setPage(2)} className="text-white text-3xl px-10 py-5 rounded-full border cursor-pointer border-white inline-block">
                Join Stream
              </div>
            </div>
          </div>
      }
    </>
  )
}