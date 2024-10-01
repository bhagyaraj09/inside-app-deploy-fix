"use client";
import { useEffect, useState } from "react";
import React from "react";
import Title from '@/components/ui/title';
import { applyLeave } from '@/actions/leave';
import { fetchResourceById } from '@/actions/resource';
import Container from '@/components/ui/container';
import { useSession } from 'next-auth/react';
import { getLeavesByResourceId } from "@/actions/leave";
import {getAllHolidaysDate} from "@/actions/event"
import { LeaveHistoryType } from "@/types";

// import {fetchAllResourcesNames} from "@/actions/resource"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateTimeSelector from '@/src/components/leave/date-time-select';
import { Textarea } from "@/components/ui/textarea";
import DatesSelect from '@/src/components/time/dates-select';
import { Button } from '@/src/components/ui/button';
import LeaveHistory from "@/src/components/leave/leave-history";
import PieChart from "@/src/components/ui/chart";
import { calculateDuration } from "@/src/lib/timeFormat";
import { AlertDialog } from "@/src/components/ui/alert-dialog";
import { HolidaysProp } from "@/types";





export default function Leave() {

const {data:session}=useSession()




const [vocationLeaves, setVocationLeaves] = useState<number>(0);
  const [vocationLeavesConsumed, setVocationLeavesConsumed] = useState<number>(0);
  const [vocationLeavesAvailable, setVocationLeavesAvailable] = useState<number>(0);
  const [sickLeaves, setSickLeaves] = useState<number>(0);
  const [sickLeavesConsumed, setSickLeavesConsumed] = useState<number>(0);
  const [sickLeavesAvailable, setSickLeavesAvailable] = useState<number>(0);
  const [leaveType, setLeaveType] = useState<string>('sickLeave');
  const [isFormFilledLeaveReq,setFormFilledLeaveReq] = useState<boolean>(false)
  const [vocationLeaveNoticePeriod,setVocationLeaveNoticePeriod] =useState<number>(2)
  const [leavesHistory, setLeavesHistory] = useState<LeaveHistoryType[] | undefined>(undefined);
  const [durationInForm,setDurationInForm]=useState<number>(0)
  const dataVocation = {
    labels: ["leaves Consumed", "Leaves Available"],
    values: [vocationLeavesConsumed, vocationLeavesAvailable],
  };

  const dataSick = {
    labels: ["leaves Consumed", "Leaves Available"],
    values: [sickLeavesConsumed, sickLeavesAvailable],
  };

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startDatePartial,setStartDatePartial]=useState<string>("firstHalf")
  const [endDate, setEndDate] = useState<Date>();
  const [endDatePartial,setEndDatePartial]=useState<string>("secondHalf")

  const [description, setDescription] = useState<string>("");
  const [holidays,setHolidays]=useState<HolidaysProp[]|null>(null)

  const handleLeaveTypeChange = (e:string) => {
    const minCausualLeaveDuration=new Date().getTime()+vocationLeaveNoticePeriod*24*60*60*1000
    if (e==="vocationLeave" && minCausualLeaveDuration>startDate.getTime()){
      console.log("line92",minCausualLeaveDuration)
      if (new Date(minCausualLeaveDuration).getDay()!==6 && new Date(minCausualLeaveDuration).getDay()!==0){
        const minCausualLeaveDurationVal=minCausualLeaveDuration
        setStartDate(new Date(minCausualLeaveDurationVal))
      setEndDate(new Date(minCausualLeaveDurationVal))
      setEndDatePartial("secondHalf")
      setDurationInForm(8)
      } else {
      if (new Date(minCausualLeaveDuration).getDay()===6){
        const minCausualLeaveDurationVal=minCausualLeaveDuration+(2*24*60*60*1000)
        setStartDate(new Date(minCausualLeaveDurationVal))
      setEndDate(new Date(minCausualLeaveDurationVal))
      setEndDatePartial("secondHalf")
      setDurationInForm(8)
            
      } else{
        const minCausualLeaveDurationVal=minCausualLeaveDuration+(1*24*60*60*1000)
        setStartDate(new Date(minCausualLeaveDurationVal))
      setEndDate(new Date(minCausualLeaveDurationVal))
      setEndDatePartial("secondHalf")
      setDurationInForm(8)

        
      }
      
    }

    } else if(e==="vocationLeave"){
      setStartDate(new Date(minCausualLeaveDuration))
      if (endDate&&minCausualLeaveDuration>endDate.getTime()){
        setEndDate(new Date(endDate.getTime()+minCausualLeaveDuration-startDate.getTime()))
        setDurationInForm(8)
      }

    }
    else{
      setStartDate(new Date())
    }
    setLeaveType(e)

  };

  const displayDuration = (duration: number): string => {
    if (duration > 8) {
      return `${duration / 8} D`;
    } else if (duration===8){
      return `${duration / 8} D`;
 
    }
    return `${duration} Hrs`;
  };


  const handlePartialChange=(e:string,actionType:string)=>{
    if (actionType === "startDate") {
      if (endDate){
        const durationVal = calculateDuration(startDate,endDate , e, endDatePartial,holidays);

      setDurationInForm(durationVal)

      }
      
      setStartDatePartial(e);
    } else if (actionType === "endDate") {
      if (endDate){
        const durationVal = calculateDuration(startDate,endDate , startDatePartial, e,holidays);

      setDurationInForm(durationVal)

      }
      else{
        setDurationInForm(0)
      }
      setEndDatePartial(e);
    }
  }
