"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Matcher, DateBefore, Day } from "react-day-picker"; // Use DateBefore for disabling dates before minDate

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Select,SelectContent, SelectGroup,SelectLabel,SelectItem} from "@/components/ui/select";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"



interface DatePickerProps {
  onChange: (date: Date, type: string) => void; // Updated to handle date changes
  partialDay?: string;
   setPartialDay?: React.Dispatch<React.SetStateAction<string>>;
  date: Date | undefined;
  type: string;
  minDate: Date | undefined;
  buttonDisable?:boolean;
  onPartialChange?:(partialDay:string,type:string) => void|undefined;
  
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange, date, type, minDate,buttonDisable=false,partialDay,setPartialDay,onPartialChange }) => {
  var disableDays: Matcher[]=[]
  if (minDate) {
  disableDays= [
    { before: minDate },      // Disables all dates before minDate
    { dayOfWeek: [0, 6] }     // Disables Saturdays (6) and Sundays (0)
  ];  
  } 
  console.log(disableDays)

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button
         disabled={buttonDisable}
          variant={"outline"}
          className={cn(
            "w-[190px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? <span>{format(date, "PPP")}</span> : <span>Select Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div >
        <Calendar
          mode="single"
          disabled={disableDays}
          selected={date}
          onDayClick={(value)=>onChange(value, type)}
          initialFocus
          disableNavigation={false}
        />
        {partialDay && onPartialChange && 
      <RadioGroup defaultValue={partialDay} className="flex justify-around mb-3" onValueChange={(value) => onPartialChange(value,type)}>
  <div className="flex items-center  space-x-2">
    <RadioGroupItem value="firstHalf" id="firstHalf"  />
    <Label htmlFor="optionHalf" className="text-xs">First Half</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="secondHalf" id="secondHalf"/>
    <Label htmlFor="secondHalf" className="text-xs">Second Half</Label>
  </div>
</RadioGroup>}

        </div>
       
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
