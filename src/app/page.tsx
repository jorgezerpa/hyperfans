'use client'
// export default function Home() {
//   return (
//     <div className="flex justify-center items-center h-24">
//       <div className="font-bold text-2xl cursor-pointer">
//         Register
//       </div>
//     </div>
//   );
// }

import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}