import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import PeopleDifferentiatorSection from '../components/about/PeopleDifferenceSection'
import WhyStrategyFailsSection from '../components/about/WhyStrategyFailsSection'
import EcosystemSection from '../components/about/EcoSystemSection'
import OurPurposeSection from '../components/about/OurPurposeSection'
import WhoWeAreSection from '../components/about/WhoWeAreSection'
import AboutDetailSection from '../components/about/AboutDetail'
import TimelineSection from '../components/services/TimeLineSection'
import ProvideServicesSection from '../components/about/ProvideService'
import TeamSection from '../components/home/TeamSection'
import TestimonialsSection from '../components/home/Testimonials'
import Footer from '../components/common/Footer'

export default function AboutPage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="About Us" />
        <PeopleDifferentiatorSection />
        <OurPurposeSection />
        <WhyStrategyFailsSection />
        <EcosystemSection />
        <WhoWeAreSection />
        <AboutDetailSection />
        <TimelineSection />
        <ProvideServicesSection />
        <TeamSection />
        <TestimonialsSection />
    <Footer />
    </main>
  )
}