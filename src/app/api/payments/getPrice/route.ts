import { NextResponse } from "next/server"
import {prisma} from "../../../../../lib/prisma"

export async function POST () {

    const config = await prisma.config.findFirst()

    return NextResponse.json({ price:config?.price })
}
