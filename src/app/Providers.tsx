"use client"
// providers for NextAuth, Stream.io theme and Metamask SDK
import React from 'react'
import { SessionProvider } from 'next-auth/react' 
import { StreamTheme } from '@stream-io/video-react-sdk'
import { WagmiProvider } from 'wagmi'
import { config as wagmiConfig} from '@/config/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import "@stream-io/video-react-sdk/dist/css/styles.css";

const queryClient = new QueryClient()

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <StreamTheme 
            // style={{ fontFamily: 'sans-serif', color: 'white' }}
            >
              {children}
            </StreamTheme>
          </SessionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}