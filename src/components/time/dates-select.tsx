import { format, addDays } from "date-fns";
interface DatesSelectProps {
  currentDate: Date,
  selectedDate: string
  dateMode: string
  disabled: boolean
}

export default function DatesSelect(props: DatesSelectProps) {  
  const curr = new Date(props.currentDate.toString()); // get current date
  const first = props.currentDate.getDate() - props.currentDate.getDay() + 1; // First day is the day of the month - the day of the week  
  const datesArray = Array.from({ length: 7 }, (_, i) => addDays(new Date(curr.setDate(first)), i));
  
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