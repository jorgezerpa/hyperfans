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
                birthday: formData.get('birthday'),
                password: formData.get('password'),
                addresses: [formData.get('address')]
            }


            if(!formData.get('name') || !formData.get('email') || !formData.get('password') || !formData.get('address')) {
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


  return (
    <div className='bg-black min-h-screen flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex justify-center'>
            <div className='flex flex-col gap-4'>
                <input placeholder='Name' name={"name"} type="text" className="text-white text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]" />
                <input placeholder='Email' name={"email"} type="email" className="text-white text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]" />
                <input placeholder='age' name={"birthday"} className="text-white text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]" />
                <input placeholder='password' name={"password"} type="password" className="text-white text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]" />
                <input placeholder='address' name={"address"} className="text-white text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]" />
                
                <button className="text-white mt-5 text-center text-3xl px-10 py-5 rounded-full border cursor-pointer border-white inline-block bg-black w-[250px]">Register</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterPage