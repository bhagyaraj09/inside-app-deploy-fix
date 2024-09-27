import { Metadata } from "next"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Title from "@/components/ui/title"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Symphonize Employee Portal Dashboard.",
}

export default function DashboardPage() {
  const nextPayday = () : string => {    
      // Parse the start date
      let start = new Date('5/24/2024');
      let today = new Date();
  
      // Calculate the difference in days
      let diff = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      // Calculate the number of biweekly periods since the start date
      let periods = Math.floor(diff / 14);

      // Calculate the next payday
      let nextPayday = new Date(start);
      nextPayday.setDate(start.getDate() + (periods + 1) * 14);

      // If the next payday is today or in the past, calculate the next payday
      if (nextPayday <= today) {
          nextPayday.setDate(nextPayday.getDate() + 14);
      }

    return nextPayday.toDateString();
  }
  return (
    <>
      <Title title="Dashboard"></Title>
      <div className="flex-col flex px-5">
        <div className="grid mb-4 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Next Pay Check
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
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nextPayday()}</div>
              <p className="text-xs text-muted-foreground">
                Bi-Weekly
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Vacation
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
              <div className="text-2xl font-bold">Coming soon..</div>
              <p className="text-xs text-muted-foreground">
                Days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Sick Leave</CardTitle>
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
              <div className="text-2xl font-bold">Coming soon..</div>
              <p className="text-xs text-muted-foreground">
                Days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Supervisor
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Coming soon..</div>
              <p className="text-xs text-muted-foreground">
                <i className="fa-solid fa-at mr-1"></i>ashok@symphonize.com
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid mmb-4 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Coming soon ..
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Useful Links</CardTitle>
              <CardDescription>
                Coming soon ..
              </CardDescription>
            </CardHeader>
            <CardContent>
              
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}