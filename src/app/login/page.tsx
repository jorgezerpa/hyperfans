"use client"
import React, { useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

function LoginPage() {

    const router = useRouter()
    const { data:session } = useSession()

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
        } catch (error) {
            console.log("Error en login page ->", error)
        }
    }

    useEffect(()=>{
        if(session && session.user) {
            router.push(session.user.role==="admin" ? 'dashboard' : '/userDashboard')
        }
    }, [session])


  return (
    // <div className='bg-black min-h-screen flex flex-col justify-center items-center'>
    //     <form onSubmit={handleSubmit} className='flex justify-center'>
    //         <div className='flex flex-col gap-4'>
    //             <input placeholder='Name' name={"name"} type="text" className="text-white text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]" />
    //             <input placeholder='Email' name={"email"} type="email" className="text-white text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]" />
    //             <input placeholder='age' name={"birthday"} className="text-white text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]" />
    //             <input placeholder='password' name={"password"} type="password" className="text-white text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]" />
    //             <input placeholder='address' name={"address"} className="text-white text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]" />
                
    //             <button className="text-white mt-5 text-center text-3xl px-10 py-5 rounded-full border cursor-pointer border-white inline-block bg-black w-[250px]">Register</button>
    //         </div>
    //     </form>
    // </div>

    <div className='bg-black min-h-screen flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex justify-center'>
            <div className='flex flex-col gap-5'>
                <input placeholder='email' name={"email"} type="email" className="text-white text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]" />
                <input placeholder='password' name={"password"} type="password" className="text-white text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]" />
                <button className="text-white mt-5 text-center text-3xl px-10 py-5 rounded-full border  border-white inline-block bg-black w-[250px]">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default LoginPage