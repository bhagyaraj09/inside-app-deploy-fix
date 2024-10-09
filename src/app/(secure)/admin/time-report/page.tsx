'use client'
import Title from '@/components/ui/title';
import Container from '@/components/ui/container';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Timesheet, StatementOfWork, SOWResource, Resource } from '@/types';
import { getAllSOWs } from '@/src/actions/sow';
import { Card, CardContent,} from "@/components/ui/card";
import AllSOWSelect from '@/src/components/time/all-sow-select';
import { MonthSelector } from '@/components/time/month-selector';
import { getResourcesBySOW } from '@/src/actions/sowResource';
import { fetchTimeByResourceId, fetchTimeBySOWId } from '@/src/actions/timeSheet';
import { DataTable } from '@/src/components/ui/data-table';
import { columns } from './columns';
import * as XLSX from "xlsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllResources } from '@/src/actions/resource';
import ResourcesSelect from '@/src/components/time/resources-select';
import { startOfWeek, endOfWeek } from "date-fns"

export default function TimeReport() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateMode, setDateMode] = useState("Month");
  const [sows, setSOWs] = useState<StatementOfWork[]>([]);
  const [sowId, setSOWId] = useState("");
  const [sowResources, setSOWResources] = useState<SOWResource[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceId, setResourceId] = useState("");
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);  
  const [totalHours, setTotalHours] = useState(0.0);
  const [tab, setTab] = useState("Project");

  const onTabChange = (value: string) => {
    setTab(value);
  }
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(timesheets.map( ts => {
      return {
        "Resource": ts.resource?.name,
        "Project": ts.statementOfWork?.project?.name,
        "SOW": ts.statementOfWork?.name,
        "Date": ts.date,
        "Hours": parseFloat(ts.hours),
        "Service": ts.service?.name,
        "Description": ts.description,
        "Billable": ts.billable,
        "Status": ts.status,
      }
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Timesheets");
    XLSX.writeFile(wb, tab == "Project" ? sows.filter( sow => sow.id == sowId)[0].project?.name + '-' + sows.filter( sow => sow.id == sowId)[0].name + " Timesheet.xlsx" : resources.filter( resource => resource.id == resourceId)[0].name + " Timesheet.xlsx");
  }
  const handleNext = () => {    
    if(dateMode == "Month"){
      if (currentDate.getMonth() == 11) {
        setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1));
      } else {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
      }
    }else{
       setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));       
    }
  }
  const handlePrev = () => {
    if(dateMode == "Month"){
      if (currentDate.getMonth() == 0) {
        setCurrentDate(new Date(currentDate.getFullYear() - 1, 11, 1));
      } else {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
      }
    }else{
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    }
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
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }).toDateString();
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 }).toDateString();
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toDateString();
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0).toDateString();
        
        if(tab == "Project"){
          if(sowId != ""){
            const projectResponse =  await fetchTimeBySOWId(sowId, dateMode == "Month" ? monthStart : weekStart, dateMode == "Month" ? monthEnd : weekEnd); // last day is the first day + 6
            setTimesheets(projectResponse); 
            setTotalHours (projectResponse.reduce((total, timesheet) => total + parseFloat(timesheet.hours?? 0), 0));
          }
        } else if(tab == "Resource"){
          if(resourceId != ""){
            const resourceResponse =  await fetchTimeByResourceId(resourceId, dateMode == "Month" ? monthStart : weekStart, dateMode == "Month" ? monthEnd : weekEnd); // last day is the first day + 6
            setTimesheets(resourceResponse); 
            setTotalHours (resourceResponse.reduce((total, timesheet) => total + parseFloat(timesheet.hours?? 0), 0));
          }
        }
      } catch(error) {
        console.log(error);
      }  
    }
    getTimesheets();
    }, [currentDate, dateMode, resourceId, sowId, tab]);
  useEffect(() => {    
    const getSOWs = async() => {
      try{
        const response =  await getAllSOWs(); 
        setSOWs(response)
        setSOWId(response[0].id);
      } catch(error) {
        console.log(error);
      }
    }    
    getSOWs();          
  }, []);

  useEffect(() => {    
    const getSOWResources = async() => {
      try{
        const response =  await getResourcesBySOW(sowId); 
        setSOWResources(response)
      } catch(error) {
        console.log(error);
      }
    }    
    getSOWResources();          
  }, [sowId]);
  
  return (
    <>
      <Title title="Time Reports"></Title>
      <Container>
        <div className="p-2">
          <Card>
            <CardContent>
              <Tabs defaultValue="Project" className="pt-4" onValueChange={onTabChange}>
                <TabsList>
                  <TabsTrigger value="Project">Time by Project</TabsTrigger>
                  <TabsTrigger value="Resource">Time by Resource</TabsTrigger>
                </TabsList>
                <TabsContent value="Project" className='border p-4 rounded-lg'>
                  <div className="items-center justify-between">
                    <div className="flex items-center pb-4">                    
                      <Button variant="outline" size="icon" onClick={handlePrev}>
                        <i className="fa-solid fa-arrow-left"></i>
                      </Button>
                      <MonthSelector currentDate={currentDate.toString()} dateMode={dateMode} setDateMode={setDateMode} />
                      <Button variant="outline" size="icon" onClick={handleNext}>
                        <i className="fa-solid fa-arrow-right"></i>
                      </Button>
                      <Button variant="outline" className='ml-2 hidden'>
                        <i className="fa-solid fa-print md:mr-2"></i><span className='hidden md:block'>Print Time</span>
                      </Button>
                      <Button variant="outline" className='ml-2' onClick={handleExport}>
                        <i className="fa-solid fa-file-export md:mr-2"></i><span className='hidden md:block'>Export Time</span>
                      </Button>
                    </div>
                    <div className="flex items-center">                    
                      <span className='mr-2  font-medium'>Project:</span>
                      <span className='w-auto mr-2'>
                        <AllSOWSelect id={sowId} sows={sows} disabled={false} setSOWId={setSOWId} />
                      </span>
                    </div>
                    <div className="pt-2">
                      Total Hours: <span className='font-semibold'>{totalHours}</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="Resource" className='border p-4 rounded-lg'>
                  <div className="items-center justify-between">
                    <div className="flex items-center pb-4">                    
                      <Button variant="outline" size="icon" onClick={handlePrev}>
                        <i className="fa-solid fa-arrow-left"></i>
                      </Button>
                      <MonthSelector currentDate={currentDate.toString()} dateMode={dateMode} setDateMode={setDateMode} />
                      <Button variant="outline" size="icon" onClick={handleNext}>
                        <i className="fa-solid fa-arrow-right"></i>
                      </Button>
                      <Button variant="outline" className='ml-2 hidden'>
                        <i className="fa-solid fa-print md:mr-2"></i><span className='hidden md:block'>Print Time</span>
                      </Button>
                      <Button variant="outline" className='ml-2' onClick={handleExport}>
                        <i className="fa-solid fa-file-export md:mr-2"></i><span className='hidden md:block'>Export Time</span>
                      </Button>
                    </div>
                    <div className="flex items-center">                    
                      <span className='mr-2  font-medium'>Resource:</span>
                      <span className='w-auto mr-2'>
                        <ResourcesSelect resources={resources} disabled={false} setResourceId={setResourceId}/>
                      </span>
                    </div>
                    <div className="pt-2">
                      Total Hours: <span className='font-semibold'>{totalHours}</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          {tab == "Project" ? sowResources.map( sowResource => (
            timesheets.filter( timesheet => timesheet.resourceId == sowResource.resourceId).length > 0 ?
              <Card key={sowResource.resourceId} className='mt-5'>
                <CardContent>                
                  <div className="items-center justify-between">
                    <div>
                      <div key={sowResource?.id} className="items-center justify-between py-3">
                        <div className="flex items-center">
                          <span className="font-semibold">{sowResource.resource?.name}</span>
                        </div>
                        <DataTable columns={columns} data={timesheets.filter(timesheet => timesheet.resourceId == sowResource.resourceId)} filter={false} pagination={false} />
                        <div className="pt-2">
                          Hours for <span className='font-semibold'>{sowResource.resource?.name}: {timesheets.filter(timesheet => timesheet.resourceId == sowResource.resourceId).reduce((total, timesheet) => total + parseFloat(timesheet.hours?? 0), 0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              : "" 
            )): sows.map( sow => (
              timesheets.filter( timesheet => timesheet.sowId == sow.id).length > 0 ?
                <Card key={sow.id} className='mt-5'>
                  <CardContent>                
                    <div className="items-center justify-between">
                      <div>
                        <div key={sow?.id} className="items-center justify-between py-3">
                          <div className="flex items-center">
                            <span className="font-semibold">{sow.project?.name + '-' + sow.name}</span>
                          </div>
                          <DataTable columns={columns} data={timesheets.filter(timesheet => timesheet.sowId == sow.id)} filter={false} pagination={false} />
                          <div className="pt-2">
                            Hours for <span className='font-semibold'>{sow.project?.name + '-' + sow.name}: {timesheets.filter(timesheet => timesheet.sowId == sow.id).reduce((total, timesheet) => total + parseFloat(timesheet.hours?? 0), 0)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                : "" 
              ))}
        </div>
      </Container>
    </>
  )
}
