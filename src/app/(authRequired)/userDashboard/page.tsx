'use client'
import { useState, useEffect } from "react"
import { signOut, useSession } from 'next-auth/react'

import { useAccount, useConnect, useDisconnect, useConnectors } from 'wagmi'
import { useWriteContract } from 'wagmi'

import { erc20Abi } from "viem"
import { WALLET_TO_PAY, USDC_CONTRACT } from "@/constants/web3"
import axios from "axios"

import { ViewStreamsButton } from "@/components/ViewStreamButton"


export default function Home() {
  const { data } = useSession()
  const { writeContractAsync } = useWriteContract()
  
  const [isPaid, setIsPaid] = useState(false)
  const [loading, setLoading] = useState(true)

  const [page] = useState(1)

  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect()
  const connectors = useConnectors()
  

  const handleConnect = () => {
    connect({
        connector: connectors.find(con => con.id === "injected") || connectors[0]
    })
  }

  const handleDisconnect = () => {
      disconnect()
  }

  function shortenString(str: string): string {
    if (str.length <= 6) {
      return str; // If string is 6 characters or less, return it as is
    }
  
    return `${str.substring(0, 5)}...${str.substring(str.length - 5)}`;
  }

  async function pay () {
    try {
      setLoading(true)
      // fetch this from DB
      const priceResponse = await axios.post("/api/payments/getPrice")
      let price = await priceResponse.data
      price = price.price
  
      const transactionHash = await writeContractAsync({
        address: USDC_CONTRACT,
        abi:erc20Abi,
        functionName: 'transfer',
        args: [WALLET_TO_PAY, BigInt(price)],
      })
  
      // set on db as Payed early access
      await axios.put("/api/payments/setPaid", { email:data?.user.email, transactionHash  }) 
      setLoading(false)
      setIsPaid(true)
    } catch (error) {
      setLoading(false)
      console.log("Error on payment ->", error)
      alert("something went wrong making your payment. Please verify that the transaction was not performed and try again. If it was, contact with the admins inmediatly.")
    }
  }

  useEffect(()=>{
    (async()=>{
      try {
        setLoading(true)
        const isPaid = await axios.post("/api/payments/isPaid", {email:data?.user.email}) 
        setIsPaid(isPaid.data.user.earlyAccessPaid)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log("error on user streams", error)
        alert("something went wrong, please refresh the page")
      }
    })()
  }, [])


  return (
    <>
      {
        page === 1 &&
          <div className="bg-black min-h-screen">
            <div className="flex justify-between items-center h-12 px-10">
              <div className="text-white font-bold text-xl cursor-pointer pt-2">
                    <div onClick={address?handleDisconnect:handleConnect}>
                      {address?"disconnect wallet":"connect wallet"}
                    </div>
                    <div onClick={address?handleDisconnect:handleConnect}>
                      {shortenString(address?address:"")}
                    </div>
              </div>
              <div onClick={async()=>await signOut({ callbackUrl:"/" })} className="text-white font-bold text-xl cursor-pointer">Logout</div>
            </div>
            <h1 className="text-white text-center pt-20 font-bold text-3xl sm:text-4xl pb-10">Hyperfans</h1>
            <div className="flex flex-col justify-center items-center min-h-[600px]">
              {
                loading && 
                  <div className="flex justify-center items-center text-2xl text-white">
                    Loading...
                  </div>
              }
              {
                (!isPaid && !loading) &&
                  <div className="mb-10 flex justify-center flex-col items-center">
                    <div className="text-white text-2xl text-center mb-2">To see the streams:</div>
                    <div className="text-white text-xl">1. Connect your wallet</div>
                    <div onClick={address?handleDisconnect:handleConnect} className='bg-gray-200 my-3 text-black py-1 px-2 sm:py-2 sm:px-4 text-xl sm:text-base rounded-md cursor-pointer hover:bg-gray-300'>
                        {address?"Disconnect":"Connect"}
                    </div>
                    {
                      address &&
                        <div className="text-white text-center">
                          {shortenString(address)}
                        </div>
                    }
                    <div className="text-white text-xl">2. Pay for early access</div>
                    <div onClick={pay} className='bg-gray-200 my-3 text-black py-1 px-2 sm:py-2 sm:px-4 text-xl sm:text-base rounded-md cursor-pointer hover:bg-gray-300'>
                        pay
                    </div>
                  </div>
              }

              {
                !loading && <ViewStreamsButton />
              }

            </div>
          </div>
      }
    </>
  )
}