"use client"
import React from 'react'

import axios from 'axios'

function ShareLiveStreamPage() {


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const payload = {
                call_id: formData.get('id'),
            }
            
            await axios.post("/api/stream/call/get_calls", payload)
            console.log("done")
        } catch (error) {
            console.log("Error en login page ->", error)
        }

    }


  return (
    <div>
        <form onSubmit={handleSubmit} className='flex justify-center mt-64'>
            <div className='flex flex-col w-4/5 lg:w-1/4'>
                <label htmlFor="id">Live Stream Id</label>
                <input name={"id"} type="text" className='border border-gray-800' />
                <button>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default ShareLiveStreamPage