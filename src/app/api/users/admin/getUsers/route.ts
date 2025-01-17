import { NextResponse } from "next/server"
import {prisma} from "../../../../../../lib/prisma"

export async function POST () {
    try {
        const users = await prisma.user.findMany({
            where: {
                role: "user"
            },
        })
    
      return NextResponse.json({ users })
    } catch (error) {
        return NextResponse.json({}, {status:500})
    }
}