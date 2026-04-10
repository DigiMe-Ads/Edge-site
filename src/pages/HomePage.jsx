import Navbar from '../components/common/Navbar'
import HeroSection from '../components/home/HeroSection'
import AboutSection from '../components/home/AboutSection'
import ServicesSection from '../components/home/ServiceSection'
import FAQSection from '../components/home/FAQSection'
import StatsSection from '../components/home/StatsSection'
import TeamSection from '../components/home/TeamSection'
import CtaBannerSection from '../components/home/CTABannerSection'
import TestimonialsSection from '../components/home/Testimonials'
import BlogSection from '../components/home/BlogSection'
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
        <FAQSection />
        <StatsSection />
        <TeamSection />
        <CtaBannerSection />
        <TestimonialsSection />
        <BlogSection />
      <Footer />
    </main>
  )
}