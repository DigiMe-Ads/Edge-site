import Navbar from '../components/common/Navbar'
import HeroSection from '../components/home/HeroSection'
import AboutSection from '../components/home/AboutSection'
import ServicesSection from '../components/home/ServiceSection'
import CtaBannerSection from '../components/home/CTABannerSection'
import Footer from '../components/common/Footer'

export default function HomePage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CtaBannerSection />
      <Footer />
    </main>
  )
}