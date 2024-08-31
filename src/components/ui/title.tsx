'use client';
interface ITitleProps {
    title: string;
}

export default function Title(props: ITitleProps) {
    return (
        <div className="pl-5 pb-3 pt-2 text-xl text-blue-600 font-bold ">
            <h1>{props.title}</h1>
        </div>
    )
}