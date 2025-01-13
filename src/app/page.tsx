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
  const { data: session } = useSession()

  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session?.user?.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }

  return (
    <>
      <h1 className="text-center pt-20 font-bold text-2xl pb-10">Hyper Fans</h1>
      <div className="text-center cursor-pointer" onClick={() => router.push("/login")}>Sign in</div>
      <div className="text-center cursor-pointer" >Or</div>
      <div className="text-center cursor-pointer" onClick={() => router.push("/signup")}>Register</div>
    </>
  )
}