import { NextResponse } from "next/server"
import {prisma} from "../../../../../../lib/prisma"

export async function POST (req: Request) {
    const { callId, state } = await req.json()

    await prisma.call.create({
        data: {
            state: state||"active",
            callId: callId // livestream id
        }
    })
    
    return NextResponse.json({ ok:200 })    
}