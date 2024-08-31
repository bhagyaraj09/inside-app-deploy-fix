import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function HumanResources() {
  return (
    <>
      <Title title="Human Resources"></Title>
      <Container>
        <div className="p-2 sm:max-w-96">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">
                HR Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
            <Image src="/team/Nikole_Velo.png" alt="team_image" width={384} height={256}/>
              <div className="text-2xl font-bold">Nikole Velo</div>
              <p className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>nikole.velo@symphonize.com
              </p>
              <p className="text-xs text-muted-foreground"><i className="fa-solid fa-phone mr-1"></i>(916) 917-7778</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid pt-6 px-4">
          <h1 className='font-semibold text-2xl text-gray-600 mb-4'>Frequently Asked Questions</h1>
          <Accordion type="single" collapsible className="w-full text-lg text-blue-700 px-6">
            <AccordionItem value="item-1">
              <AccordionTrigger>1. How can I access my pay stubs and employment records?</AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500 border rounded-lg p-4 mb-4">
              <span className='font-semibold italic mr-2'>Answer:</span>All pay stubs and employment records are available in our payroll system, ADP. You can view and download your pay stubs, W-2 forms, and other employment documents anytime.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>2. Can I change my benefit selections outside of the open enrollment period?</AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500 border rounded-lg p-4 mb-4">
              <span className='font-semibold italic mr-2'>Answer:</span>Changes to benefit selections outside the open enrollment period are generally only allowed due to a qualifying life event, such as marriage, divorce, the birth of a child, or a significant change in your spouse’s employment status. Please contact HRtoGO by emailing, benefits@hrtogo.com for assistance in adjusting your benefits under these circumstances.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>3. What should I do if I need workplace accommodations?</AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500 border rounded-lg p-4 mb-4">
              <span className='font-semibold italic mr-2'>Answer:</span>If you require workplace accommodations, please contact Nikole Velo, to discuss your needs. You may need to provide documentation from your healthcare provider. We will work together to assess your needs and make the necessary arrangements to support your work environment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>4. What is the policy for maternity/paternity leave?</AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500 border rounded-lg p-4 mb-4">
              <span className='font-semibold italic mr-2'>Answer:</span>We provide maternity and paternity leave in accordance with federal and state laws. Eligible employees can take leave for the birth or adoption of a child. Detailed information on leave duration, eligibility requirements, and how to apply can be found in the employee handbook or by contacting Nikole Velo.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>5. What is the company’s policy on sick leave?</AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500 border rounded-lg p-4 mb-4">
              <span className='font-semibold italic mr-2'>Answer:</span>Our company provides paid sick leave for regular full-time employees, which can be used starting on the 90th day of employment. Employees accrue sick leave at a rate of one hour for every 30 hours worked, up to a maximum of 40 hours or five days per calendar year, whichever is greater. Sick leave accruals stop when a balance of 80 hours or ten days is reached and can only resume once some of the accrued leave is used. Unused sick leave can be carried over to the next year, but sick leave cannot be used before it is accrued and must be taken in minimum increments of two hours.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>6. How do I report a safety concern in the workplace?</AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500 border rounded-lg p-4 mb-4">
              <span className='font-semibold italic mr-2'>Answer:</span>Safety concerns should be reported immediately to your supervisor or directly to HR by contacting Nikole Velo. We take all reports seriously and will investigate promptly to ensure a safe working environment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>7. What is the process for reporting a workplace issue or concern?</AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500 border rounded-lg p-4 mb-4">
              <span className='font-semibold italic mr-2'>Answer:</span>If you encounter a workplace issue or have a concern, you should report it immediately either directly to your manager or by contacting Nikole Velo, directly for guidance or to discuss the matter in confidence.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>8. How is performance evaluated at Symphonize, Inc.?</AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500 border rounded-lg p-4 mb-4">
              <span className='font-semibold italic mr-2'>Answer:</span>Performance evaluations are conducted annually and involve a review of your achievements against pre-set objectives and competencies. Employees receive feedback from their supervisors, and there is an opportunity for self-assessment. Goals for the next year are also set during this process.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </>
  )
}
