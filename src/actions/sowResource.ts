'use server'
import prisma from "@/utils/db";
import { SOWResource } from '@/types'

export async function getResourcesBySOW(sowId: string) : Promise<SOWResource[]> {   
    if(sowId){
        const data = await prisma.sOWResource.findMany ({
            select: {
                id: true,
                sowId: true,
                resourceId: true,
                resource: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                active: true,
            },   
            where: {
                sowId: sowId,
            },
            orderBy: {
                resource: {
                    name: "asc"
                }
            }
        });
        return data;
    }
    return [];
}

export async function getProjectsByResourceId(id: string) : Promise<SOWResource[]> {
    if(id){
        const data = await prisma.sOWResource.findMany ({
            select: {
                id: true,
                sowId: true,        
                statementOfWork: {
                    select:{
                        id: true,
                        active: true,
                        name: true,
                        project: {
                            select: {
                                id: true,
                                name: true,
                                manager: true,
                                email: true,
                                phone: true,
                                customerId: true,
                            }
                        }
                    }
                },
                resourceId: true,
                resource: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                active: true,
            },   
            where: {
                resource: { id: id },
                statementOfWork: {
                    active: true,
                },
                active: true,
            },
            orderBy: {
                statementOfWork: {
                    project: {
                        name: "asc"
                    },                
                }
            }
        });
        return data;
    }
    return [];
}

export async function getProjectsByResource(email: string) : Promise<SOWResource[]> {
    if(email){
        const data = await prisma.sOWResource.findMany ({
            select: {
                id: true,
                sowId: true,        
                statementOfWork: {
                    select:{
                        id: true,
                        active: true,
                        name: true,
                        project: {
                            select: {
                                id: true,
                                name: true,
                                manager: true,
                                email: true,
                                phone: true,
                                customerId: true,
                            }
                        }
                    }
                },
                resourceId: true,
                resource: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                active: true,
            },   
            where: {
                resource: { email: email },
                statementOfWork: {
                    active: true,
                },
                active: true,
            },
            orderBy: {
                statementOfWork: {
                    project: {
                        name: "asc"
                    },                
                }
            }
        });
        return data;
    }
    return [];
}

