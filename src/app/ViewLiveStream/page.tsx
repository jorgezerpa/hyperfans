'use client'
import {
  StreamVideoClient,
  StreamVideo,
  User,
  StreamCall,
  LivestreamLayout
} from "@stream-io/video-react-sdk";

// for livestreamview component 

const apiKey = "mmhfdzb5evj2";
// this token should be generated individually for the user on sign-up or login (is a common JSON web token)
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1F1aS1Hb25fSmlubiIsInVzZXJfaWQiOiJRdWktR29uX0ppbm4iLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTczNjUzNjgwOSwiZXhwIjoxNzM3MTQxNjA5fQ.KYW_tZ1H6AYdn6Pc-gdU8d5XtQfjqkE1Oksh-Yl8gMc";
const userId = "Qui-Gon_Jinn";
const callId = "XEy9p9volvGq";

const user: User = { id: userId, name: "Gypsy Danger" }; // type anonimous and with my API secret I can generate a token to join the call 
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("livestream", callId);
call.join({ create: true });

// Viwer by default should not be able to appear or talk
call.camera.disable();
call.microphone.disable();

export default function Home() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamLayout 
          showParticipantCount
          showDuration
          showLiveBadge
        />
      </StreamCall>
    </StreamVideo>
  );
}

