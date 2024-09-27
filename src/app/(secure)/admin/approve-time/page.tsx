'use client'

import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import { Card, CardContent,} from "@/components/ui/card"
import { SOWResource, Service, Timesheet, Resource } from '@/types';
import { Button } from "@/components/ui/button"
import { WeekSelector } from "@/components/time/week-selector"
import { SetStateAction, useEffect, useState } from "react";
import { getAllResources } from '@/src/actions/resource';
import ResourcesSelect from '@/src/components/time/resources-select';
import TimeApprovalForm from '@/src/components/time/time-approval-form';
import { getTimeForApproval } from '@/src/actions/timeSheet';

export default function ApproveTime() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceId, setResourceId] = useState("");
  const [dateMode, setDateMode] = useState("Day");
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);  
  const [totalHours, setTotalHours] = useState(0.0);

  const handleNext = () => {    
    dateMode == "Day" ? setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1))) : setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  }
  const handlePrev = () => {
    dateMode == "Day" ? setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1))) : setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  }
  useEffect(() => {    
    const getResources = async() => {
      try{
        const response =  await getAllResources(); 
        setResources(response)
        setResourceId(response[0].id);
      } catch(error) {
        console.log(error);
      }
    }    
    getResources();          
  }, []);
  useEffect(() => {    
    const getTimesheets = async() => {
      try{
        const curr = new Date(currentDate.toString()); // get current date
        const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
        const response =  await getTimeForApproval(new Date().getTimezoneOffset(),resourceId, dateMode == "Day" ? new Date(curr) : new Date(curr.setDate(first)), dateMode == "Day" ? new Date(curr) : new Date(curr.setDate(first + (dateMode == "Day" ? 0 : 6)))); // last day is the first day + 6
        setTimesheets(response);
        setTotalHours (response.reduce((total, timesheet) => total + parseFloat(timesheet.hours?? 0), 0));     
      } catch(error) {
        console.log(error);
      }  
    }
    getTimesheets();
  }, [currentDate, dateMode, resourceId]);
  return (
    <>
      <Title title="Approve Time"></Title>
      <Container>
        <div className="p-2">                    
            <div className="items-center justify-between">
              <div className="flex items-center pb-4">                    
                <Button variant="outline" size="icon" onClick={handlePrev}>
                  <i className="fa-solid fa-arrow-left"></i>
                </Button>
                <WeekSelector currentDate={currentDate.toString()} dateMode={dateMode} setDateMode={setDateMode} />
                <Button variant="outline" size="icon" onClick={handleNext}>
                  <i className="fa-solid fa-arrow-right"></i>
                </Button>
              </div>
            </div>
            <Card>
              <CardContent>                
                <div className="items-center justify-between mb-4">
                  <div className="flex items-center pt-5">
                    <span className='mr-2  font-medium'>Resource:</span>
                    <span className='w-60 mr-2'>
                      <ResourcesSelect resources={resources} disabled={false} setResourceId={setResourceId}/>
                      
                    </span>
                  </div>
                </div>
                <TimeApprovalForm timesheets={timesheets} currentDate={currentDate} setTimesheets={setTimesheets} setTotalHours={setTotalHours} resourceId={''} dateMode={dateMode} />
              </CardContent>
            </Card>
        </div>
      </Container>
    </>
  )
}
