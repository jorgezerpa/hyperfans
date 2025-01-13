import { http, createConfig } from 'wagmi'
import { base, mainnet, sepolia, optimism, arbitrum } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [
    mainnet, 
    // base, 
    sepolia, 
    // optimism, arbitrum
],
  connectors: [
    injected(),
    // walletConnect({ projectId }),
    // metaMask(),
    // safe(),
  ],
  transports: {
    [mainnet.id]: http("https://mainnet.infura.io/v3/b26a78bcb38b4957a68b3cdc645c2547"),
    // [base.id]: http("https://mainnet.infura.io/v3/b26a78bcb38b4957a68b3cdc645c2547"),
    [sepolia.id]: http("https://sepolia.infura.io/v3/b26a78bcb38b4957a68b3cdc645c2547"),
    // [optimism.id]: http(),
    // [arbitrum.id]: http(),
  },
  
})