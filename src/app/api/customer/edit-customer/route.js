// /api/customer/add-customer
import { PrismaClient} from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

  
// Handles POST requests to /api
export async function PUT(request) {
    const body = await request.json();
    console.log(body.name)
    console.log(body.id)
    const customer = await prisma.customer.update({
       
        where: {
            id: body.id,
          },
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