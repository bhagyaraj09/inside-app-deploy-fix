'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Timesheet } from '@/types'; 
interface TimeFormProps {
    timesheets: Timesheet[];    
    currentDate: Date;
    resourceId: string;
    dateMode: string;
    setTimesheets: React.Dispatch<React.SetStateAction<Timesheet[]>>;
    setTotalHours: React.Dispatch<React.SetStateAction<number>>;
}

export default function TimeApprovalForm(props: TimeFormProps) {
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
                selectAll = e.target.checked && selectAll;
            }
        });
        const selectAllCheckbox = document.getElementById("select-all-" + props.resourceId) as HTMLInputElement;
        selectAllCheckbox.checked = selectAll;
    }
    return (
        <form action={async (formData) => {

        }} >
        <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&amp;_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                                <div className='md:flex items-center justify-center'>
                                    <input type='checkbox' name={"select-all-" + props.resourceId} id={"select-all-" + props.resourceId} onChange={handleSelectAll} ></input>
                                </div>    
                            </th>
                            <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Date</th>
                            <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Service</th>
                            <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Description</th>
                            <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Hours</th>
                            <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Billable</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="[&amp;_tr:last-child]:border-0">
                    {props.timesheets.map((timesheet, index) =>
                        <tr key ={timesheet.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" data-state="false">
                            <td className="p-4 align-middle">
                                <div className='md:flex items-center justify-center'>
                                    <input type='checkbox' name={"custom-select" + '-' + timesheet.id} id={"custom-select" + '-' + timesheet.id} onChange={handleSelectChange} ></input>
                                </div>
                            </td>
                            <td className="p-2 align-middle">
                            <div className="w-36">{new Date(new Date(timesheet.date).getTime() + (new Date().getTimezoneOffset() * 60000)).toDateString()}</div>                            </td>
                            <td className="p-2 align-middle">
                                {timesheet.service?.name}
                            </td>
                            <td className="p-2 align-middle">
                                {timesheet.description}
                            </td>
                            <td className="p-2 align-middle">
                                {timesheet.hours}
                            </td>
                            <td className="p-4 align-middle">
                                <div className='md:flex items-center justify-center'>
                                    <Checkbox defaultChecked={timesheet.billable} name={"billable" + "-" + timesheet.id} id={"billable" + "-" + timesheet.id}></Checkbox>                    
                                </div>
                            </td>
                            <td>
                                <span className="mr-1 font-semibold text-blue-800">
                                    {timesheet?.status}
                                </span>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    </form>
    )
}