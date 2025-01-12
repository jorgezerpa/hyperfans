"use client"
import React, { useEffect, useState } from "react";
import {
  LivestreamPlayer,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useSearchParams } from "next/navigation";

const apiKey = "tqag879npxda"; //never change 

export default function App() {
  const params = useSearchParams()

  const [, setToken] = useState("")
  const [user, setUser] = useState<null|User>(null)
  const [client, setClient] = useState<null|StreamVideoClient>(null)

  useEffect(()=>{
    (async()=>{
      const token = await tokenProvider()
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJAc3RyZWFtLWlvL2Rhc2hib2FyZCIsImlhdCI6MTczNjYxMDE0OCwiZXhwIjoxNzM2Njk2NTQ4LCJ1c2VyX2lkIjoiIWFub24iLCJyb2xlIjoidmlld2VyIiwiY2FsbF9jaWRzIjpbImxpdmVzdHJlYW06bGl2ZXN0cmVhbV8xOTgwNWQ4Yi03NjI2LTQxYWItOTEzNi03YjE1YmE1MmI5YjYiXX0.tea9-oFxpjv2eB-yps-k57tKmr45NxJ7xmToDlrSmDo"
      setToken(token)
      const new_user: User = { type: "anonymous" };
      const new_client = new StreamVideoClient({ apiKey, user:new_user, token });
      setUser(new_user)
      setClient(new_client)
    })()
  },[])

  const tokenProvider = async () => {
    const response = await fetch("/api/stream/token");
    const data = await response.json();
    return data.token;
  };

  const callId = params.get("livestream-id") as string


  return (
    <div>
      token
      {
        (user && client) &&
          <StreamVideo client={client} >
            <LivestreamPlayer callType="livestream" callId={callId} />
          </StreamVideo>
      } 
    </div>
  );
}



