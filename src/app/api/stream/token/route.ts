import { NextResponse } from "next/server"

import { StreamClient } from "@stream-io/node-sdk";

const apiKey = "tqag879npxda";
const secret = "tmr5kn99uhbcam8mfbx49nfw7ytq8sacestj2vkbaus8ycdk76stvxgse33s9ax4";
const client = new StreamClient(apiKey, secret);

export async function PUT () {
    const userId = "!anon"
    const validity = 3600
    const token = await client.generateUserToken({ user_id: userId, validity_in_seconds: validity });

    return NextResponse.json({ token })
}