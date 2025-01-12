"use client"
import React from 'react'
import { useSession } from "next-auth/react"

export function Providers({children}: {children: React.ReactNode}) {

  const { status } = useSession()


  return (
    <div>
      {
        status !== "loading" && children
      }
    </div>
  )
}