import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import ServicesSection from '../components/home/ServiceSection'
import TimelineSection from '../components/services/TimeLineSection'
import Footer from '../components/common/Footer'

export default function ServicePage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="Our Services" />
        <ServicesSection />
        <TimelineSection />
    <Footer />
    </main>
  )
}