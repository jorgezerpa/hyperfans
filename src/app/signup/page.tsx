"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSDK } from "@metamask/sdk-react";

function RegisterPage() {

    const { sdk
        // connected, connecting, provider, chainId
     } = useSDK();
    const [account, setAccount] = useState<string>();

    const connect = async () => {
        try {
          const accounts = await sdk?.connect();
          setAccount(accounts?.[0]);
        } catch (err) {
          console.warn("failed to connect..", err);
        }
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const payload = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                addresses: [account]
            }

            if(!formData.get('name') || !formData.get('email') || !formData.get('password') || !account) {
                return 
            }
            
            await fetch("/api/register", { body: JSON.stringify(payload), method: "POST", headers: { "Content-Type": "application/json" }})

            await signIn("credentials", {
                username: payload.email as string,
                password: payload.password as string,
                callbackUrl: '/userDashboard',
                redirect: true
            })
            
            // make an autologin logic or redirect to login page 
        } catch (error) {
            console.log("Error on sign up process -> ", error)
        }
    }

    const disconnect = async() => {
        await sdk?.disconnect()
        setAccount("")
    }


  return (
    <div>
        <form onSubmit={handleSubmit} className='flex justify-center mt-64'>
            <div className='flex flex-col w-4/5 lg:w-1/4'>
                <h1 className='text-center text-2xl font-bold mb-3'>Register</h1>
                <label className='font-bold' htmlFor="name">Name</label>
                <input name={"name"} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                <label className='mt-3 font-bold' htmlFor="email">Email</label>
                <input name={"email"} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                <label className='mt-3 font-bold' htmlFor="password">Password</label>
                <input name={"password"} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />

                <button type='button' onClick={account?disconnect:connect} className="mt-5 px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-purple-800 cursor-pointer my-2 ">{ account ? "connencted" : "Connect wallet" }</button>
                
                <p className='text-center'>
                    {account && `${account}`}
                </p>
                
                <button disabled={!account} onClick={account?connect:()=>{}} className={`mt-5 px-4 py-2 text-white bg-purple-700 rounded-lg hover:bg-purple-800 ${!account&&"opacity-65"} ${account&&"cursor-pointer"}`}>Register</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterPage