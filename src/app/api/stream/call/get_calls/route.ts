import { NextResponse } from "next/server"
import {prisma} from "../../../../../../lib/prisma"

export async function PUT () {
    const calls = await prisma.call.findMany({})
    return NextResponse.json({ calls })    
}
