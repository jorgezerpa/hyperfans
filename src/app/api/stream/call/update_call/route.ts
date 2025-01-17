import { NextResponse } from "next/server"
import {prisma} from "../../../../../../lib/prisma"
import { authOptions } from "@/options/authOptions"
import { getServerSession } from "next-auth"

export async function PUT (req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if(session?.user.role !== "admin") return NextResponse.error()
            
        const { id, state } = await req.json()
    
        await prisma.call.update({
            where: { id: id },
            data: { state: state }
        })
    
        return NextResponse.json({ ok:200 })    
    } catch (error) {
        return NextResponse.json({}, {status:500})
    }
}