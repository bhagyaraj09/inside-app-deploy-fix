
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { BorderDottedIcon,Pencil1Icon } from "@radix-ui/react-icons"

  interface DropDownMenuProps {
    onSelect:(option:string,leaveId:string)=>void;
    leaveId:string;
    isNotDisabled:boolean;
  }

  const DropDownMenuValues: React.FC<DropDownMenuProps> =({onSelect,leaveId,isNotDisabled})=><DropdownMenu >
  <DropdownMenuTrigger style={{border:"none",outline:"none"}} disabled={!isNotDisabled}><BorderDottedIcon/></DropdownMenuTrigger>
  <DropdownMenuContent style={{minWidth:"75px",position:"relative"}} >
    
    <DropdownMenuItem   className="text-xs flex space-between" onSelect={()=>onSelect("Edit",leaveId)}>Edit</DropdownMenuItem>
    <DropdownMenuItem   className="text-xs" onSelect={()=>onSelect("Cancel",leaveId)}>Cancel</DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>


export default DropDownMenuValues

  