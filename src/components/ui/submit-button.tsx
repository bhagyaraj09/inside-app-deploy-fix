'use client'
import { useFormStatus } from 'react-dom'
import { HTMLAttributes } from "react";
 
interface ISubmitButtonProps extends HTMLAttributes<HTMLElement> {    
    className?: string;
}

export function SubmitButton(props: ISubmitButtonProps) {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending}
        className={
        props.className??"" +
        " inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white shadow hover:bg-green-600/90 h-9 px-4 py-2"
      }
    >
      {props.children}
    </button>
  )
}