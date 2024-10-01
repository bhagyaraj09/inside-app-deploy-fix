"use server";
import prisma from "../app/utils/db";
import { Resource,FetchLeavesDataFromId } from '@/types'

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

export async function  consumeLeaveResource(resourceId:string,diffHrs:number){
  const consumeLeave=diffHrs/24
  const data=await prisma.resource.findFirstOrThrow({
    select:{
      vocationLeavesAvailable:true,
      vocationLeavesConsumed:true,
    },
    where:{
      id:resourceId,
    }
  })
}

export async function fetchResourceById(id: string) : Promise<FetchLeavesDataFromId | undefined> {
  try{
    console.log("id",id)
    if(id){
      const data = await prisma.resource.findFirstOrThrow ({
        select: {
          vocationLeaves:true,
          vocationLeavesAvailable:true,
          vocationLeavesConsumed:true,
          sickLeaves:true,
          sickLeavesConsumed:true,
          sickLeavesAvailable:true,
          vocationLeaveNoticePeriod:true,
        },    
        where: {
          id:id
        }  
      });
      console.log({data})
      return data;
    }
  }
  catch(err){
    console.log(err)
  }
  
  
}

export const resetEntireLeavesAll=()=>{
  const result=prisma.resource.updateMany({
    data:{
      vocationLeaves         :0, 
      vocationLeavesConsumed  :0,
      vocationLeavesAvailable :0, 
      sickLeaves   :40, 
      sickLeavesConsumed  :0,
      sickLeavesAvailable :40, 
    },
    
  })

  } 

  export const addVocationLeaveForTwoWeeks=()=>{
    const result = prisma.resource.updateMany({
      data: {
        vocationLeaves: {
          increment: 4,
        },
        vocationLeavesAvailable: {
          increment: 4,
        },
      },
    });

  }

  export async function fetchAllResourcesName(){
    try{
      const data=await prisma.resource.findMany({
        select:{
          id:true,
          name:true,
       
        },
        orderBy:{
          name:'asc'
        }
      })
      return data
    } catch(err){
      console.log(err)

    }

  }