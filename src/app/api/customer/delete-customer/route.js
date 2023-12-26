// /api/customer/add-customer
import { PrismaClient} from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();


export async function DELETE(request) {
    const body = await request.json();
    console.log(body.id)
    const deleteUser = await prisma.customer.delete({
        where: {
          id: 1021
        },
      })
      console.log("Id is deleted")
    return NextResponse.json({  deleteUser });
}
  
