// /api/customer
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
    
        // Fetch all user data
        const users = await prisma.customer.findMany();
        BigInt.prototype.toJSON = function() { return this.toString() }
        // Return a JSON response with the user data
        return NextResponse.json({ message: "Hello World from GET", users });
    
}
