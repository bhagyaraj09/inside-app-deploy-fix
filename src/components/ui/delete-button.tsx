'use client'
import { useFormStatus } from 'react-dom'
import { HTMLAttributes } from "react";
 
interface IDeleteButtonProps extends HTMLAttributes<HTMLElement> {    
    className?: string;
}

export function DeleteButton(props: IDeleteButtonProps) {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending}
        className={
        props.className??"" +
        " text-red-600 inline-flex items-center font-medium text-sm py-2 text-center "
      }
    >
      <i className="fa fa-trash mr-2"></i>{props.children}
    </button>
  )
}