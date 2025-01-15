import { NextResponse } from "next/server"
import {prisma} from "../../../../../lib/prisma"

export async function PUT (req: Request) {
    const data = await req.json() 
    console.log(data)

    await prisma.user.update({
        where: { email: data.email },
        data: {
            earlyAccessPaid:true
        }
    })

  return NextResponse.json({ user: {}})
}