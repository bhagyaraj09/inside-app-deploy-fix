import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dateWithoutTimeZone = (date: Date) => {   
  const tzoffset = new Date(date).getTimezoneOffset() * 60000;        
  const withoutTimezone = new Date(new Date(date).valueOf() + tzoffset)
      .toDateString();
  return withoutTimezone;        
}