import { format, addDays, startOfWeek } from "date-fns";
interface DatesSelectProps {
  currentDate: Date,
  selectedDate: string
  dateMode: string
  disabled: boolean
}

export default function DatesSelect(props: DatesSelectProps) {  
  const curr = new Date(props.currentDate.toString()); // get current date
  // Set the week to start on Monday (weekStartsOn: 1). Use 0 for Sunday.
  const weekStart = startOfWeek(props.currentDate, { weekStartsOn: 1 });
  const datesArray = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  return (
    <select id="date" name="date" defaultValue={props.selectedDate} className="p-1.5 border rounded-md w-full"  disabled={props.disabled}>
        {props.dateMode == "Day" ? 
          <option key = {props.currentDate.toDateString()} value={props.currentDate.toDateString()}>{props.currentDate.toDateString()}</option>
          : datesArray.map((date, index) => (
            <option key = {date.toDateString()} value={date.toDateString()}>{date.toDateString()}</option>
        ))}
    </select>
  );
};