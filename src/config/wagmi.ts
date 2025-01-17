import { http, createConfig } from 'wagmi'
import { 
  arbitrum
 } from 'wagmi/chains'
import { injected} from 'wagmi/connectors'
import {RPC_ENDPOINT} from "@/constants/web3"

export const config = createConfig({
  chains: [
   arbitrum 
],
  connectors: [
    injected(),
    // walletConnect({ projectId }),
    // metaMask(),
    // safe(),
  ],
  transports: {
    [arbitrum.id]: http(RPC_ENDPOINT),
  },
  
})