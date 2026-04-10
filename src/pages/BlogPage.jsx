import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import BlogList from '../components/blogs/BlogList'
import Footer from '../components/common/Footer'

export default function BlogPage() {
  return (
    <main className="relative">
      {/* Global navigation — sits above every section */}
      <Navbar />

      {/* ── Sections ── */}
      <CommonHero title="Blog" />
        <BlogList />
    <Footer />
    </main>
  )
}