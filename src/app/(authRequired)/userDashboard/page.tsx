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
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <div>
        Hola tu: 
        {
          session?.user?.name
        }
    </div>
  )
}