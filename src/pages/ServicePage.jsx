import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import WhyStrategyFailsSection from '../components/challenge/WhyStrategyFailsSection'
import EcosystemSection from '../components/producs/EcoSystemSection'
import ServicesListSection from '../components/core/ServicesListSection'
import DeliveryMethodologySection from '../components/value/DeliveryMethodology'
import Footer from '../components/common/Footer'

export default function ServicePage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="Our Services" />
        <WhyStrategyFailsSection />
        <EcosystemSection />
        <ServicesListSection />
        <DeliveryMethodologySection />
    <Footer />
    </main>
  )
}