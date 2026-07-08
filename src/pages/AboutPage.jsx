import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import PeopleDifferentiatorSection from '../components/about/PeopleDifferenceSection'
import Footer from '../components/common/Footer'

export default function AboutPage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="About Us" />
        <PeopleDifferentiatorSection />
    <Footer />
    </main>
  )
}