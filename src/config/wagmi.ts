import { http, createConfig } from 'wagmi'
import { base, mainnet, sepolia, optimism, arbitrum } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base, sepolia, optimism, arbitrum],
  connectors: [
    injected(),
    // walletConnect({ projectId }),
    // metaMask(),
    // safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
})