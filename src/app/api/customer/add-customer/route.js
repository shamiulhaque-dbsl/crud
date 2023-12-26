// /api/customer/add-customer
import { PrismaClient} from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();


export async function GET(request) {
    return NextResponse.json({ message: "Hello World form get" });
}
  
// Handles POST requests to /api
export async function POST(request) {
    const body = await request.json();
    console.log(body.name)

    const customer = await prisma.customer.create({
        data: {
            name: body.name,
            age: body.age,
            gender: body.gender,
            address: body.address

          },
    });

    console.log('Customer created:', customer);

    
    return NextResponse.json({ body });
}