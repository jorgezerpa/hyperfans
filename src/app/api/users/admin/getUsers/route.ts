import { NextResponse } from "next/server"
import {prisma} from "../../../../../../lib/prisma"
import bcrypt from "bcrypt"

export async function POST () {
    const users = await prisma.user.findMany({
        where: {
            role: "user"
        },
    })

  return NextResponse.json({ users })
}