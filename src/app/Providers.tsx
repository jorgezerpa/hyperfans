"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react' 
import { StreamTheme } from '@stream-io/video-react-sdk'

import "@stream-io/video-react-sdk/dist/css/styles.css";

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider>
      <StreamTheme 
      // style={{ fontFamily: 'sans-serif', color: 'white' }}
      >
        {children}
      </StreamTheme>
    </SessionProvider>
  )
}