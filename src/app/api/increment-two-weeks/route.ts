import { NextResponse } from 'next/server';
import {addVocationLeaveForTwoWeeks} from "@/actions/resource"


export async function PUT() {
  try{
    await addVocationLeaveForTwoWeeks()
    return new NextResponse('Successfully incremented', { status: 200 });
  }
  catch(err){
    return new NextResponse('Method Not Allowed', { status: 405 });

  }
}


