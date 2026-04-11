import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import LeadershipSection from '../components/founders/LeadershipSection'
import Footer from '../components/common/Footer'

export default function FoundersPage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="Our Founders" />
        <LeadershipSection />

    <Footer />
    </main>
  )
}