const calculateMinForEndDate=(startDate:Date):Date=>{
  if (leaveType==="vocationLeave"){
    if (startDate){
      return startDate
    } else{
      return new Date(new Date().getTime()+(vocationLeaveNoticePeriod*24*60*60*1000))
    }
  } else{
    if (startDate){
      return startDate
    } else{

      return new Date()
    }
  }
}

  const handleLeaveRequestChange = (e: Date, actionType: string) => {
    if (actionType === "startDate") {
      
      if (endDate&&endDate.getTime()<e.getTime()){
          setEndDate(e)
          setEndDatePartial("secondHalf")
          setDurationInForm(8)

      }
      else if (endDate){
       
        const durationVal = calculateDuration(e,endDate , startDatePartial, endDatePartial,holidays);
      //  {console.log("******************",durationVal,startDatePartial,endDatePartial,startDate,endDate)}
        setDurationInForm(durationVal)
      }
      setStartDate(e);
    } else if (actionType === "endDate") {
      setEndDate(e);
      const durationVal = calculateDuration(startDate,e , startDatePartial, endDatePartial,holidays);

        setDurationInForm(durationVal)
    }
    // else if (actionType==="description"){
    //     setDescription(e.target.value)
    // }
  };

 

  useEffect(()=>{
    if (startDate && endDate && description !== ""){
      setFormFilledLeaveReq(true)
    }
   
  },[startDate,endDate,description,leaveType,startDatePartial,endDatePartial]);

  const handleLeaveRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (startDate && endDate && description !== "") {
      console.log({startDate,endDate})
      const durationVal=calculateDuration(startDate,endDate,startDatePartial,endDatePartial,holidays)
      console.log({durationVal})
      if (session && session.user && session.user.id){              
        await applyLeave(session.user.id, startDate, endDate, description,durationVal,startDatePartial,endDatePartial,leaveType);
        setDescription("")
        setEndDate(undefined)
        setDurationInForm(0)
      try{
  const data = await fetchResourceById(session?.user.id);
        if (data) {
          const { vocationLeaves, vocationLeavesAvailable, vocationLeavesConsumed, sickLeaves, sickLeavesConsumed, sickLeavesAvailable ,vocationLeaveNoticePeriod} = data;
          setVocationLeaves(vocationLeaves);
          setVocationLeavesAvailable(vocationLeavesAvailable);
          setVocationLeavesConsumed(vocationLeavesConsumed); // Fixing this to use vocationLeavesConsumed
          setSickLeaves(sickLeaves);
          setSickLeavesAvailable(sickLeavesAvailable);
          setSickLeavesConsumed(sickLeavesConsumed);
          setVocationLeaveNoticePeriod(vocationLeaveNoticePeriod)
        }
       
            const leaveHistoryData = await getLeavesByResourceId(session.user.id);
            if (leaveHistoryData) {
                setLeavesHistory(leaveHistoryData);
            }
          } 
        
    
      
       catch (error) {
        console.error('Failed to fetch data:', error);
      }



  
        console.log("Added Successfully");
      } else{
        alert("Refresh Page")
      }
     
    } else {
      // console.log(startDate && endDate && description !== ""&& endDate.getTime() - startDate.getTime() >= 0)
      if (startDate&&endDate){
        console.log(endDate.getTime() - startDate.getTime(), {startDate,endDate})
      }
      alert("please fill all the details");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log({session})
        if (session?.user.id){

        
        const data = await fetchResourceById(session.user.id);
        console.log("data ************************",data)
        if (data) {
          const { vocationLeaves, vocationLeavesAvailable,vocationLeaveNoticePeriod ,vocationLeavesConsumed, sickLeaves, sickLeavesConsumed, sickLeavesAvailable } = data;
          setVocationLeaves(vocationLeaves);
          setVocationLeavesAvailable(vocationLeavesAvailable);
          setVocationLeavesConsumed(vocationLeavesConsumed); // Fixing this to use vocationLeavesConsumed
          setSickLeaves(sickLeaves);
          setSickLeavesAvailable(sickLeavesAvailable);
          setSickLeavesConsumed(sickLeavesConsumed);
                    setSickLeavesConsumed(sickLeavesConsumed);
                    setVocationLeaveNoticePeriod(vocationLeaveNoticePeriod)



        }
       
            const leaveHistoryData = await getLeavesByResourceId(session.user.id);
            if (leaveHistoryData) {
                setLeavesHistory(leaveHistoryData);
            }
          } 
        
    
      
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }


    };
    fetchData();
    console.log("BBBBBBBBBBBBBBBBBBBBB")
  }, [session?.user.email]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const data: HolidaysProp[]|undefined = await getAllHolidaysDate(); 
       if (data){
        setHolidays(data); // 

       }
      } catch (err) {
        console.error("Error fetching holidays:", err);
      }
    };
  
    fetchHolidays();
  }, []);
  


  return (
    <>
      <Title title="Leave"></Title>
      <Container className="flex-col flex px-5">
    
          {/* Pie charts section showing vocation leaves and accured leaves information */}

        <div className="flex justify-start items-center">
          <div className="grid mb-4 gap-4 md:grid-cols-2">
            <div className="flex justify-center items-center">
              <PieChart data={dataVocation} title="Vocation" />
              <div>
                <p className="text-xs ml-4 mb-1 font-bold">Leaves Accured: {vocationLeaves} Hrs</p>
                <p className="text-xs ml-4">
                  <span className="w-1 h-1 bg-blue-900 text-blue-900 mr-1 text-xs mb-2">&quot; &quot;</span>
                  Consumed {vocationLeavesConsumed} Hrs
                </p>
                <p className="text-xs ml-4">
                  <span className="w-1 h-1 bg-[#F0F0F2] text-[#F0F0F2] mr-1 text-xs">&quot; &quot;</span>
                  Available {vocationLeavesAvailable} Hrs
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <PieChart data={dataSick} title="Sick" />
              <div>
                <p className="text-xs ml-4 mb-1 font-bold">Total Leaves: {sickLeaves} Hrs</p>
                <p className="text-xs ml-4">
                  <span className="w-1 h-1 bg-blue-900 text-blue-900 mr-1 text-xs mb-2">&quot; &quot;</span>
                  Consumed {sickLeavesConsumed} Hrs
                </p>
                <p className="text-xs ml-4">
                  <span className="w-1 h-1 bg-[#F0F0F2] text-[#F0F0F2] mr-1 text-xs">&quot; &quot;</span>
                  Available {sickLeavesAvailable} Hrs
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Leave request form */}
        <Card className="mb-4">
          <CardContent>
            <h1 className="font-semibold text-blue-900 text-lg py-3">Request Leave</h1>
            <form onSubmit={(e) => handleLeaveRequestSubmit(e)}>
              <div className="flex flex-row flex-wrap space-x-[0.40rem]">
                <div className="mb-2">
                  <CardTitle className="text-sm font-medium">Leave Type</CardTitle>
                  <CardContent className="p-0">
                    <Select onValueChange={handleLeaveTypeChange} value={leaveType}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Leave Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vocationLeave">Vocation Leave</SelectItem>
                        <SelectItem value="sickLeave">Sick Leave</SelectItem>
                        <SelectItem value="unpaidLeave">Unpaid Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </div>
                
         
                
                <div>
                  <CardTitle className="text-sm font-medium">From</CardTitle>
                  <CardContent className="p-0">
                    <DateTimeSelector
                      onChange={handleLeaveRequestChange}
                      date={startDate}
                      type="startDate"
                      minDate={leaveType==="vocationLeave"?new Date(new Date().getTime()+(vocationLeaveNoticePeriod*24*60*60*1000)):new Date()}
                      partialDay={startDatePartial}
                      setPartialDay={setStartDatePartial}
                      onPartialChange={handlePartialChange}
                    />
                  </CardContent>
                </div>
                <div className="pt-6">
                <p className="border border-solid rounded-sm  p-1 whitespace-nowrap text-[10px]">
            {displayDuration(durationInForm)}
          </p>
                </div>
                
                <div>
                  <CardTitle className="text-sm font-medium">To</CardTitle>
                  <CardContent className="p-0">
                    <DateTimeSelector
                      onChange={handleLeaveRequestChange}
                      date={endDate}
                      type="endDate"
                      minDate={calculateMinForEndDate(startDate)}
                      partialDay={endDatePartial}
                      setPartialDay={setEndDatePartial}
                      onPartialChange={handlePartialChange}
                    />
                  </CardContent>
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">Reason for Leave</CardTitle>
                  <CardContent className="p-0">
                    <Textarea className="w-60 h-9" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </CardContent>
                </div>
                <div className="pt-5">
                {/* {!isFormFilledLeaveReq} */}
                <Button className="bg-blue-600" type="submit" disabled={!isFormFilledLeaveReq}>          
                            Request Leave
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* Leave history */}
        <LeaveHistory leavesHistory={leavesHistory} setLeavesHistory={setLeavesHistory} holidaysList={holidays} vocationLeaveNoticePeriod={vocationLeaveNoticePeriod}/>
      </Container>
    </>
  );
}
