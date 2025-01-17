'use client'
import { useState } from "react"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const [page, setPage] = useState(1)

  return (
    <>
      {
        page === 1 &&
          <div className="bg-black min-h-screen">
            <h1 className="text-white text-center pt-20 font-bold text-3xl sm:text-4xl pb-10">Hyperfans</h1>
            <div className="flex flex-col justify-center items-center min-h-[600px]">
              <div onClick={()=>setPage(2)} className="text-white text-3xl px-10 py-5 rounded-full border cursor-pointer border-white inline-block">
                enter
              </div>
              <div className="text-white text-2xl sm:text-3xl px-10 py-5 rounded-full inline-block mt-10">
                Early Access*
              </div>
            </div>
          </div>
      }
      {
        page === 2 &&
          <div className="bg-black min-h-screen">
            <h1 className="text-white text-center pt-20 font-bold text-3xl sm:text-4xl pb-10">Hyperfans</h1>
            <div className="flex flex-col justify-center items-center min-h-[600px] px-4">
              <div onClick={() => setPage(1)} className="text-white cursor-pointer text-center text-xl px-10 py-5 rounded-full inline-block">
                Back 
              </div>
              <div onClick={() => router.push("/signup")} className="text-white cursor-pointer text-center text-3xl px-10 py-5 rounded-full border border-white inline-block">
                Create Account 
              </div>
              <div onClick={() => router.push("/login")} className="text-white cursor-pointer text-3xl px-10 py-5 rounded-full border border-white inline-block mt-10">
                Login
              </div>
            </div>
          </div>
      }
    </>
  )
}