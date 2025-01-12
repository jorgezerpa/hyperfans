"use client"
import React from 'react'
import { useSession  } from "next-auth/react"

export function Providers({children}: {children: React.ReactNode}) {

  const { data: session } = useSession()

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