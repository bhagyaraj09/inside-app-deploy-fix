import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import {
  Card,
  CardContent,
} from '@/components/ui/card'

export default function Company() {
  return (
    <>
      <Title title="About Symphonize"></Title>
      <Container>
        <Card>
          <CardContent className="grid pt-6">
            <div className="mb-3">
                <span><strong>Symphonize</strong></span>
                <span> specializes in custom business solutions, that offers end-to-end, scalable-technology solutions across the globe. Over the years Symphonize has helped several businesses with their unique technology and business needs. We use the right combination of creative design and technology to deliver result oriented services.</span>
            </div>
            <div className="mb-3">
                <span><strong>Why choose Symphonize?</strong></span>
                <span>We pursue a cross-platform, technology-independent approach, ensuring high-performance and cost-beneficial results. A thorough business analysis and technology assessment determines the design approach which best meets the requirements of each project. Our solutions are flexible and very result oriented which can help your business get an edge over the others.</span>
            </div>
            <div className="mb-3">
                <span><strong>The Symphonize Difference</strong></span>
                <span>Ever since the establishment of Symphonize, we have been sharing our experience and knowledge with the clients. With this experience and knowledge, we offer high quality and low cost services that will fit into the current requirements of any company. The solutions provided by Symphonize are result oriented and flexible according to the needs of our clients. We can help your business stand out from the rest. Use our services to create an excellent customer experience.</span>
            </div>
            <div className="mb-3">
                <span><strong>Technical Excellence</strong></span>
                <span>At Symphonize, the goal of our company is to not just provide solutions that are innovative but to back it up with technical excellence. Our technical knowledge and multi platform solutions will ensure that the needs of companies from various domains can be accommodated. Our company is supported by high end infrastructural facilities which help us deliver what we promise our clients.</span>
            </div>
            <div>
                <span><strong>Custom Application Development</strong></span>
                <span>Our Application development services help you meet the strategic objectives of IT systems within the context of your business goals and strategies. We understand your key imperatives of securing customer commitment with your services, maintaining and continuously improving service quality and reducing operational expenditure. We can help you meet these objectives with our commitment to support you, by nurturing a flexible and long-term relationship through our value propositions.</span>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
