import { NextResponse } from 'next/server';
import {resetEntireLeavesAll} from "@/actions/resource"


// Handle GET requests

// Optionally handle POST requests
export async function PUT() {
  try{
    await resetEntireLeavesAll()
    return new NextResponse('Successfully reset', { status: 200 });
  }
  catch(err){
    return new NextResponse('Method Not Allowed', { status: 405 });

  }
}

// Optionally handle PUT requests

