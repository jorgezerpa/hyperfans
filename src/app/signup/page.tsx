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
                <label htmlFor="name">Name</label>
                <input name={"name"} type="text" className='border border-gray-800' />
                <label htmlFor="email">Email</label>
                <input name={"email"} type="email" className='border border-gray-800' />
                <label htmlFor="password">Password</label>
                <input name={"password"} type="password" className='border border-gray-800' />
                {/* <label htmlFor="address">Address</label>
                <input name={"address"} type="text" className='border border-gray-800' /> */}
                <button>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterPage