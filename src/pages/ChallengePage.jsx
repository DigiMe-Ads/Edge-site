import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import WhyStrategyFailsSection from '../components/challenge/WhyStrategyFailsSection'
import Footer from '../components/common/Footer'

export default function ChallengePage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="The Challenge" />
        <WhyStrategyFailsSection />

    <Footer />
    </main>
  )
}