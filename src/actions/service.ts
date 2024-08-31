"use server";
import prisma from "../app/utils/db";
import { Service } from '@/types'

export async function getServicesData() : Promise<Service[]> {
  const data = await prisma.service.findMany ({
    select: {
      id: true,
      name: true,
      active: true,
      createdAt: true,
    },  
    where: {
        active: true
    },
    orderBy: {
      name: "asc",
    }
  });
  return data;
}