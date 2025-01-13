'use client'
import { useReadContract } from 'wagmi'
import { useWriteContract } from 'wagmi'

const wagmiContractConfig = {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: [
    {
      type: 'function',
      name: 'balanceOf',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ type: 'uint256' }],
    },
    {
      type: 'function',
      name: 'totalSupply',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: 'supply', type: 'uint256' }],
    },
  ],
} as const

/////
export const abi = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ internalType: 'uint32', name: 'tokenId', type: 'uint32' }],
    outputs: [],
  },
] as const

export default function Billing() {
  const { data: balance } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
  })

  const { data: hash, writeContract } = useWriteContract()

  const mint = async() => {
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'mint',
      args: [2342],
    })
  }

  // console.log(hash)

  return (
    <div>
      Balance: {balance?.toString()}
      <div
        onClick={()=>{mint()}}
      >call</div>
    </div>
  )
}

