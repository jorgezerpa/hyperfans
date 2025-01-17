import { NextResponse } from "next/server"

import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.STREAM_API_KEY as string;
const secret = process.env.STREAM_API_SECRET as string;;
const client = new StreamClient(apiKey, secret);

export async function PUT () {
    try {
        const userId = "!anon"
        const validity = 3600
        const token = await client.generateUserToken({ user_id: userId, validity_in_seconds: validity });
    
        return NextResponse.json({ token })
    } catch (error) {
        console.log(error)
        return NextResponse.json({}, {status:500})
    }
}