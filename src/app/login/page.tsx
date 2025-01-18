"use client"
import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

function LoginPage() {

    const router = useRouter()
    const { data:session } = useSession()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)
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
            setLoading(false)
            if(res?.error) console.log("login error", res.error)
        } catch (error) {
            setLoading(false)
            console.log("Error en login page ->", error)
        }
    }

    useEffect(()=>{
        if(session && session.user) {
            router.push(session.user.role==="admin" ? 'dashboard' : '/userDashboard')
        }
    }, [session])


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
                    <div className='flex flex-col gap-5'>
                        <input placeholder='email' name={"email"} type="email" className="text-white text-center text-2xl px-10 py-3 rounded-full border  border-white inline-block bg-black w-[250px]" />
                        <input placeholder='password' name={"password"} type="password" className="text-white text-center text-2xl px-10 py-3 rounded-full border  border-white inline-block bg-black w-[250px]" />
                        <button className="min-w-[240px] text-center mb-8 text-white text-2xl py-3 rounded-full border cursor-pointer border-white inline-block bg-[#3BB4DA] hover:scale-[96%] transition-all hover:border-white hover:border-[3px] origin-center">login</button>
                    </div>
                </form>
        }
    </div>
  )
}

export default LoginPage