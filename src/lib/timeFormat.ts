import { HolidaysProp } from "@/types";
export function getHoursDifference(date1: Date, date2: Date): number {
    // Get the time difference in milliseconds
    const timeDifference = date2.getTime() - date1.getTime();
    
    // Convert time difference from milliseconds to hours
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    
    return Math.abs(hoursDifference); // Return absolute value to avoid negative hours
  }

  export function calculateDuration(
    startDate: Date,
    endDate: Date,
    startDatePartial: string,
    endDatePartial: string,
    holidays: HolidaysProp[]|null
  ): number {
    let duration = 0;
    let date = new Date(startDate);
    date.setHours(0, 0, 0, 0);
    endDate.setHours(0,0,0,0)
    startDate.setHours(0,0,0,0)
    
    // Extract day and month from holidays
      const holidaySet = new Set(
        holidays?.map(d => `${(d.date).getMonth()}-${(d.date).getDate()}`)
      );
   
  
   
  
    while (date <= endDate) {
      // Check if the date is not a weekend and is a holiday
      const dayMonth = `${date.getMonth()}-${date.getDate()}`;
      if (date.getDay() !== 0 && date.getDay() !== 6 &&
        holidays&&  holidaySet.has(dayMonth)) {
        //duration += 8;
        continue
  
      } else if (date.getDay() !== 0 && date.getDay() !== 6) {
        duration += 8;
  
      }
      date.setDate(date.getDate() + 1);
    }
  if (endDate.getTime()===startDate.getTime() && date.getDay() !== 0 && date.getDay() !== 6){
    duration=8
  }
  console.log(startDate.getTime(),endDate.getTime(),duration,startDate,endDate)
    if (startDatePartial === endDatePartial) {
      duration -= 4;
  
  
    }
  
  
    return duration;
  }