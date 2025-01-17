import { NextResponse } from "next/server"
import {prisma} from "../../../../lib/prisma"
import bcrypt from "bcrypt"

export async function POST (req: Request) {
    try {
        const data = await req.json() 
    
        const userFound = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
    
        if(userFound) {
            return NextResponse.json({ message:"Email already registered" }, { status:401 })
        }
      
        data.password = await bcrypt.hash(data.password, 10)
       
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                birthday: data.birthday,
                addresses: data.addresses
            }
        })
    
      return NextResponse.json({ user: newUser})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message:"something went wrong" }, { status:500 })
    }
}