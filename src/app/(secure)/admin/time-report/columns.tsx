"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Timesheet } from "@/types";
import { dateWithoutTimeZone } from "@/src/lib/utils";

export const columns: ColumnDef<Timesheet>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {            
      return <div className="w-36">{new Date(dateWithoutTimeZone(new Date(row.getValue("date")))).toDateString()}</div>
    },
  },
  {
    accessorKey: "service.name",
    header: "Service",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "hours",
    header: "Hours",
  },
  {
    accessorKey: "billable",
    header: "Billable",
  },
  
]
