"use server";
import { revalidatePath } from "next/cache";
import prisma from "../app/utils/db";
import { Timesheet } from '@/types';

export async function fetchTime(timezoneOffset: number, resourceId: string, startDate: Date, endDate: Date  ) : Promise<Timesheet[]> {
    "use server";
    let UTCStartDate = new Date(startDate.getTime() - timezoneOffset * 60000);
    let UTCEndDate = new Date(endDate.getTime() - timezoneOffset * 60000);
    UTCStartDate.setHours(0,0,0,0);
    UTCEndDate.setHours(0,0,0,0);
    const data = await prisma.timesheet.findMany ({
        select: {
            id: true,
            date: true,
            email: true,
            sowId: true,        
            resourceId: true,                
            serviceId: true,
            hours: true,        
            description: true,
            billable: true,
            status: true,
            createdAt: true,        
        },    
        where: {
            resourceId: resourceId,
            date: {
                gte: UTCStartDate,
                lte: UTCEndDate
            }
        },        
        orderBy: {
            date: "asc"            
        }
    });
    return JSON.parse(JSON.stringify(data));
    //Only plain objects can be passed to Client Components from Server Components. Decimal objects are not supported.
}

export async function fetchTimeBySOWId(timezoneOffset:number,sowId: string, startDate: Date, endDate: Date  ) : Promise<Timesheet[]> {
    "use server";
    let UTCStartDate = new Date(startDate.getTime() - timezoneOffset * 60000);
    let UTCEndDate = new Date(endDate.getTime() - timezoneOffset * 60000);
    UTCStartDate.setHours(0,0,0,0);
    UTCEndDate.setHours(0,0,0,0);
  
    const data = await prisma.timesheet.findMany ({
        select: {
            id: true,
            date: true,
            email: true,
            sowId: true, 
            statementOfWork: {
                select: {
                    id: true,
                    name: true,
                    project: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            },       
            resourceId: true,  
            resource: {
                select: {
                    id: true,
                    name: true,
                }
            },              
            serviceId: true,
            service: {
                select: {
                    id: true,
                    name: true,
                }
            },
            hours: true,        
            description: true,
            billable: true,
            status: true,
            createdAt: true,        
        },    
        where: {
            sowId: sowId,
            date: {
                gte: UTCStartDate,
                lte: UTCEndDate
            }
        },        
        orderBy: {
            resource: {
                name: "asc",
            },         
        },
    });
    return JSON.parse(JSON.stringify(data));
    //Only plain objects can be passed to Client Components from Server Components. Decimal objects are not supported.
}

export async function fetchTimeByResourceId(timezoneOffset:number,resourceId: string, startDate: Date, endDate: Date  ) : Promise<Timesheet[]> {
    "use server";
    let UTCStartDate = new Date(startDate.getTime() - timezoneOffset * 60000);
    let UTCEndDate = new Date(endDate.getTime() - timezoneOffset * 60000);
    UTCStartDate.setHours(0,0,0,0);
    UTCEndDate.setHours(0,0,0,0);
    const data = await prisma.timesheet.findMany ({
        select: {
            id: true,
            date: true,
            email: true,
            sowId: true, 
            statementOfWork: {
                select: {
                    id: true,
                    name: true,
                    project: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            },       
            resourceId: true,  
            resource: {
                select: {
                    id: true,
                    name: true,
                }
            },              
            serviceId: true,
            service: {
                select: {
                    id: true,
                    name: true,
                }
            },
            hours: true,        
            description: true,
            billable: true,
            status: true,
            createdAt: true,        
        },    
        where: {
            resourceId: resourceId,
            date: {
                gte: UTCStartDate,
                lte: UTCEndDate
            }
        },        
        orderBy: {
            date: "asc",
        },
    });
    return JSON.parse(JSON.stringify(data));
    //Only plain objects can be passed to Client Components from Server Components. Decimal objects are not supported.
}

export async function updateTime(formData: FormData){
    "use server";    
    let timesheetDate = new Date(formData.get("date") as string);
    timesheetDate.setHours(0,0,0,0);
    const data = await prisma.timesheet.update({
        data: {
            date: timesheetDate,
            email: formData.get("email") as string,
            statementOfWork: {
                connect: {
                    id: formData.get("sowId") as string,
                }
            },            
            service: {
                connect: {
                    id: formData.get("serviceId") as string,
                }
            },
            hours: formData.get("hours") as string,
            description: formData.get("description") as string,
            billable: Boolean(formData.get("billable")),
        },
        where: {
            id: formData.get("id") as string
        }
    });
    revalidatePath("/admin/customers");    
}

export async function addTime(formData: FormData){
    "use server";
    let timesheetDate = new Date(formData.get("date") as string);
    timesheetDate.setHours(0,0,0,0);
    const data = await prisma.timesheet.create ({
        data: {
            date: timesheetDate,
            email: formData.get("email") as string,
            statementOfWork: {
                connect: {
                    id: formData.get("sowId") as string,
                }
            },
            resource: {
                connect: {
                    id: formData.get("resourceId") as string,
                }
            },
            service: {
                connect: {
                    id: formData.get("serviceId") as string,
                }
            },
            hours: parseFloat(formData.get("hours") as string),
            description: formData.get("description") as string,
            billable: Boolean(formData.get("billable")),
            status:  "Added",
        }
    });
    revalidatePath("/time");
}

export async function deleteTime(id: string){
    "use server";   
    const data = await prisma.timesheet.delete({
        where: {
            id: id
        }
    });
    revalidatePath("/time");
}
export async function getTimeForApproval(timezoneOffset:number,resourceId: string, startDate: Date, endDate: Date  ) : Promise<Timesheet[]> {
    "use server";    
    let UTCStartDate = new Date(startDate.getTime() - timezoneOffset * 60000);
    let UTCEndDate = new Date(endDate.getTime() - timezoneOffset * 60000);
    UTCStartDate.setHours(0,0,0,0);
    UTCEndDate.setHours(0,0,0,0);
    const data = await prisma.timesheet.findMany({
        select: {
            id: true,
            date: true,
            email: true,
            sowId: true,        
            resourceId: true,                
            serviceId: true,
            service: {
                select: {
                    id: true,
                    name: true,
                }
            },
            hours: true,        
            description: true,
            billable: true,
            status: true,
            createdAt: true,        
        },    
        where: {
            date: {
                gte: UTCStartDate,
                lte: UTCEndDate
            },
            resourceId: resourceId,
            OR: [
                {status:  "Submitted"},
                {status:"Approved"},       
            ] 
        },
        orderBy: {
            date: "asc"            
        }
    });
    return JSON.parse(JSON.stringify(data));
}
export async function submitTimeForApproval(timezoneOffset: number, resourceId: string, startDate: Date, endDate: Date  ) : Promise<Timesheet[]> {
    "use server";
    let UTCStartDate = new Date(startDate.getTime() - timezoneOffset * 60000);
    let UTCEndDate = new Date(endDate.getTime() - timezoneOffset * 60000);
    UTCStartDate.setHours(0,0,0,0);
    UTCEndDate.setHours(0,0,0,0);        
    const data = await prisma.timesheet.updateMany({
        data: {
            status: "Submitted"
        },
        where: {
            date: {
                gte: UTCStartDate,
                lte: UTCEndDate
            },
            resourceId: resourceId,
            OR: [
                {
                    status: {
                        not: "Submitted"
                    }
                },
                {
                    status: {
                        not: "Approved"
                    }
                }
            ]
        }
    });
    return fetchTime(0, resourceId, UTCStartDate, UTCEndDate);
}