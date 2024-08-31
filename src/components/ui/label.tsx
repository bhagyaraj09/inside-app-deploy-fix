'use client'
import { HTMLAttributes } from "react";
 
interface ILabelProps extends HTMLAttributes<HTMLElement> {    
    className?: string;
    htmlFor: string;
}
export function Label(props: ILabelProps) {
  return (
    <label {...props} htmlFor={props.htmlFor} className={props.className??"" +
        " block mb-2 text-sm font-medium text-gray-900"}
    >
      {props.children}
    </label>
  )
}