import { http, createConfig } from 'wagmi'
import { 
  arbitrum
  // mainnet, sepolia, base, optimism, arbitrum
 } from 'wagmi/chains'
import { injected, 
    // metaMask, safe, walletConnect 
} from 'wagmi/connectors'

// const projectId = '<WALLETCONNECT_PROJECT_ID>'

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
    // [localhost.id]: http("http://127.0.0.1:8545/"),
    // [mainnet.id]: http("https://mainnet.infura.io/v3/b26a78bcb38b4957a68b3cdc645c2547"),
    // [base.id]: http("https://mainnet.infura.io/v3/b26a78bcb38b4957a68b3cdc645c2547"),
    // [sepolia.id]: http("https://sepolia.infura.io/v3/b26a78bcb38b4957a68b3cdc645c2547"),
    // [optimism.id]: http(),
    [arbitrum.id]: http("https://arbitrum-sepolia.infura.io/v3/b26a78bcb38b4957a68b3cdc645c2547"),
  },
  
})