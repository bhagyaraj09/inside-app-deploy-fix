export default function TimeFormHeader() {
    return (
        <div className="hidden md:block md:flex mb-1">
            <span className='mr-1 w-44'>Date</span>
            <span className='mr-1 w-56'>Project</span>
            <span className='mr-1 w-36'>Service</span>
            <span className='mr-1 w-16'>Hours</span>
            <span className='mr-1 w-56'>Description</span>
            <span className='mr-1 w-20 flex justify-center'>Billable</span>
            <span className='mr-1'></span>
        </div>
    );
}