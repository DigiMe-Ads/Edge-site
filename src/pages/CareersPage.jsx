import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import JobList from '../components/careers/JobList'
import Footer from '../components/common/Footer'

export default function CareersPage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="Careers" />
      <JobList />
      <Footer />
    </main>
  )
}
