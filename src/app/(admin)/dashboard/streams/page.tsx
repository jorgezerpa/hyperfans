'use client'
import { useEffect, useState } from "react"
import axios from "axios"

export default function Streams() {

  const [calls, setCalls] = useState<any[]>([])

  async function createStream(data: { stream_id: string }){
    try {
      const payload = {
          callId: data.stream_id,
          state: "active"
      }
      await axios.post("/api/stream/call/create_call", payload)

      const sortedCalls = await getCalls()

      setCalls(sortedCalls)

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
    const calls = await axios.get("/api/stream/call/get_calls")

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
    <div className="flex items-center flex-col py-5">
      <h1 className="text-2xl font-bold mb-5">Streams</h1>
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          createStream({ stream_id: formData.get('stream-id') as string })
        }} 
        className="flex flex-col items-center gap-3">
        <h4 className="text-lg font-bold mb-2">Share New Stream</h4>
        <p>Stream Id:</p>
        <input name={"stream-id"} type="text" placeholder="id" className="border" />
        <button>Share</button>
      </form>

      <div>
        <h4 className="mt-5 text-lg text-center font-bold mb-2">Previous streams</h4>
        <div>
          {
            calls.map((call, index) => {
              return (
                <div key={"listofcallsformadmindashboard"+index} className="mb-4">
                  <p>Call_id: { call.callId }</p>
                  <p>state: { call.state }</p>
                  <button className="cursor-pointer" type="button" onClick={()=>updateStreamState(call.id, "finished")}>set to finished</button>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  )
}