'use client'
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Streams() {
    const router = useRouter()

    const [calls, setCalls] = useState<any[]>([])



    async function getCalls() {
        const calls = await axios.put("/api/stream/call/get_calls")

        const sortedCalls = calls?.data?.calls?.sort((a:any, b:any) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
    
        // Reverse the comparison for descending order
        if (dateA < dateB) {
            return 1; // b comes before a
        } else if (dateA > dateB) {
            return -1; // a comes before b
        } else {
            return 0; // a and b have the same createdAt
        }
        }) || [];
        return sortedCalls
    }

    useEffect(()=>{
        (async()=>{
            const sortedCalls = await getCalls()
            setCalls(sortedCalls)
        })()
    },[])

    return (
        <>
            <h1 className="text-center pt-7 pb-7 font-bold text-2xl">Streams</h1>

            <div className="flex justify-center items-center py-24">
                <div onClick={()=>router.push(`/viewLiveStream?livestream-id=${calls[0]?.callId}`)} className="cursor-pointer text-center text-lg font-bold text-white px-4 py-2 bg-purple-700 rounded-sm">
                    Join Stream { calls[0]?.callId }
                </div>
            </div>

            <div>
                <h4 className="mt-5 text-lg text-center font-bold mb-2">Previous streams</h4>
                <div className="px-20">
                {
                    calls.map((call, index) => {
                    return (
                        <div key={"listofcallsforclientdashboardstreamsroute"+index} className="mb-4">
                        <p>Call_id: { call.callId }</p>
                        <p>state: { call.state }</p>
                        {
                            (index === 0) &&
                            <button className="cursor-pointer" type="button" onClick={()=>router.push(`/viewLiveStream?livestream-id=${calls[0]?.callId}`)}>Join Stream</button>
                        }
                        </div>
                    )
                    })
                }
                </div>
            </div>

        </>
    )
}