'use client'
import { useEffect, useState } from "react"
import axios from "axios"

export default function Streams() {

  const [calls, setCalls] = useState<any[]>([])
  const [newCallId, setNewCallId] = useState("")

  async function createStream(data: { stream_id: string }){
    try {
      const payload = {
          callId: data.stream_id,
          state: "active"
      }
      await axios.post("/api/stream/call/create_call", payload)

      const sortedCalls = await getCalls()

      setCalls(sortedCalls)
      setNewCallId("")

      console.log("done")
    } catch (error) {
      console.log("error creating call from dashboard->streams", error)
    }
  } 

  async function updateStreamState(id: string, state: "active"|"finished"){
    try {
      await axios.put("/api/stream/call/update_call", {id,state})

      const sortedCalls = await getCalls()

      setCalls(sortedCalls)

      console.log("done")
    } catch (error) {
      console.log("error creating call from dashboard->streams", error)
    }
  } 

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
    <div className="px-5">
      <div className="h-5"></div>
      <h1 className="text-2xl font-bold mb-5">Streams</h1>
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          createStream({ stream_id: formData.get('stream-id') as string })
        }} 
        className="flex flex-col gap-4 items-center sm:items-start">
        <h4 className="text-lg font-bold mr-2">New stream:</h4>
        <p>Create a new stream on the <a href="https://dashboard.getstream.io/app/1358593/video/overview" target="_blank" className="text-blue-600">Stream.io</a> dashboard an paste the Livestream ID down here to share with all users</p>
        <div className="flex  items-center">
          <input name={"stream-id"} value={newCallId} onChange={(e)=>setNewCallId(e.target.value)} type="text" placeholder="id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5" />
          <button className="px-4 py-2 text-white bg-purple-700 rounded-lg ml-2 hover:bg-purple-800 cursor-pointer">Share</button>
        </div>
      </form>

      <div className="h-10"></div>

      <div>
        <h4 className="mt-5 text-lg font-bold mb-2">Previous streams</h4>
        <div>
          {
            calls.map((call, index) => {
              return (
                <div key={"listofcallsformadmindashboard"+index} className="mb-8">
                  <p><span className="font-bold">Call_id:</span> { call.callId }</p>
                  <p><span className="font-bold">state:</span> <span className={`${call.state==="finished"?"text-green-600":"text-orange-500"} font-bold`}>{ call.state }</span></p>
                  {
                    call.state === "active" &&
                    <button type="button" onClick={()=>updateStreamState(call.id, "finished")} className="mt-1 px-2 py-1 text-white bg-purple-700 rounded-md hover:bg-purple-800 cursor-pointer">set to finished</button>
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