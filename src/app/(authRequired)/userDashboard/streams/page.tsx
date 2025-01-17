'use client'
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Streams() {
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
            console.log(error)
            alert("something went wrong, plese refresh the page")
        }
    }

    useEffect(()=>{
        (async()=>{
            const sortedCalls = await getCalls()
            setCalls(sortedCalls)
        })()
    },[])

    return (
        <div className="px-5">
            <h1 className="pt-7 pb-7 font-bold text-2xl">Streams</h1>

            {/* <div className="flex items-center py-24">
                <div onClick={()=>router.push(`/viewLiveStream?livestream-id=${calls[0]?.callId}`)} className="cursor-pointer text-center text-lg font-bold text-white px-4 py-2 bg-purple-700 rounded-sm">
                    Join Actual Stream { calls[0]?.callId }
                </div>
            </div> */}

            <div>
                {/* <h4 className="mt-5 text-lg text-center font-bold mb-2">Previous streams</h4> */}
                <div className="">
                {
                    calls.map((call, index) => {
                    return (
                        <div key={"listofcallsformadmindashboard"+index} className="mb-8">
                            <p><span className="font-bold">Call_id:</span> { call.callId }</p>
                            <p><span className="font-bold">state:</span> <span className={`${(call.state==="active" && index===0)?"text-orange-500":"text-green-600"} font-bold`}>{ (call.state==="active" && index===0) ? "Active" : "finished" }</span></p>
                            {
                                (call.state === "active" && index===0) &&
                                <button type="button" onClick={()=>{router.push(`/viewLiveStream?livestream-id=${calls[0]?.callId}`)}} className="mt-1 px-2 py-1 text-white bg-purple-700 rounded-md hover:bg-purple-800 cursor-pointer">JOIN STREAM</button>
                            }
                        </div>
                    )
                    })
                }
                </div>
            </div>

        </div>
    )
}