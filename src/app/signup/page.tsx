"use client"
import React from 'react'
import { signIn } from 'next-auth/react'

function RegisterPage() {


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const payload = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                // addresses: [formData.get('address')]
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
                {/* <label htmlFor="address">Address</label>
                <input name={"address"} type="text" className='border border-gray-800' /> */}
                <button className="mt-5 px-4 py-2 text-white bg-purple-700 rounded-lg hover:bg-purple-800 cursor-pointer">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterPage