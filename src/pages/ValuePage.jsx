import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import DeliveryMethodologySection from '../components/value/DeliveryMethodology'
import Footer from '../components/common/Footer'

export default function ValuePage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="Our Delivery Methodology" />
        <DeliveryMethodologySection />

    <Footer />
    </main>
  )
}