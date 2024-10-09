"use server";
import prisma from "../app/utils/db";
import { Resource } from '@/types'

export async function fetchResource(email: string) : Promise<Resource | undefined> {
  if(email){
    const data = await prisma.resource.findFirstOrThrow ({
      select: {
        id: true,
        companyId: true,
        name: true,
        federalTaxId: true,
        address1: true,
        address2: true,
        city: true,
        state: true,
        zip: true,
        phone: true,
        mobile: true,
        fax: true,
        email: true,
        createdAt: true,
      },    
      where: {
        email: email
      }  
    });
    return data;
  }
  return undefined;
}  
export async function getAllResources() : Promise<Resource[]> {  
  const data = await prisma.resource.findMany ({
    select: {
      id: true,
      companyId: true,
      name: true,
      federalTaxId: true,
      address1: true,
      address2: true,
      city: true,
      state: true,
      zip: true,
      phone: true,
      mobile: true,
      fax: true,
      email: true,
      createdAt: true,
    },
    orderBy: {  
      name: 'asc'
    }  
  });
  return data;
}  