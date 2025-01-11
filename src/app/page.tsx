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

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

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
      <button onClick={() => router.push("/login")}>Sign in</button>
      <br />or<br />
      <button onClick={() => router.push("/signup")}>Register</button>
    </>
  )
}