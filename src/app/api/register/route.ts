import { NextResponse } from "next/server"
import {prisma} from "../../../../lib/prisma"
import bcrypt from "bcrypt"

export async function POST (req: Request, res: Response) {
    const data = await req.json() 

    const userFound = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if(userFound) {
        return NextResponse.json({message:"user already exists"})
    }
  
    data.password = await bcrypt.hash(data.password, 10)

    // id            String    @id @default(cuid())
    // name          String?
    // email         String?   @unique
    // password      String?
    // emailVerified DateTime?
    // image         String?
    // createdAt     DateTime  @default(now())
    // updatedAt     DateTime  @updatedAt
    // addresses     String[]
   
    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
            // addresses: data.addresses, will be added later on when connect wallet to pay
        }
    })

  return NextResponse.json({ user: newUser})
}