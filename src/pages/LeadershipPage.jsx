import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import InsightsSection from '../components/insights/InsightsSection'

import Footer from '../components/common/Footer'

export default function LeadershipPage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="Insights and Thought Leadership" />
        <InsightsSection/>

    <Footer />
    </main>
  )
}