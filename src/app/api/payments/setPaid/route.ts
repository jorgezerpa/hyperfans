import { NextResponse } from "next/server"
import {prisma} from "../../../../../lib/prisma"

export async function PUT (req: Request) {
    const data = await req.json() 

    await prisma.user.update({
        where: { email: data.email },
        data: {
            earlyAccessPaid:true,
            paymentTransactions: {push:[data.transactionHash]}
        }
    })

  return NextResponse.json({ })
}