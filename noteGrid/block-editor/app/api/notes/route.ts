// Collection level API //


import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Gives all the blocks 
export async function GET() {
    const block = await prisma.block.findMany();
    // Gets all the blocks (rows) from the database "Block"
    return NextResponse.json(block);
    // Fetches all the data in json format and sends back to the browser
}


// Create a new block according to the request
export async function POST(req: NextRequest) {
    const body = await req.json();
    const newBlock = await prisma.block.create({
        data: {
            type: body.type,
            content:body.content
        }
    });
    return NextResponse.json(newBlock, {
        status: 201
    });
}

