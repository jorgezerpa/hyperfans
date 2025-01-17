import { NextResponse } from "next/server"
import {prisma} from "../../../../../../lib/prisma"

export async function PUT () {
    try {
        const calls = await prisma.call.findMany({})
        return NextResponse.json({ calls })    
    } catch (error) {
        return NextResponse.json({}, {status:500})
    }
}
