'use client';
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}
const Container = (props: SectionProps) => {
  return (
    <section
      {...props}
      className={
        props.className??"" +
        " bg-white p-3 border-t border-gray-100"
      }
    >
      {props.children}
    </section>
  );
};

export default Container;