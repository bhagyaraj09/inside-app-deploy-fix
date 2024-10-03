"use server"
import prisma from "../app/utils/db";


type CreateEventInput = {
  eventType: string; // Foreign key to EventType
  eventName: string;
  description: string;
  startDate: string;
  time: string; // Optional
  endTime?: string | null;   // Optional
  eventMode: string;
};
export async function createEvent({
  eventName,
  eventType,
  description,
  startDate,
  startTime,
  eventMode,
  offset,
  endTime = null, // Default value for endTime

}: {
  eventName: string;
  eventType: string; // Foreign key to EventType
  description: string;
  startDate: Date;
  offset:number;
  startTime: string;
  eventMode: string;


  endTime?: string | null;  // Optional endTime
}){
  
  try {
 
    
      // Convert startDate to UTC and set time to the start of the day
      const  UTCStartDate = new Date(startDate.getTime() - offset * 60000);
      UTCStartDate.setHours(0, 0, 0, 0);

      // Handle optional startTime
    
    


    const newEvent = await prisma.event.create({
      data: {
        eventTypeId : eventType,  // Many-to-one relation with EventType
        eventName: eventName,
        description: description,
        date: UTCStartDate,
        startTime: startTime,  // Handle optional startTime
        endTime: endTime || null,      // Handle optional endTime
        eventMode: eventMode,
        isEventCancelled:false,
      },
      });
    return newEvent;
  } catch (error) {
    console.log('Error creating event:', error);
  }
}

export async function getAllEvents() {
    return await prisma.event.findMany({
      orderBy: {
        date: 'desc', // Order by date in descending order (latest first)
      },
      
    });
  }

export async function  addEventType(type:string){
  try{

  
  
  await prisma.eventType.create({
    data: {
      typeName: type,
    },
  });
 const data= await getAllEventType()
 return data
}
catch(err){
  console.log(err)
}
}
  
//   // Read a single event by ID
//   export async function getEventById(eventId: string) {
//     return await prisma.event.findUnique({
//       where: { id: eventId },
//       include: {
//         eventType: true, // Include the associated event type
//       },
//     });
//   }
  
  // Update an event
  export async function updateEvent(eventId: string, eventData: {
    eventName?: string;
    description?: string;
    date?: Date;
    startTime?: string;
    endTime?: string;
    eventMode?: string;
    eventTypeId?: string;
  }) {
   await prisma.event.update({
      where: { id: eventId },
      data: eventData,
    });
    const data=getAllEvents();
    return data
  }
  
//   // Delete an event
  export async function deleteEvent(eventId: string) {
     await prisma.event.delete({
      where: { id: eventId },
    });
    const data=await getAllEvents() 
    return data
  }


  export async function getAllEventType(){
    try{
      return await prisma.eventType.findMany();

    }
    catch(error){
      console.log("Error fetching event types:", error);
    }
  }

  export async function cancelEvent(eventId: string){
 
      const value=   await prisma.event.update({
          where: { id: eventId },
          data: {isEventCancelled:true},
        });
          
      const data=getAllEvents() 
      return data
    }


export async function getHolidayId(){
  try{
    return await prisma.eventType.findUnique({
      where: { typeName: 'Holiday\n' },
      select: {
        id: true,
      },
    });
  }
  catch(error){console.log("Error fetching holiday id:", error);
  }
 }


export async function getAllHolidaysDate(){

  try{
    const holiday=await getHolidayId() 
    if (holiday && holiday.id){
      return await prisma.event.findMany({
        select:{
          date:true,
        },
        where: {
          eventTypeId: holiday.id,
          NOT: {
            isEventCancelled: true, // Exclude events where isEventCancelled is true
          },
        },
      });

    }
    
  }
  catch(error){console.log("Error fetching events:", error);
  }
  
}    

export async function fetchAllHolidays() {
  try {
    const holiday=await getHolidayId() 
    if (holiday && holiday.id){


    const data= await prisma.event.findMany({
      select: {
        date: true,
        eventName: true,
        description: true,
      },
      where: {
        eventTypeId:holiday.id,
      
          isEventCancelled:false, // Exclude events where isEventCancelled is true
        
      },
    });
    return data
  }
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;  // Throw the error so it can be handled by the caller
  }
}



    
  