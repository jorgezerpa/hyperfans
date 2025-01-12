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

  const [token, setToken] = useState("")
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

  let callId = params.get("livestream-id") as string


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




// 'use client'
// import {
//   StreamVideoClient,
//   StreamVideo,
//   User,
//   StreamCall,
// } from "@stream-io/video-react-sdk";

// // for livestreamview component 
// import { ParticipantView, useCallStateHooks } from '@stream-io/video-react-sdk'; 

// const apiKey = "mmhfdzb5evj2";
// // this token should be generated individually for the user on sign-up or login (is a common JSON web token)
// // this token is to control who can access to the call 
// // should be getted from the Stream SDK 
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1F1aS1Hb25fSmlubiIsInVzZXJfaWQiOiJRdWktR29uX0ppbm4iLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTczNjUzNjgwOSwiZXhwIjoxNzM3MTQxNjA5fQ.KYW_tZ1H6AYdn6Pc-gdU8d5XtQfjqkE1Oksh-Yl8gMc";
// const userId = "Qui-Gon_Jinn";
// const callId = "XEy9p9volvGq";

// const user: User = { id: userId, name: "Tutorial" };
// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call("livestream", callId);
// call.join({ create: true });

// export default function Home() {
//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <LivestreamView />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// const LivestreamView = () => {
//   const {
//     useCameraState,
//     useMicrophoneState,
//     useParticipantCount,
//     useIsCallLive,
//     useParticipants,
//   } = useCallStateHooks();

//   const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
//   const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();
  
//   const participantCount = useParticipantCount();
//   const isLive = useIsCallLive();

//   const [firstParticipant] = useParticipants();
  
//   return (
//     <div style={{ display: "flex", flexDirection: 'column', gap: '4px' }}>
//       <div>{isLive ? `Live: ${participantCount}`: `In Backstage`}</div>
//       {firstParticipant ? (
//         <ParticipantView participant={firstParticipant} />
//       ) : (
//         <div>The host hasn't joined yet</div>
//       )}
//       <div style={{ display: 'flex', gap: '4px'}}>
//         <button onClick={() => (isLive ? call.stopLive() : call.goLive())}>
//           {isLive ? "Stop Live" : "Go Live"}
//         </button>
//         <button onClick={() => cam.toggle()}>
//           {isCamEnabled ? "Disable camera" : "Enable camera"}
//         </button>
//         <button onClick={() => mic.toggle()}>
//           {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
//         </button>
//       </div>
//     </div>
//   );
// };