import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import {
  Card,
  CardContent,
} from '@/components/ui/card'

export default function Mission() {
  return (
    <>
      <Title title="Our Mission"></Title>
      <Container>
      <Card>
        <CardContent className="grid pt-6">
          <div className="mb-3">
             <span>Several years after Symphonize was founded, people throughout the company were involved in the development of our mission statement. We review it every year and make revisions as appropriate. Every few years, we use it as a corporate report card to solicit feedback from which to measure ourselves. We hope that it serves to introduce new people to our corporate goals and objectives, as well as to remind team members of our priorities, direction, and ideals.</span>
          </div>
          <div className="mb-3">
              <div><strong>Preamble</strong></div>
              <div>Corporation is an entity that serves a constituency. The constituency of a corporation is its staff, customers, partners, vendors, owners, and community. The success of a corporation is measured by how well it serves this entire constituency. It is Symphonize fundamental belief that the most successful corporations serve their staff first, because, in the end, this strategy serves the entire constituency best.</div>
          </div>
          <div className="mb-3">
              <div><strong>Technology</strong></div>
              <div>Our goal is to helping our clients conduct their business well and thereby creating their future. We will provide the ultimate environment and infrastructure for project execution including discovery, design, implementation and delivery. We will use this environment to provide innovative solutions in a wide range of application areas.</div>
          </div>
          <div className="mb-3">
              <div><strong>Business</strong></div>
              <div>We will strive to be the leading worldwide developer and supplier of technical computing software. Our business activities will be characterized by quality, innovation, and timeliness; competitive awareness; ethical business practices; and outstanding service to our customers.</div>
          </div>
          <div>
              <div><strong>Human</strong></div>
              <div>We will cultivate an enjoyable, vibrant, participatory, and rational work environment that nurtures individual growth, empowerment, and responsibility; appreciates diversity; encourages initiative and creativity; values teamwork; shares success; and rewards excellence.</div>
          </div>
        </CardContent>
      </Card>
  </Container>
    </>
  )
}
