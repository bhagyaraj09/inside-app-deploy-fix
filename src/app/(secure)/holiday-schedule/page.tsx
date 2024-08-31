import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function HolidaySchedule() {
  return (
    <>
      <Title title="Holiday Schedule"></Title>
      <Container>
        <div className="p-2 max-w-[460px] ">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">
                2024 Holiday Schedule
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <ul className="list-decimal list-inside mb-3">
                <li>New Year&apos;s Day - Jan 1st</li>
                <li>Birthday of Martin Luther King, Jr. - Jan 15th</li>
                <li>President&apos;s Day - Feb 19th*</li>
                <li>Memorial Day - May 27th</li>
                <li>Independence Day - Jul 4th</li>
                <li>Labor Day - Sep 2nd</li>
                <li>Veteran&apos;s Day  - Nov 11th</li>
                <li>Thanksgiving Day - Nov 28th</li>
                <li>Friday following Thanksgiving - Nov 29th</li>
                <li>Christmas Day - Dec 25th</li>                
              </ul>
              <p>*If a holiday falls on a Saturday, the preceding Friday will be treated as a holiday for pay and leave purposes. If a holiday falls on a Sunday, the following Monday will be treated as a holiday for pay and leave purposes.</p>  
            </CardContent>
          </Card>
        </div>            
      </Container>
    </>
  )
}
