'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { SOWResource, Timesheet } from '@/types'; 
import ProjectsSelect from '@/src/components/time/projects-select'
import { ApproveTime, getTimeForApproval } from '@/src/actions/timeSheet';
import { startOfWeek, endOfWeek } from "date-fns"
interface TimeApprovalFormProps {
    timesheets: Timesheet[];   
    projects: SOWResource[]; 
    currentDate: Date;
    resourceId: string;
    dateMode: string;    
    setTimesheets: React.Dispatch<React.SetStateAction<Timesheet[]>>;
    setTotalHours: React.Dispatch<React.SetStateAction<number>>;
}

export default function TimeApprovalForm(props: TimeApprovalFormProps) {
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            if(checkbox.id.startsWith("custom-select-")) {
                (checkbox as HTMLInputElement).checked = e.target.checked;
            }
        });
    }
    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let selectAll: boolean = true;
        checkboxes.forEach((checkbox) => {
            if(checkbox.id.startsWith("custom-select-")) {
                const customSelectCheckbox = document.getElementById(checkbox.id) as HTMLInputElement;                
                selectAll = customSelectCheckbox.checked && selectAll;
            }
        });
        const selectAllCheckbox = document.getElementById("select-all") as HTMLInputElement;
        selectAllCheckbox.checked = selectAll;
    }    
    const getTimesheets = async() => {
        try{
          const weekStart = startOfWeek(props.currentDate, { weekStartsOn: 1 }).toDateString();
          const weekEnd = endOfWeek(props.currentDate, { weekStartsOn: 1 }).toDateString();
          const response =  await getTimeForApproval(props.resourceId, props.dateMode == "Day" ? props.currentDate.toDateString() : weekStart, props.dateMode == "Day" ? props.currentDate.toDateString() : weekEnd);
          props.setTimesheets(response); 
          props.setTotalHours (response.reduce((total, timesheet) => total + parseFloat(timesheet.hours?? 0), 0));
        } catch(error) {
          console.log(error);
        }  
    }
    return (
        <form 
            onKeyDown={
                (event: React.KeyboardEvent<HTMLFormElement>) => {
                    if (event.key === 'Enter') {
                        event.preventDefault(); // Prevents form submission
                    }
                }
            }
            action={ async (formData) => {
                    console.log(formData);
                    await ApproveTime(props.resourceId, formData);             
                    getTimesheets();
                }
            } >
            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&amp;_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                                    <div className='md:flex items-center justify-center'>
                                        <input type='checkbox' name={"select-all"} id={"select-all"} onChange={handleSelectAll} ></input>
                                    </div>    
                                </th>
                                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Date</th>
                                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Project</th>
                                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Service</th>
                                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Description</th>
                                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Hours</th>
                                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Billable</th>
                            </tr>
                        </thead>
                        <tbody className="[&amp;_tr:last-child]:border-0">
                        {props.timesheets.map((timesheet, index) =>
                            <tr key ={timesheet.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" data-state="false">
                                <td className="p-4 align-middle">
                                    <div className='md:flex items-center justify-center'>
                                        <input type='checkbox' name={"custom-select-" + timesheet.id} id={"custom-select-" + timesheet.id} onChange={handleSelectChange} ></input>
                                    </div>
                                </td>
                                <td className="p-2 align-middle">
                                    <div className="w-36">{new Date(timesheet.date).toDateString()}</div>
                                </td>
                                <td className="p-2 align-middle">
                                    <ProjectsSelect projects={props.projects} id={"project-select-" + timesheet.id} defaultProject={timesheet.sowId}  disabled={false}/>
                                </td>
                                <td className="p-2 align-middle">
                                    {timesheet.service?.name}
                                </td>
                                <td className="p-2 align-middle">
                                    {timesheet.description}
                                </td>
                                <td className="p-2 align-middle">
                                    {timesheet.hours}
                                </td>
                                <td className="p-2 align-middle">
                                    <Checkbox defaultChecked={timesheet.billable} name={"billable" + "-" + timesheet.id} id={"billable" + "-" + timesheet.id}></Checkbox>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-5">
                <div className="flex items-center">
                    <Button variant="outline"><span className='text-green-800 font-semibold'><i className="mr-2 fa-solid fa-list-check"></i>Approve Selected</span></Button>
                </div>
            </div>                
        </form>
    )
}