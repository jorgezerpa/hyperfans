import { NextResponse } from "next/server"
import {prisma} from "../../../../../../lib/prisma"

export async function PUT (req: Request, res: Response) {
    const { id, state } = await req.json()

    const response = await prisma.call.update({
        where: { id: id },
        data: { state: state }
    })

    return NextResponse.json({ ok:200 })    
}