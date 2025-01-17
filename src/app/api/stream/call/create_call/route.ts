import { NextResponse } from "next/server"
import {prisma} from "../../../../../../lib/prisma"
import { authOptions } from "@/options/authOptions"
import { getServerSession } from "next-auth"

export async function POST (req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if(session?.user.role !== "admin") return NextResponse.error()
            
        const { callId, state } = await req.json()
    
        await prisma.call.create({
            data: {
                state: state||"active",
                callId: callId // livestream id
            }
        })
        
        return NextResponse.json({ ok:200 })    
    } catch (error) {
        console.log(error)
        return NextResponse.json({}, {status:500})
    }
}