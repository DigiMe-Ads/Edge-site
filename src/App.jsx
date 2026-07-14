import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import HomePage        from './pages/HomePage'
import BlogPage        from './pages/BlogPage'
import BlogPostPage    from './pages/BlogPostPage'
import ServicePage from './pages/ServicePage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import FoundersPage from './pages/FoundersPage'
import CareersPage from './pages/CareersPage'
import JobDetailPage from './pages/JobDetailPage'
import AdminPage from './pages/AdminPage'
import ScrollToTop from './components/ui/ScrollToTop'


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"             element={<HomePage />}        />
        <Route path="/blog"         element={<BlogPage />}        />
        <Route path="/blog/:slug"   element={<BlogPostPage />}    />
        <Route path="/services"     element={<ServicePage />}     />
        <Route path="/contact"      element={<ContactPage />}     />
        <Route path="/about"        element={<AboutPage />}       />
        <Route path="/founders"     element={<FoundersPage />}    />
        <Route path="/careers"      element={<CareersPage />}     />
        <Route path="/careers/:jobId" element={<JobDetailPage />} />
        <Route path="/admin"        element={<AdminPage />}       />
      </Routes>
    </BrowserRouter>
  )
}