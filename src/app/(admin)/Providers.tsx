"use client"
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function Providers({children}: {children: React.ReactNode}) {

  const router = useRouter()
  const { data: session, status } = useSession()

  console.log("aca ->",session?.user?.role)

  // this is taking me out on every refresh, why?????
  // useEffect(()=>{
  //   // if is auth
  //   if(status==="authenticated"){}
  //   if(status==="unauthenticated"){
  //     router.push("/")
  //   }
  // }, [session])

  if (session?.user?.role !== "admin") {
    return <p>You are not authorized to view this page!</p>;
  }
   
  return (
    <div>
      {
        children
      }
    </div>
  )
}