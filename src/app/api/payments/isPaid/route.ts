import { NextResponse } from "next/server"
import {prisma} from "../../../../../lib/prisma"

export async function POST (req: Request) {
    try {
        const data = await req.json() 
    
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        })
    
        return NextResponse.json({ user })
    } catch (error) {
        console.log(error)
        return NextResponse.json({}, {status:500})
    }
}
