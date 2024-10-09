"use server";
import { revalidatePath } from "next/cache";
import prisma from "../app/utils/db";
import { Timesheet } from '@/types';

export async function fetchTime(resourceId: string, startDate: string, endDate: string ) : Promise<Timesheet[]> {
    "use server";    
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
                gte: new Date(startDate),
                lte: new Date(endDate),
            },
        },        
        orderBy: {
            date: "asc"            
        }
    });
    return JSON.parse(JSON.stringify(data));
    //Only plain objects can be passed to Client Components from Server Components. Decimal objects are not supported.
}

export async function fetchTimeBySOWId(sowId: string, startDate: string, endDate: string) : Promise<Timesheet[]> {
    "use server";    
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
                gte: new Date(startDate),
                lte: new Date(endDate),
            }
        },        
        orderBy: [{
            resource: {
                name: "asc",
            },
        },{   
            date: "asc",         
        }],
    });
    return JSON.parse(JSON.stringify(data));
    //Only plain objects can be passed to Client Components from Server Components. Decimal objects are not supported.
}

export async function fetchTimeByResourceId(resourceId: string, startDate: string, endDate: string  ) : Promise<Timesheet[]> {
    "use server";    
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
                gte: new Date(startDate),
                lte: new Date(endDate),
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
    const data = await prisma.timesheet.update({
        data: {
            date: timesheetDate,
            email: formData.get("email") as string,
            statementOfWork: {
                connect: {
                    id: formData.get("project-select-" + formData.get("id") as string) as string,
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
    const data = await prisma.timesheet.create ({
        data: {
            date: timesheetDate,
            email: formData.get("email") as string,
            statementOfWork: {
                connect: {
                    id: formData.get("project-select-") as string,
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
export async function getTimeForApproval(resourceId: string, startDate: string, endDate: string) : Promise<Timesheet[]> {
    "use server";
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
                gte: new Date(startDate),
                lte: new Date(endDate),
            },
            resourceId: resourceId,
            status:  "Submitted",
        },
        orderBy: {
            date: "asc"            
        }
    });
    return JSON.parse(JSON.stringify(data));
}
export async function submitTimeForApproval(resourceId: string, startDate: string, endDate: string) : Promise<Timesheet[]> {
    "use server";       
    const data = await prisma.timesheet.updateMany({
        data: {
            status: "Submitted"
        },
        where: {
            date: {
                gte: new Date(startDate),
                lte: new Date(endDate),
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
    return fetchTime(resourceId, startDate, endDate);
}
export async function ApproveTime(resourceId: string, formData: FormData){
    "use server"; 
    formData.forEach(async (value, key) => {
        if(key.startsWith("custom-select-")){            
            const timesheetId = key.split("-")[2];            
            console.log(timesheetId);
            const data = await prisma.timesheet.update({
                data: {
                    sowId: formData.get("project-select-" + timesheetId) as string,
                    status: "Approved",
                    billable: Boolean(formData.get("billable-" + timesheetId)),
                },
                where: {
                    id: timesheetId,
                }
            });
        }
    });
    revalidatePath("/approve-time");
}