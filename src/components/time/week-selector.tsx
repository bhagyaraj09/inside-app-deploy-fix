"use client"
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { cn } from "@/src/lib/utils"
import { Button } from "@/components/ui/button"
import { setDate } from "date-fns"

interface WeekSelectorProps {
  currentDate: string;
  dateMode: string;
  setDateMode: React.Dispatch<React.SetStateAction<string>>;
}

export function WeekSelector(props: WeekSelectorProps, {
  className,
}: React.HTMLAttributes<HTMLDivElement>) {    
    const curr = new Date(props.currentDate); // get current date
    const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week 
    const toggleDateMode = () => {
      props.setDateMode(props.dateMode == "Week" ? "Day" : "Week");
    }
  return (
    <div className={cn("border h-9 items-center justify-center rounded-md flex pr-2 w-76", className)}>
      <Button variant='ghost' onClick={toggleDateMode}><CalendarIcon className="h-5 w-5" /></Button>      
      {props.dateMode == "Week" ? new Date(curr.setDate(first)).toDateString() + " - " + new Date(curr.setDate(first + 6)).toDateString() : new Date(props.currentDate).toDateString()}
    </div>
  )
}