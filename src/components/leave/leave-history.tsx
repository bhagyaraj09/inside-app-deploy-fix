import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BorderDottedIcon, Cross2Icon, CheckIcon } from "@radix-ui/react-icons";
import DatePicker from "@/components/leave/date-time-select";
import { getLeavesByResourceId, cancelLeaveRequestById } from "@/src/actions/leave";
import SelectTable from "@/components/leave/leave-select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchResource } from "@/src/actions/resource";
import { updateLeavesByLeaveId } from "@/src/actions/leave";
import { calculateDuration } from "@/src/lib/timeFormat";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { LeaveHistoryType,HolidaysProp } from '@/types';



 
interface LeaveHistoryPropsType {
  leavesHistory: LeaveHistoryType[] | undefined;
  setLeavesHistory: React.Dispatch<React.SetStateAction<LeaveHistoryType[] | undefined>>;
  holidaysList:HolidaysProp[]| null 
  vocationLeaveNoticePeriod:number
}

interface EditLeaveHistoryType {
  selectedLeaveId: string;
  isEdit: boolean;
}


export function LeaveHistoryDataTable({ leavesHistory, setLeavesHistory,holidaysList,vocationLeaveNoticePeriod }: LeaveHistoryPropsType) {
  const [editObj, setEditObj] = useState<EditLeaveHistoryType>({
    selectedLeaveId: "",
    isEdit: false,
  });

  {console.log({leavesHistory})}

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [leaveIdToCancel, setLeaveIdToCancel] = useState<string | null>(null);

  const handleEditDeleteOption = (option: string, leaveId: string) => {
    if (option === "Cancel") {
      setLeaveIdToCancel(leaveId);
      setShowAlertDialog(true); // Show the AlertDialog
    } else {
      setEditObj({
        selectedLeaveId: leaveId,
        isEdit: true,
      });
    }
  };

  const handleConfirmCancel = async () => {
    if (leaveIdToCancel) {
      try {
        await cancelLeaveRequestById(leaveIdToCancel);
        setLeavesHistory(prev =>
          prev?.filter(leave =>
            leave.id !== leaveIdToCancel
          )
        );
      } catch (error) {
        console.error("Failed to cancel leave request:", error);
        alert("Failed to cancel leave request");
      }
      setLeaveIdToCancel(null);
      setShowAlertDialog(false);
    }
  };

  const handleCancelAlertDialog = () => {
    setShowAlertDialog(false);
    setLeaveIdToCancel(null);
  };

  const LeaveHistoryTableRow = ({ leaves ,vocationLeaveNoticePeriod}: { leaves: LeaveHistoryType ,vocationLeaveNoticePeriod:number}) => {
    const [descriptionValue, setDescriptionValue] = useState<string>(leaves.description);
    const [startDate, setStartDate] = useState<Date>(leaves.startTime);
    const [endDate, setEndDate] = useState<Date>(leaves.endTime);
    const [duration, setDuration] = useState<number>(leaves.duration);
    const [startDatePartial, setStartDatePartial] = useState<string>(leaves.startDatePartial);
    const [endDatePartial, setEndDatePartial] = useState<string>(leaves.endDatePartial);
    const [leaveType, setLeaveType] = useState<string>(leaves.leaveType);

    const handleLeaveRequestChange = (e: Date, actionType: string) => {
      if (actionType === "startDate") {
        if (endDate && endDate.getTime() < e.getTime()) {
          setDuration(8);
          setEndDate(e);
          setEndDatePartial("secondHalf");
        } else {
          const durationVal = calculateDuration(e, endDate, startDatePartial, endDatePartial,holidaysList);
          setDuration(durationVal);
        }
        setStartDate(e);
      } else if (actionType === "endDate") {
        setEndDate(e);
        
        const durationVal = calculateDuration(startDate, e, startDatePartial, endDatePartial,holidaysList);
        setDuration(durationVal);
      } else {
        const durationVal = calculateDuration(startDate, endDate, startDatePartial, endDatePartial,holidaysList);
        setDuration(durationVal);
      }
    };

    const displayDuration = (duration: number): string => {
      if (duration > 8) {
        return `${duration / 8} Days`;
      } else if (duration===8){
        return `${duration / 8} Day`;
   
      }
      return `${duration} Hrs`;
    };
  

    const handlePartialChange=(value:string,type:string):void => {
      if (type === "startDate") {
      
        setStartDatePartial(value);
        const durationVal = calculateDuration(new Date(startDate), new Date(endDate), value, endDatePartial,holidaysList);
        setDuration(durationVal);
      } else {
        const durationVal = calculateDuration(new Date(startDate), new Date(endDate), startDatePartial, value,holidaysList);
        setDuration(durationVal);

        setEndDatePartial(value);
      }
     

    }

    const handleEditSubmitLeaveHistory = async () => {
      try {
        await updateLeavesByLeaveId(leaves.id, startDate, endDate, descriptionValue, duration, leaveType);
        setLeavesHistory(prev => prev?.map(eachLeave => {
          if (eachLeave.id === leaves.id) {
            return {
              id: leaves.id,
              resourceId: leaves.resourceId,
              startTime: startDate,
              endTime: endDate,
              status: "pending",
              description: descriptionValue,
              duration: duration,
              leaveType: leaveType,
              startDatePartial: startDatePartial,
              endDatePartial: endDatePartial,
            };
          }
          return eachLeave;
        }));
        setEditObj({
          selectedLeaveId: "",
          isEdit: false,
        });
      } catch (err) {
        alert("Something went wrong");
      }
    };
    const handleLeaveTypeChange = (e:string) => {
      const minCausualLeaveDuration=new Date().getTime()+vocationLeaveNoticePeriod*24*60*60*1000
      if (e==="vocationLeave" && minCausualLeaveDuration>startDate.getTime()){
        console.log("line92",minCausualLeaveDuration)
        if (new Date(minCausualLeaveDuration).getDay()!==6 && new Date(minCausualLeaveDuration).getDay()!==0){
          const minCausualLeaveDurationVal=minCausualLeaveDuration
          setStartDate(new Date(minCausualLeaveDurationVal))
        setEndDate(new Date(minCausualLeaveDurationVal))
        setEndDatePartial("secondHalf")
        setDuration(8)
        } else {
        if (new Date(minCausualLeaveDuration).getDay()===6){
          const minCausualLeaveDurationVal=minCausualLeaveDuration+(2*24*60*60*1000)
          setStartDate(new Date(minCausualLeaveDurationVal))
        setEndDate(new Date(minCausualLeaveDurationVal))
        setEndDatePartial("secondHalf")
        setDuration(8)
              
        } else{
          const minCausualLeaveDurationVal=minCausualLeaveDuration+(1*24*60*60*1000)
          setStartDate(new Date(minCausualLeaveDurationVal))
        setEndDate(new Date(minCausualLeaveDurationVal))
        setEndDatePartial("secondHalf")
        setDuration(8)
  
          
        }
        
      }
  
      } else if(e==="vocationLeave"){
        setStartDate(new Date(minCausualLeaveDuration))
        if (endDate&&minCausualLeaveDuration>endDate.getTime()){
          setEndDate(new Date(endDate.getTime()+minCausualLeaveDuration-startDate.getTime()))
          setDuration(8)
        }
  
      }
      else{
        setStartDate(new Date())
      }
      setLeaveType(e)
  
    };
  

    // useEffect(() => {
    //   const durationVal = calculateDuration(startDate, endDate, startDatePartial, endDatePartial,holidaysList);
    //   setDuration(durationVal);
    // }, [startDatePartial, endDatePartial]);

    return (
      <TableRow key={leaves.id} className="text-xs ">
        <TableCell className="p-1">
          <Select onValueChange={(value) =>{
            handleLeaveTypeChange(value)
             setLeaveType(value)}} value={leaveType} disabled={!(editObj.isEdit && editObj.selectedLeaveId === leaves.id)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Leave Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vocationLeave">Vocation Leave</SelectItem>
              <SelectItem value="sickLeave">Sick Leave</SelectItem>
              <SelectItem value="unpaidLeave">Unpaid Leave</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell className="font-medium p-0">
          <DatePicker
            buttonDisable={!(editObj.isEdit && editObj.selectedLeaveId === leaves.id)}
            partialDay={startDatePartial}
            setPartialDay={setStartDatePartial}
            onChange={handleLeaveRequestChange}
            date={startDate}
            type="startDate"
            minDate={new Date()}
            onPartialChange={handlePartialChange}
          />
        </TableCell>
        <TableCell className={!(editObj.isEdit && editObj.selectedLeaveId === leaves.id) ? "opacity-50 p-0" : "opacity-100 p*0"}>
        <p className="border border-solid rounded-sm  p-1 whitespace-nowrap text-[10px]">
        {displayDuration(duration)}
          </p>
        </TableCell>
        <TableCell className='p-0'>
          <DatePicker
            buttonDisable={!(editObj.isEdit && editObj.selectedLeaveId === leaves.id)}
            onChange={handleLeaveRequestChange}
            partialDay={endDatePartial}
            setPartialDay={setEndDatePartial}
            onPartialChange={handlePartialChange}


            date={endDate}
            type="endDate"
            minDate={startDate}
          />
        </TableCell>
        <TableCell>
          <Textarea
            className="w-60 h-9"
            onChange={(e) => setDescriptionValue(e.target.value)}
            disabled={!(editObj.isEdit && editObj.selectedLeaveId === leaves.id)}
            value={descriptionValue}
          />
        </TableCell>
      
        {leaves.status === 'approve' && <TableCell className="text-green-700 p-0" >
          approved
        </TableCell> }
        {leaves.status === 'pending' && <TableCell className="text-orange-700 p-0" >
          pending
        </TableCell> }
        { leaves.status === 'reject' && (
  <TableCell className="text-red-700 p-0">
    rejected
  </TableCell>)}
  { leaves.status === 'canceled' && (
    <TableCell className="text-red-700 p-0">
      canceled
    </TableCell>
)}
        {leaves.status === "pending" && editObj.isEdit && editObj.selectedLeaveId === leaves.id ? (
          <TableCell className="flex items-center h-[3.2rem] p-0">
            <button
              className="bg-transparent border-none outline-none p-0 ml-1"
              type="button"
              onClick={handleEditSubmitLeaveHistory}
            >
              <CheckIcon />
            </button>
            <button
              className="bg-transparent border-none outline-none p-0 ml-1"
              onClick={() =>
                setEditObj({
                  selectedLeaveId: "",
                  isEdit: false,
                })
              }
            >
              <Cross2Icon />
            </button>
          </TableCell>
        ) : (
          <TableCell className="w-[55px] p-0">
           {leaves.status==="pending"&& <SelectTable onSelect={handleEditDeleteOption} leaveId={leaves.id} isNotDisabled={leaves.status === "pending"} />}
          </TableCell>
        )}
      </TableRow>
    );
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Leave Type</TableHead>
            <TableHead className="text-center">From</TableHead>
            <TableHead></TableHead>
            <TableHead className='text-center'>To</TableHead>
            <TableHead>Reason for Leave</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leavesHistory?.map((leave) => (
            <LeaveHistoryTableRow key={leave.id} leaves={leave} vocationLeaveNoticePeriod={vocationLeaveNoticePeriod}/>
          ))}
        </TableBody>
      </Table>
      {showAlertDialog && (
        <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this leave request? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelAlertDialog}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmCancel}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

const LeaveHistory = ({ leavesHistory, setLeavesHistory,holidaysList,vocationLeaveNoticePeriod }: LeaveHistoryPropsType) => (
  <Card>
    <CardContent>
      <h1 className=" font-semibold text-blue-900 text-lg py-3">Leave History</h1>
      <LeaveHistoryDataTable leavesHistory={leavesHistory} setLeavesHistory={setLeavesHistory} holidaysList={holidaysList} vocationLeaveNoticePeriod={vocationLeaveNoticePeriod}/>
    </CardContent>
  </Card>
);

export default LeaveHistory;
