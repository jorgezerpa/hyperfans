import {prisma} from "../../../../../lib/prisma"

import { authOptions } from "@/options/authOptions"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PUT (req: Request) {
    const session = await getServerSession(authOptions)
    if(session?.user.role !== "admin") return NextResponse.error()

    const data = await req.json()
    const config = await prisma.config.findFirst()
    if(!config) return NextResponse.error()
    await prisma.config.update({ where: { id: config.id }, data: { price: data.price } })

    return NextResponse.json({ price:config.price })
}
