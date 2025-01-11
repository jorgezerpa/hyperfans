'use client'
import { useRouter } from "next/navigation"

const streams = [
    { date: "01/23/2024",  }
]

export default function Streams() {
    const router = useRouter()

    return (
        <>
            <h1 className="text-center pt-7 pb-7 font-bold text-2xl">Streams</h1>

            <div className="flex justify-center items-center py-24">
                {/* ViewLiveStream should be inside protected routes */}
                <div onClick={()=>router.push("/ViewLiveStream")} className="cursor-pointer text-center text-lg font-bold text-white px-4 py-2 bg-purple-700 rounded-sm">Join Stream</div>
            </div>

        </>
    )
}