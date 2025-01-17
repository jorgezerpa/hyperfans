'use client'
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export function ViewStreamsButton() {
    const router = useRouter()

    const [calls, setCalls] = useState<any[]>([])



    async function getCalls() {
        try {
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
        } catch (error) {
            alert("something went wrong, please refresh the page")
        }
    }

    useEffect(()=>{
        (async()=>{
            const sortedCalls = await getCalls()
            setCalls(sortedCalls)
        })()
    },[])

    return (
            <div>
                {
                    (calls[0]?.state === "active") &&
                    <button type="button" onClick={()=>{router.push(`/viewLiveStream?livestream-id=${calls[0]?.callId}`)}} className="text-white text-3xl px-10 py-5 rounded-full border cursor-pointer border-white inline-block">JOIN STREAM</button>
                }
                {
                    (calls[0]?.state !== "active") &&
                    <button type="button" className="text-white text-3xl px-10 py-5 rounded-full border border-white inline-block">No Actual Stream</button>
                }
            </div>            
    )
}