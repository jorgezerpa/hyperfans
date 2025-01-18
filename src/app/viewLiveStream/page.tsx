"use client"
import React, { useEffect, useState } from "react";
import {
  LivestreamPlayer,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string; //never change 

export default function App() {
  const params = useSearchParams()

  const [, setToken] = useState("")
  const [user, setUser] = useState<null|User>(null)
  const [client, setClient] = useState<null|StreamVideoClient>(null)

  useEffect(()=>{
    (async()=>{
      const token = await tokenProvider()
      setToken(token)
      const new_user: User = { type: "anonymous" };
      const new_client = new StreamVideoClient({ apiKey, user:new_user, token });
      setUser(new_user)
      setClient(new_client)
    })()
  },[])

  const tokenProvider = async () => {
    try {
      const response = await axios.put("/api/stream/token");
      const data = await response.data;
      return data.token;
    } catch (error) {
      console.log(error)
      alert("something went wrong, please refresh the page")
    }
  };

  const callId = params.get("livestream-id") as string


  return (
    <div>
      <div className="bg-black h-screen">
        <h1 className="text-white text-center text-5xl sm:text-8xl italic font-extralight pt-20"><span>Hyper</span><span className="text-[#75C9E1]">Fans</span></h1>

        {
          (user && client) &&
            <StreamVideo client={client} >
              <div className="flex justify-center pt-10">
                <div className="w-[95%] md:w-[600px] min-h-[200px] bg-gray-300 rounded-xl overflow-hidden text-white">
                  <LivestreamPlayer callType="livestream" callId={callId} layoutProps={{  }} />
                </div>
              </div>
            </StreamVideo>
        } 
        <div className="flex justify-center pt-4">
          <div className="w-[95%] md:w-[600px]">
            {/* <h3 className="text-white text-2xl">Livestream</h3> */}
          </div>
          
        </div>
      </div>
    </div>
  );
}

