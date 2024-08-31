import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import {
  Card,
  CardContent,
} from '@/components/ui/card'

export default function WorlplaceProfessionalism() {
  return (
    <>
      <Title title="Worlplace Professionalism"></Title>
      <Container>
        <Card>
          <CardContent className="grid pt-6">            
            <div className="mb-3">
                <div><strong>Work Dress Code</strong></div>
                <div>Business Casuals is the dress code of the company. Companys objective in establishing a business casual dress code, is to allow our employees to work comfortably in the workplace. Yet, we still need our employees to project a professional image for our customers, potential employees, andcommunity visitors. Business casual dress is the standard for this dress code.</div>
            </div>
            <div className="mb-3">
                <div><strong>Smoke Free Workplace</strong></div>
                <div>To protect and enhance our indoor air quality and to contribute to the health and well-being of all employees, the company premise shall be entirely smoke free. Additionally the use of all tobacco products, including chewing tobacco, is banned from the Company workplace, except as designatedin this policy. Smoking is prohibited in all of the enclosed areas within the Company worksites, without exception. This includes common work areas, the manufacturing facilities, classrooms, conference and meeting rooms, private offices, hallways, the lunchrooms, stairs, restrooms, employer owned or leased vehicles, and all other enclosed facilities. The only designated smoking area in Company is outdoors.</div>
            </div>
            <div className="mb-3">
                <div><strong>Drugs and Alcohol</strong></div>
                <div>Drug Free Workplace - These activities are strictly prohibited under company’s drug policy. Taking or using alcohol or drugs, Selling drugs, or Affected by the after effects of indulging in alcohol or drugs outside of the workplace during non-work time.</div>
            </div>
            <div>
                <div><strong>Violence and weapons at workplace</strong></div>
                <div>The company expects all of its employees to maintain professionalism at the workplace. Any kind of violence, misbehave with the female employees, seniors and subordinated, and use of abusive language may lead to disciplinary action against the person found guilty. Carrying any kind of weapon at workplace or in the company premises is strictly prohibited.</div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
