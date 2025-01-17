import { NextResponse } from "next/server"
import {prisma} from "../../../../../lib/prisma"

export async function POST () {
    try {
        const config = await prisma.config.findFirst()
    
        return NextResponse.json({ price:config?.price })
    } catch (error) {
        console.log(error)
        return NextResponse.json({}, {status:500})
    }

}
