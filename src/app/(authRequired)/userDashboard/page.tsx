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

import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div>
        {/* Hi: 
        {
          session?.user?.name
        } */}
    </div>
  )
}