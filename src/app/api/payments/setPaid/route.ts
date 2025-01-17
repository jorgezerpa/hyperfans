import { NextResponse } from "next/server"
import {prisma} from "../../../../../lib/prisma"

export async function PUT (req: Request) {
    try {
        const data = await req.json() 
    
        await prisma.user.update({
            where: { email: data.email },
            data: {
                earlyAccessPaid:true,
                paymentTransactions: {push:[data.transactionHash]}
            }
        })
    
      return NextResponse.json({ })
    } catch (error) {
        return NextResponse.json({}, {status:500})
    }
}