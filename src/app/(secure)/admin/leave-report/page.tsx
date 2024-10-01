"use client"

import { useState,useEffect } from 'react'
import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import { Card,CardContent } from '@/src/components/ui/card'
import { Table,TableHead,TableRow,TableHeader ,TableBody,TableCell} from '@/src/components/ui/table'
import {fetchLeavesByStartEndResource} from "@/actions/leave"
import { Select ,SelectContent,SelectItem,SelectTrigger} from '@/src/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { Button } from '@/src/components/ui/button'
import DatePicker from '@/src/components/leave/date-time-select'
import { fetchAllResourcesName } from '@/src/actions/resource'
type LeaveReportType = {
  description: string;
  duration: number;
  startTime:Date;
  endTime: Date;
  id: string;
  leaveType: string;
  resource: {
    name: string;

  };
  resourceId: string;
  status: string;
};
interface LeaveHistoryReportProps {
  leaveList: LeaveReportType[] | null;
}
// const LeaveTableRow: React.FC = () => {
 
interface LeaveTableRowProps {
  leave: LeaveReportType;
}

interface ResourceNameProps{
  id:string;
  name:string;
}

  const displayDuration = (duration: number): string => {
    if (duration > 8) {
      return `${duration / 8} Days`;
    } else if (duration===8){
      return `${duration / 8} Day`;
 
    }
    return `${duration} Hrs`;
  };


const LeaveTableRow:React.FC<LeaveTableRowProps>=({leave})=>{
  return (<TableRow key={leave.id}>
    <TableCell>{leave.resource.name}</TableCell>
    <TableCell className="text-center">{new Date(leave.startTime).toDateString()}</TableCell>
    <TableCell className="mr-3"><p className="bg-slate-700 text-white rounded-sm text-center whitespace-nowrap text-[10px]">
      {displayDuration(leave.duration)}
    </p>
    </TableCell>
    <TableCell className='text-center'>{new Date(leave.endTime).toDateString()}</TableCell>
    {leave.leaveType === "sickLeave" && <TableCell className=" text-center">Sick</TableCell>}
    {leave.leaveType === "unpaidLeave" && <TableCell className=" text-center">Unpaid</TableCell>}

    {leave.leaveType === "vocationLeave" && <TableCell className=" text-center">Vocation</TableCell>}
    {leave.status === 'approve' && <TableCell className="text-green-700 text-center" >
          approved
        </TableCell> }
        {leave.status === 'pending' && <TableCell className="text-orange-700 text-center" >
          pending
        </TableCell> }
        { leave.status === 'reject' && (
  <TableCell className="text-red-700 text-center">
    rejected
  </TableCell>)}
  </TableRow>)
}


const LeaveHistoryReport:React.FC<LeaveHistoryReportProps>=({leaveList})=>{
console.log({leaveList})
return (
  <Card>
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
    </TableRow>
  </TableHeader>
  <TableBody>
      {/* <LeaveTableRow/> */}
       {leaveList?.map((leave) => (
        <LeaveTableRow key={leave.id} leave={leave} />
      ))}

      
  
  </TableBody>
</Table>
</CardContent>
</Card>
)
}



export default function LeaveReport() {
  const [leaveHistory,setLeaveHistory]=useState<LeaveReportType[]|null>(null)
  const [selectResource,setSelectedResource]=useState<string>("")
  const [resourceList,setResourceList]=useState<ResourceNameProps[]|null>(null)
  const [endDate,setEndDate]=useState<Date|undefined>()

  const [startDate,setStartDate]=useState<Date|undefined>()
  const [partialDay,setPartialDay]=useState<string>("firstHalf")
  const handleFilterDateChange=(date:Date,type:string)=>{
    if (type==="startDate"){
      setStartDate(date)
    } else{
      setEndDate(date)
    }
  }

  const handleFilterSearch=async()=>{
const data=await fetchLeavesByStartEndResource(startDate,endDate,selectResource,new Date().getTimezoneOffset())  
        if (data) setLeaveHistory(data)
         console.log({data,startDate,endDate,selectResource})


  }
  useEffect(()=>{
      const fetchLeaveHistory=async()=>{
        const data=await fetchLeavesByStartEndResource(null,null,"",new Date().getTimezoneOffset())  
        if (data) setLeaveHistory(data)
       console.log({data})
      }
      const fetchAllResourcesNameFunc=async()=>{
        const data=await fetchAllResourcesName()
        if (data) setResourceList(data)
      }
      fetchAllResourcesNameFunc()
      fetchLeaveHistory()
  },[])

  const handleExport= async()=>{
    console.log("hit export")
    if (leaveHistory){
      const { utils, writeFile } = await import('xlsx');

  const ws=utils.json_to_sheet(leaveHistory.map((eachList)=>{
  return {
    "Resource":eachList.resource.name,
    "From":new Date(eachList.startTime).toDateString(),
    "Duration":eachList.duration,
    "To":new Date(eachList.endTime).toDateString(),
    "Leave Type":eachList.leaveType,
    "Action":eachList.status
  }
  }))
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Leave Report"); 
  console.log(wb)
  try{
    writeFile(wb, "Report.xlsx")
    console.log("hide")

  }catch(err){
    console.log(err)
  }
  console.log("UUUUUUUUUU")

  }

}

  
  return (
    <>
      <Title title="Leave Reports"></Title>
      <Container>
      
      <div className="flex my-3">
      <div className=" mx-1">
        <p>Select Resource</p>
      <Select onValueChange={(value)=>setSelectedResource(value)}>
          <SelectTrigger className='w-[34vw]' >
              <SelectValue placeholder="Select by resource" />
            </SelectTrigger>
            <SelectContent>
              {resourceList?.map((resource)=><SelectItem key={resource.id} value={resource.id}>{resource.name}</SelectItem>
)}
         
            </SelectContent>
          </Select>
          </div>
     <div className='mx-1'>
      <p>From</p>
     <DatePicker
            buttonDisable={false}
            onChange={handleFilterDateChange}
            date={startDate}
            type="startDate"
            minDate={undefined}
          />
      </div>     
    
          <div className='mx-1'>
          <p>To</p>
          <DatePicker
            buttonDisable={false}
          
            onChange={handleFilterDateChange}
            date={endDate}
            type="endDate"
            minDate={undefined}
          />
          </div>
             
        
          <Button className='mx-1 bg-blue-600 mt-5' type="button" onClick={handleFilterSearch} >
            Search
          </Button>
           <Button variant="secondary" className='mx-1 mt-5' type="button" onClick={handleExport} >Export</Button>     
        </div>  
    

        <LeaveHistoryReport leaveList={leaveHistory}/>
    
    </Container>
  </>
    
  )
}
