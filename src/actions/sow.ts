'use server'
import prisma from "@/utils/db";
import { StatementOfWork } from '@/types'

export async function getAllSOWs() : Promise<StatementOfWork[]> {
    const data = await prisma.statementOfWork.findMany ({
        select: {
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
        },
        orderBy: {
            project: {
                name: "asc"
            },
        }
    });
    return data;
}

