import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import ContactSection from '../components/contact/ContactSection'
import ConsultationSection from '../components/contact/ConsultationSection'
import Footer from '../components/common/Footer'

export default function ContactPage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="Contact Us" />
        <ConsultationSection />
    <Footer />
    </main>
  )
}