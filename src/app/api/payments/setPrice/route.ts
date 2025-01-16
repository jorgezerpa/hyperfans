import { NextResponse } from "next/server"
import {prisma} from "../../../../../lib/prisma"

export async function PUT (req: Request) {
    const data = await req.json()
    const config = await prisma.config.findFirst()
    if(!config) return null
    await prisma.config.update({ where: { id: config.id }, data: { price: data.price } })

    return NextResponse.json({ price:config?.price })
}
