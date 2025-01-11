import { NextResponse } from "next/server"
import {prisma} from "../../../../../../lib/prisma"
import bcrypt from "bcrypt"

export async function GET (req: Request, res: Response) {
    const calls = await prisma.call.findMany({})
    return NextResponse.json({ calls })    
}

export async function POST (req: Request, res: Response) {
    const { call_id } = await req.json()

    const response = await prisma.call.create({
        data: {
            state: "active",
            callId: call_id // livestream id
        }
    })
    
    return NextResponse.json({ ok:200 })    
}