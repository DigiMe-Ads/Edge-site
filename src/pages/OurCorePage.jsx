import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import ServicesListSection from '../components/core/ServicesListSection'
import Footer from '../components/common/Footer'

export default function CorePage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="Our Core Service Lines" />
        <ServicesListSection />
    <Footer />
    </main>
  )
}