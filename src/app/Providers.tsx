"use client"
// providers for NextAuth, Stream.io theme and Metamask SDK
import React from 'react'
import { SessionProvider } from 'next-auth/react' 
import { StreamTheme } from '@stream-io/video-react-sdk'
import { MetaMaskProvider } from "@metamask/sdk-react"

import "@stream-io/video-react-sdk/dist/css/styles.css";

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <MetaMaskProvider
      sdkOptions={{
        dappMetadata: {
          name: "Stream app",
          // url: window.location.href,
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
        // Other options.
      }}
    >
      <SessionProvider>
        <StreamTheme 
        // style={{ fontFamily: 'sans-serif', color: 'white' }}
        >
          {children}
        </StreamTheme>
      </SessionProvider>
    </MetaMaskProvider>
  )
}