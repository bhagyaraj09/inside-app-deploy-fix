import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import {
  Card,
  CardContent,
} from '@/components/ui/card'

export default function DailyActivities() {
  return (
    <>
      <Title title="Daily Activities"></Title>
      <Container>
        <Card>
          <CardContent className="grid pt-6">            
            <div className="mb-3">
                <div><strong>Work Schedules</strong></div>
                <div>
                  <p>Although this should not come as any particular surprise, full-time Symphonize staff are expected to work a minimum of 45 hours per week. In general, working hours are from 9:30 a.m. to 7:00 p.m. with 30 minutes for lunch. These hours work quite well for most of us, but there are always possible exceptions to the rules. Depending on staffing needs and operational demands, you may find that you have different stop and start times, as well as variations in the total hours that may be scheduled each day and week. You are guaranteed never to work more than 24 hours in a single day (although some of our people still insist on trying).</p>
                  <p>Flextime scheduling is available in some cases, at the discretion of management, to allow you to vary the beginning and ending times each day on need basis. To help improve the communication with US offices with better overlap of time zones, you are expected to be in Office no later than 8:30 a.m. with PST and 5:30 p.m. with EST time zones.</p>
                </div>
            </div>
            <div className="mb-3">
                <div><strong>Timesheet</strong></div>
                <div>
                  <p>All staff members must complete an online timesheet each pay period. The link to the electronic timesheet system is available on Employee Portal.</p>
                  <p>All employees must complete their time sheets on daily basis. Failure on the employees’ part to comply with such rules can cause the company to delay in invoice submission and/or lose client contracts.</p>
                  <p>Submitted time sheets become quality records and legal documents of the company. Information generated from timesheets is also used for payroll, billing, project planning, cost accounting, and pricing purposes.</p>
                  <p>
                    Following are the requirements for completing time sheets:
                    <ul className="list-disc list-inside ml-8">
                      <li>
                        Each employee must log actual time worked on a daily basis. Time should be entered at the end of each business/work day. Time sheets must be kept up-to-date.
                      </li>
                      <li>
                        Time cannot be entered in advance with the exception of vacation, holidays and bereavement time.
                      </li>
                      <li>
                        Time is to be logged to each specific task on which an employee spent time.
                      </li>
                      <li>
                        Time must be logged for all hours worked, holidays and all leave (PTO). Weekends are an exception unless employee works on those days which need to be logged.
                      </li>
                      <li>
                        Only the employee can make changes to his/her time sheet and proxy is not allowed.
                      </li>
                    </ul>
                  </p>
                </div>
            </div>
            <div className="mb-3">
                <div><strong>At the End of the Day</strong></div>
                <div>
                  <p>No one person is designated to close things up at the end of the day. We ask, therefore, that if you are the last person to leave in your area:</p>
                  <ul className="list-disc list-inside ml-8">
                    <li>Turn off conference room projector and lights.</li>
                    <li>Turn off office lights including desk and ceiling lights.</li>
                    <li>For best practices on turning off your computing equipment, see the “Systems Information” section.</li>
                  </ul>                
                </div>
            </div>
            <div className="mb-3">
                <div><strong>Ergonomics</strong></div>
                <div>Ergonomics is the practice of fitting the workspace to the person rather than the person to the workspace. The aim of ergonomics is to increase your productivity and health and to prevent and reduce the potential for fatigue, errors, or unsafe acts. In order to help with your comfort and safety, we encourage employees to customize their desk as per their own needs. For any specific needs, contact operations in charge.</div>
            </div>
            <div className="mb-3">
                <div><strong>Supplies</strong></div>
                <div>General day-to-day supplies such as paper clips, pens, post-its, and pads of paper can be found at reception. For any further help, please talk to the operations in charge.</div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
