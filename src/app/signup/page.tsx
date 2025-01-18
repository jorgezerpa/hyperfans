"use client"
import React, {useState} from 'react'
import { signIn } from 'next-auth/react'
import axios from 'axios'

function RegisterPage() {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)
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
            
            await axios.post("/api/register", { ...payload })

            await signIn("credentials", {
                username: payload.email as string,
                password: payload.password as string,
                callbackUrl: '/userDashboard',
                redirect: true
            })
            setLoading(false) 
        } catch (error:any) {
            setLoading(false)
            console.log("Error on sign up process -> ", error)
            if(error?.status==401) {
                alert("This email is already registered")
                return 
            } 
            alert("Something went wrong")
        }
    }


  return (
    <div className='bg-black min-h-screen flex flex-col justify-center items-center'>
        {
            loading && 
            <div className="flex justify-center items-center text-2xl text-white">
                    Loading...
            </div>
        }
        {
            !loading &&
                <form onSubmit={handleSubmit} className='flex justify-center'>
                    <div className='flex flex-col gap-4'>
                        <input placeholder='Name' name={"name"} type="text" className="text-white text-center text-2xl px-10 py-3 rounded-full border  border-white inline-block bg-black w-[250px]" />
                        <input placeholder='Email' name={"email"} type="email" className="text-white text-center text-2xl px-10 py-3 rounded-full border  border-white inline-block bg-black w-[250px]" />
                        <input placeholder='age' name={"birthday"} type='number' className="text-white text-center text-2xl px-10 py-3 rounded-full border  border-white inline-block bg-black w-[250px]" />
                        <input placeholder='password' name={"password"} type="password" className="text-white text-center text-2xl px-10 py-3 rounded-full border  border-white inline-block bg-black w-[250px]" />
                        <input placeholder='address' name={"address"} className="text-white text-center text-2xl px-10 py-3 rounded-full border  border-white inline-block bg-black w-[250px]" />
                        
                        <button className="text-center mb-8 text-white text-2xl py-3 rounded-full border cursor-pointer border-white inline-block bg-[#3BB4DA] hover:scale-[96%] transition-all hover:border-white hover:border-[3px] origin-center">Register</button>
                    </div>
                </form>
        }
    </div>
  )
}

export default RegisterPage