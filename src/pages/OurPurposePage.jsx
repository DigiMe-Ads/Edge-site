import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import OurPurposeSection from '../components/purpose/OurPurposeSection'

import Footer from '../components/common/Footer'

export default function OurPurposePage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="Our Purpose" />
        <OurPurposeSection />

    <Footer />
    </main>
  )
}