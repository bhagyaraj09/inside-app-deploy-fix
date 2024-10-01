"use client";
import Title from '@/components/ui/title';
import Container from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { TableRow, Table, TableBody, TableHeader, TableHead, TableCell ,TableFooter,TableCaption} from '@/src/components/ui/table';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { fetchAllLeaves, submitLeaveForApproval } from "@/actions/leave";
import { Button } from '@/components/ui/button';
import { BorderDottedIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { set } from 'date-fns';

type LeaveRequestType = {
  createdAt: Date;
  description: string;
  duration: number;
  endDatePartial: string;
  endTime: Date;
  id: string;
  leaveType: string;
  resource: {
    name: string;
    vocationLeavesAvailable:number;
    sickLeavesAvailable:number;
    sickLeavesConsumed:number;
    vocationLeavesConsumed:number;

  };
  resourceId: string;
  startDatePartial: string;
  startTime: Date;
  status: string;
};

interface LeaveRequestContentProps {
  value: string;
  title: string;
  leavesList: LeaveRequestType[] | null;
  setAllLeaveRequest: Dispatch<SetStateAction<LeaveRequestType[] | null>>;
}

interface EditDropdownProps {
  onSelect: (leaveId: string) => void;
  leaveId: string;
}

interface SelectFeatureLeavePropType {
  leaveId: string;
  leaveTypeVal: string;
  setLeaveTypeVal: Dispatch<SetStateAction<string>>;
}

interface LeaveTableRowProps {
  leave: LeaveRequestType;
  selectedLeaveId: string;
  onEditLeaveApproval: (status: string, leaveTypeVal: string, leaveId: string,duration:number,sickLeaveAvailable:number,sickLeavesConsumed:number,vocationLeaveAvailable:number,vocationLeavesConsumed:number) => void;
  value:string
  setSelectedLeaveId: Dispatch<SetStateAction<string>>;
}

const LeaveTableRow: React.FC<LeaveTableRowProps> = ({ leave, selectedLeaveId, onEditLeaveApproval ,value,setSelectedLeaveId}) => {
  const [leaveTypeVal, setLeaveTypeVal] = useState(leave.leaveType);

  const handleSubmitApproval = (status: string) => {
    try {
      onEditLeaveApproval(status, leaveTypeVal, leave.id,leave.duration,leave.resource.sickLeavesAvailable,leave.resource.sickLeavesConsumed,leave.resource.vocationLeavesAvailable,leave.resource.vocationLeavesConsumed);
    } catch (err) {
      console.log(err);
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

  return (
    <>
    <TableRow key={leave.id} className='border-none'>
      <TableCell><p className=" text-base">{leave.resource.name}</p>
    <p className="text-[12px] font-semibold text-slate-500 ">
        Leaves: {Math.floor(leave.resource.vocationLeavesAvailable/8)} Vocation , {Math.floor(leave.resource.sickLeavesAvailable/8)} Sick 
      </p>
      </TableCell>
      <TableCell className="text-center">{new Date(leave.startTime).toDateString()}</TableCell>
      <TableCell className="mr-3"><p className="bg-slate-700 text-white rounded-sm text-center whitespace-nowrap text-[10px]">
            {displayDuration(leave.duration)}
          </p>
          </TableCell>
      <TableCell className='text-center'>{new Date(leave.endTime).toDateString()}</TableCell>

      {leave.id === selectedLeaveId ? (
        <TableCell className='text-center'>
          <SelectFeatureLeaveType leaveId={leave.id} leaveTypeVal={leaveTypeVal} setLeaveTypeVal={setLeaveTypeVal} />
        </TableCell>
      ) : (
        <>
        {leave.leaveType === "sickLeave" && <TableCell className="w-[150px] text-center">Sick</TableCell>}
        {leave.leaveType === "vocationLeave" && <TableCell className="w-[150px] text-center">Vocation</TableCell>}
        {leave.leaveType === "unpaidLeave" && <TableCell className="w-[150px] text-center">Unpaid</TableCell>}
      </>
      )}

     {value==="leaveRequest" && <TableCell>
        <Button className='mr-1 bg-blue-600' onClick={() => handleSubmitApproval("approve")}>Approve</Button>
        <Button variant='secondary' onClick={() => handleSubmitApproval("reject")}>Reject</Button>
      </TableCell>} 
      {value!=="pending"&&<>{leave.status==="approve"&& <TableCell className="text-green-700">approved</TableCell>} {leave.status==="reject"&& <TableCell className="text-red-700">rejected</TableCell>}</>}

      <TableCell>
        {leave.status === "pending" && leave.id !== selectedLeaveId && (
          <DropDownMenuValues onSelect={() => setSelectedLeaveId(leave.id)} leaveId={leave.id} />
        )}
      </TableCell>
        
    </TableRow>
    <TableRow>
    <TableCell colSpan={8}>
   
    <p className="text-[12px] font-semibold text-slate-500 bg-slate-50 p-2 ">
    Reason: {leave.description}  
      </p>
 </TableCell>

    </TableRow>
    </>
  );
};

const DropDownMenuValues: React.FC<EditDropdownProps> = ({ onSelect, leaveId }) => (
  <DropdownMenu>
    <DropdownMenuTrigger style={{ border: "none", outline: "none" }} disabled={false}>
      <BorderDottedIcon />
    </DropdownMenuTrigger>
    <DropdownMenuContent style={{ minWidth: "75px", position: "relative" }}>
      <DropdownMenuItem className="text-xs flex space-between" onClick={() => onSelect(leaveId)}>Edit</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const SelectFeatureLeaveType: React.FC<SelectFeatureLeavePropType> = ({ leaveId, leaveTypeVal, setLeaveTypeVal }) => {
  return (
    <Select value={leaveTypeVal} onValueChange={(value) => setLeaveTypeVal(value)}>
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="Leave Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="vocationLeave">Vacation</SelectItem>
        <SelectItem value="sickLeave">Sick</SelectItem>
        <SelectItem value="unpaidLeave">Unpaid</SelectItem>
      </SelectContent>
    </Select>
  );
};

const LeaveRequestContent: React.FC<LeaveRequestContentProps> = ({ value, title, leavesList, setAllLeaveRequest }) => {
  const [selectedLeaveId, setSelectedLeaveId] = useState<string>("");

  const handleEditLeaveApproval = async (status: string, leaveTypeVal: string, leaveId: string,duration:number,sickLeaveAvailable:number,sickLeavesCosumed:number,vocationLeaveAvailable:number,vocationLeavesConsumed:number) => {
    
    if (status==="approve"){
      console.log("approve hit",status,vocationLeavesConsumed)
      if (leaveTypeVal==="vocationLeave"){
        console.log({vocationLeaveAvailable,duration})
        vocationLeaveAvailable=vocationLeaveAvailable-(duration);
        vocationLeavesConsumed=vocationLeavesConsumed+(duration); 
  }else if (leaveTypeVal==="sickLeave"){
    sickLeaveAvailable=sickLeaveAvailable-(duration);
    sickLeavesCosumed=sickLeavesCosumed+(duration); 

  }

    }
   
    console.log({duration,sickLeavesCosumed,vocationLeavesConsumed,})

    await submitLeaveForApproval(status, leaveTypeVal, leaveId,sickLeaveAvailable,sickLeavesCosumed,vocationLeaveAvailable,vocationLeavesConsumed);
    setAllLeaveRequest((prev) => prev ? prev.filter((leave) => leave.id !== leaveId) : null);
  };

  return (
      <Card >
        <CardHeader className='text-lg font-medium'>
          {title}
          {value === "leaveRequest" && <CardDescription className='text-[12px] '>{`You have ${leavesList?.length} notifications`}</CardDescription>}
        </CardHeader>
        {leavesList && leavesList.length > 0 && (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead >Resource</TableHead>
                  <TableHead className='text-center'>From</TableHead>
                  <TableHead className='w-[55px]'></TableHead>
                  <TableHead className='text-center' >To</TableHead>
                  <TableHead className='text-center'>Leave Type</TableHead>
                  <TableHead className='pl-14' >Action</TableHead>
                  <TableHead className='w-[55px]'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leavesList.map((leave) => (
                  <LeaveTableRow
                    key={leave.id}
                    leave={leave}
                    selectedLeaveId={selectedLeaveId}
                    onEditLeaveApproval={handleEditLeaveApproval}
                    value={value}

                    setSelectedLeaveId={setSelectedLeaveId}
                  />
                  
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>
  );
};

export default function ApproveLeave() {
  const [leaveRequest, setAllLeaveRequest] = useState<LeaveRequestType[] | null>(null);
  const [leavesHistory,setLeavesHistory]=useState<LeaveRequestType[] | null>(null);
  useEffect(() => {
    const fetchAllLeavesFunc = async () =>{   
         try {
      const data = await fetchAllLeaves();
      console.log(data)
      if (data){
        const LeavePendingData=data.filter(leave => leave.status==="pending");
        const LeaveHistoryData=data.filter((leave) => leave.status==="approve"||leave.status==="reject") 
        setLeavesHistory(LeaveHistoryData) 
        setAllLeaveRequest(LeavePendingData)
      }
      else{
        setLeavesHistory([]) 
        setAllLeaveRequest([])
      }
    } catch (err) {
      console.log(err);
    }
    }
  fetchAllLeavesFunc();
}, []);

return (
  <>
    <Title title="Approve Leave" />
    <Container>
     

        <LeaveRequestContent
          value="leaveRequest"
          title="Leave Request"
          leavesList={leaveRequest}
          setAllLeaveRequest={setAllLeaveRequest}
        />
       
    </Container>
  </>
);
}

