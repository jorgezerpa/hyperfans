import { NextResponse } from "next/server"
import {prisma} from "../../../../../../lib/prisma"
import bcrypt from "bcrypt"

export async function GET (req: Request, res: Response) {
    const calls = await prisma.call.findMany({})
    return NextResponse.json({ calls })    
}
