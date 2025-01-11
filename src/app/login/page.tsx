"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function LoginPage() {

    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const payload = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            }
            
            const res = await signIn('credentials', {
                username: payload.email as string,
                password: payload.password as string,
                callbackUrl: '/userDashboard',
                redirect: false
            })
    
            if(res?.error) console.log("login error", res.error)
            else router.push('/userDashboard')
        } catch (error) {
            console.log("Error en login page ->", error)
        }

    }


  return (
    <div>
        <form onSubmit={handleSubmit} className='flex justify-center mt-64'>
            <div className='flex flex-col w-4/5 lg:w-1/4'>
                <label htmlFor="email">Email</label>
                <input name={"email"} type="email" className='border border-gray-800' />
                <label htmlFor="password">Password</label>
                <input name={"password"} type="password" className='border border-gray-800' />
                <button>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default LoginPage