'use client'
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Streams() {
    const router = useRouter()

    const [calls, setCalls] = useState<any>([])

    useEffect(()=>{
        (async()=>{
            const response = await axios.get("/api/stream/call/get_calls")
            const responseCalls = response.data.calls?.reverse()
            setCalls(responseCalls)
        })()
    },[])

    return (
        <>
            <h1 className="text-center pt-7 pb-7 font-bold text-2xl">Streams</h1>

            <div className="flex justify-center items-center py-24">
                <div onClick={()=>router.push(`/ViewLiveStream?livestream-id=${calls[0]?.callId}`)} className="cursor-pointer text-center text-lg font-bold text-white px-4 py-2 bg-purple-700 rounded-sm">
                    Join Stream { calls[0]?.callId }
                </div>
            </div>

        </>
    )
}