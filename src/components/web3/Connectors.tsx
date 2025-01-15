"use client"
import * as React from 'react'
import { Connector, useConnect } from 'wagmi'

export function ConnectToMetamask() {
  const { connectors, connect } = useConnect()

  return connectors
    .filter(conn => conn.id === "injected")
    .map((connector) => (
    <button key={connector.uid} 
      onClick={() => {
        console.log("click")
        connect({ connector })
      }}
      type='button' className="mt-5 px-4 py-2 text-black bg-gray-100 rounded-lg hover:bg-gray-300 cursor-pointer my-2 ">
        Connect Wallet
    </button>
    // <button key={connector.uid} onClick={() => connect({ connector })}>
    //     {connector.name}
    // </button>
  ))
}