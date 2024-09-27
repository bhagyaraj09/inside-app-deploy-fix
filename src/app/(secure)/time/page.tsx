'use client'
import Conditional from "@/components/custom/conditional"
import { WeekSelector } from "@/components/time/week-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent,} from "@/components/ui/card"
import { SOWResource, Service, Timesheet, Resource } from '@/types';
import { getProjectsByResource } from '@/src/actions/sowResource'
import { getServicesData } from '@/src/actions/service';
import { fetchResource } from '@/src/actions/resource'
import { fetchTime, submitTimeForApproval } from '@/src/actions/timeSheet'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import TimeForm from '@/src/components/time/time-form'
import TimeFormHeader from "@/src/components/time/time-form-header"

export default function Time() {
  const { data: session, status } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<SOWResource[]>([]);
  const [resource, setResource] = useState<Resource>();
  const [selectedService, setSelectedService] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateMode, setDateMode] = useState("Day");
  const [totalHours, setTotalHours] = useState(0.0);
    
  const handleSubmitforApproval = async() => {
    if(resource?.id){
      const curr = new Date(currentDate.toString()); // get current date
      const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week      
      const response =  await submitTimeForApproval(new Date().getTimezoneOffset(), resource?.id ?? "", dateMode == "Day" ? new Date(curr) : new Date(curr.setDate(first)), dateMode == "Day" ? new Date(curr) : new Date(curr.setDate(first + (dateMode == "Day" ? 0 : 6))));
      setTimesheets(response);
    }  
  }
  useEffect(() => {    
    const getServices = async() => {
      try{        
        const response =  await getServicesData();
        setServices(response);        
      } catch(error) {
        console.log(error);
      }
    }
    getServices();
  }, []);  
  useEffect(() => {    
    const getResource = async() => {
      try{
        if(session?.user.email){
          const response =  await fetchResource(session?.user.email as string); 
          setResource(response)
        }
      } catch(error) {
        console.log(error);
      }
    }    
    getResource();      
    const getProjects = async() => {
      try{
        if(session?.user.email){
          const response =  await getProjectsByResource(session?.user.email as string);
          setProjects(response)          
        }
      } catch(error) {
        console.log(error);
      }
    }
    getProjects();
  }, [session?.user.email]);
  useEffect(() => {    
  const getTimesheets = async() => {
    try{
      if(resource?.id){
        const curr = new Date(currentDate.toString()); // get current date        
        const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week        
        const response =  await fetchTime(new Date().getTimezoneOffset(), resource?.id ?? "", dateMode == "Day" ? new Date(curr) : new Date(curr.setDate(first)), dateMode == "Day" ? new Date(curr) : new Date(curr.setDate(first + (dateMode == "Day" ? 0 : 6)))); // last day is the first day + 6
        setTimesheets(response); 
        setTotalHours (response.reduce((total, timesheet) => total + parseFloat(timesheet.hours?? 0), 0));
      }
    } catch(error) {
      console.log(error);
    }  
  }
  getTimesheets();
  }, [resource?.id, currentDate, dateMode]);
  var newTimesheet: Timesheet = { id: '', email:session?.user.email?? "",  date: new Date(), sowId: '', resourceId: resource?.id?? "", serviceId: '', hours: undefined, description: '', billable: true, status: 'Added' }   
  const handleNext = () => {    
    dateMode == "Day" ? setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1))) : setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  }
  const handlePrev = () => {
    dateMode == "Day" ? setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1))) : setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  }
  return (
    <>
      <Title title="Time"></Title>
      <Container>
        <div className="p-2">
          <div className="items-center justify-between">
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={handlePrev}>
                <i className="fa-solid fa-arrow-left"></i>
              </Button>
              <WeekSelector currentDate={currentDate.toString()} dateMode={dateMode} setDateMode={setDateMode} />
              <Button variant="outline" size="icon" onClick={handleNext}>
                <i className="fa-solid fa-arrow-right"></i>
              </Button>
              <Button variant="outline" className='ml-2'>
                <i className="fa-solid fa-print md:mr-2"></i><span className='hidden md:block'>Print Time</span>
              </Button>
            </div>
          </div>
          <div className="mt-5">
            <Card>
              <CardContent>
                <h2 className="text-lg font-medium py-3">Record your time<i className="ml-2 fa-regular fa-clock text-sm"></i></h2>
                <TimeFormHeader />
                <TimeForm projects={projects} services={services} timesheet={newTimesheet} formType='Add' 
                  defaultProject={selectedProject} defaultService={selectedService} currentDate={currentDate} 
                  setTimesheets={setTimesheets} resourceId={resource?.id ?? ""} dateMode={dateMode} setTotalHours={setTotalHours}/>
              </CardContent>
            </Card>
          </div>
          <Conditional showWhen={timesheets.length > 0}>
            <div className="mt-5">
              <Card>
                <CardContent>                
                  <h2 className="text-lg font-medium py-3">Timesheet<i className="ml-2 fa-solid fa-table-cells text-sm"></i></h2>                
                  <TimeFormHeader />
                  {timesheets.map((timesheet, index) => 
                    <div key={timesheet.id} className="border-b-4 mb-4 pb-4 md:mb-1 md:pb-0 md:border-b-0">                      
                      <TimeForm key={timesheet.id} projects={projects} services={services} timesheet={timesheet} formType='Edit' 
                      defaultProject={timesheet.sowId} defaultService={timesheet.serviceId} currentDate={currentDate} 
                      setTimesheets={setTimesheets} resourceId={resource?.id ?? ""} dateMode={dateMode} setTotalHours={setTotalHours}/>
                    </div>                    
                  )}
                  <div className="mt-5">
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">Total Hours: {totalHours}</span>
                      <Button variant="outline" onClick={handleSubmitforApproval}><span className='text-green-800 font-semibold'><i className="mr-2 fa-solid fa-list-check"></i>Submit for Approval</span></Button>
                    </div>
                  </div>                
                </CardContent>
              </Card>
            </div>
          </Conditional>
        </div>
      </Container>
    </>
  )
}