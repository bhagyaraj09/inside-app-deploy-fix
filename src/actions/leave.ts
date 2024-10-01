"use server";


import prisma from "../app/utils/db";
import { getHoursDifference } from "../lib/timeFormat";
import { consumeLeaveResource } from "./resource";



export async function applyLeave(resourceId:string,startTime:Date,endTime:Date,description:string,durationValue:number,startDatePartial:string,endDatePartial:string,leaveType:string){
  "use server";
  try{
    startTime.setHours(0,0,0,0) 
    endTime.setHours(0,0,0,0)
    
    durationValue=Math.round(durationValue)

    const newLeave = await prisma.leave.create({
      data: {
        resourceId: resourceId,
        startTime: startTime,
        endTime: endTime,
        status: "pending",
        description: description,
        duration:durationValue,
        startDatePartial:startDatePartial,
        endDatePartial:endDatePartial,
        leaveType: leaveType,
      },
    });
  } catch(err){
    console.log("------------>",err)
  }
    

}

export async function updateLeave(resourceId:string,leaveId:string,submittedStatus:string,startTime:Date,endTime:Date){ 
try{

  if (submittedStatus=="approved"){
    const difference=getHoursDifference(startTime,endTime)
      consumeLeaveResource(resourceId,difference)
  }
  const updatedLeave=await prisma.leave.update({
    data:{
      status: submittedStatus
    },
    where:{
      id:leaveId
    }
  })
}catch(err){
  console.log(err)
}
}




export async function getLeavesByResourceId(resourceId: string) {
  try{
    const leaves = await prisma.leave.findMany({
      where: {
        resourceId: resourceId, 
      },
      orderBy: {
        startTime: 'asc', 
      },
    });
    return leaves;
  }
  catch(err){
    console.log(err)
  }
 
}

export async function updateLeavesByLeaveId(leaveId:string,startDate:Date,endDate:Date,description:string,duration:number,leaveType:string){
  try{
    const updatedLeave = await prisma.leave.update({
      where: {
        id: leaveId,
      },
      data: {
        startTime: startDate,
        endTime: endDate,
        description: description,
        duration: duration,
        leaveType: leaveType,
      },
  })
  } catch(err){
    console.log(err)
  
}
}

export async function cancelLeaveRequestById(leaveId:string){
  const leaves=await prisma.leave.delete({
    where:{
      id: leaveId
    },
  
  })

}



export async function fetchAllLeaves(){

  try{
    const leaves = await prisma.leave.findMany({
      include: {
        resource: {
          select: {
            name: true,
            vocationLeavesAvailable:true,
            sickLeavesAvailable:true,
            sickLeavesConsumed:true,
            vocationLeavesConsumed:true
          }
        }
      
  },
 
});
    return leaves;

  } catch(err){
    console.log(err)
  }
}


export  async function submitLeaveForApproval(status:string,leaveType:string,leaveId:string,sickLeaveAvailable:number,sickLeaveConsumed:number,vocationLeaveAvailable:number,vocationLeaveConsumed:number){
  try{

    console.log("api hit",{sickLeaveAvailable,sickLeaveConsumed,vocationLeaveAvailable,vocationLeaveConsumed})
  const data= await  prisma.leave.update({
        where: {
          id: leaveId,
        },
        data: {
          status: status,
          leaveType: leaveType,
          resource:{
            update: {
              sickLeavesAvailable:sickLeaveAvailable,
              vocationLeavesAvailable:vocationLeaveAvailable,
              sickLeavesConsumed:sickLeaveConsumed,
              vocationLeavesConsumed:vocationLeaveConsumed,

            }
          }
        },
      });
      console.log(data)
    } catch(err){
      console.log(err)
    }
  }



  export async function fetchLeavesByStartEndResource(
    startDate: Date | null = null,
    endDate: Date | null = null,
    resourceId: string,
    timezoneOffset: number
  ) {
    let UTCStartDate: Date | null = null;
    let UTCEndDate: Date | null = null;
  
    console.log({ startDate, endDate, resourceId, timezoneOffset });
  
    try {
      if (startDate) {
        // Convert startDate to UTC and set time to the start of the day
        UTCStartDate = new Date(startDate.getTime() - timezoneOffset * 60000);
        UTCStartDate.setHours(0, 0, 0, 0);
      }
  
      if (endDate) {
        // Convert endDate to UTC and set time to the end of the day
        UTCEndDate = new Date(endDate.getTime() - timezoneOffset * 60000);
        UTCEndDate.setHours(23, 59, 59, 999); // End of the day for endDate
      }
  
      console.log({ UTCEndDate, UTCStartDate });
  
      const filters: any[] = [];
  
      if (resourceId) {
        filters.push({
          resourceId: resourceId, // Filter by resourceId if provided
        });
      }
  
      if (UTCStartDate) {
        filters.push({
          startTime: {
            gte: UTCStartDate, // Filter for leaves starting on or after the start date
          },
        });
      }
  
      if (UTCEndDate) {
        filters.push({
          endTime: {
            lte: UTCEndDate, // Filter for leaves ending on or before the end date
          },
        });
      }
      filters.push({
        status: {
          not: "pending", // Exclude leaves with status "pending"
        },
      });
      
      const leaves = await prisma.leave.findMany({
        where: {
          AND: filters,
        },
        select: {
          resource: {
            select: {
              name: true, // Assuming resource has a name field
            },
          },
          description: true,
          duration: true,
          leaveType: true,
          status: true,
          startTime: true,
          endTime: true,
          id: true,
          resourceId: true,
        },
      });
  
      console.log({ leaves }, "server");
  
      return leaves;
    } catch (err) {
      console.log(err);
    }
  }
  