"use server";


import prisma from "../app/utils/db";

export async function getAllHolidaysDate() {
    try {
      const data= await prisma.event.findMany({
        select: {
          date: true,
        },
        where: {
          eventType: {
            typeName: {
              equals: 'Holiday', // Correct way to filter by 'Holiday' in the type name
            },
          },
          isEventCancelled: {
            not: true, // Exclude events where isEventCancelled is true
          },
        },
      });
      console.log("data",data)
      return data
    } catch (error) {
      console.error("Error fetching holidays", error);
      throw error;
    }
  }