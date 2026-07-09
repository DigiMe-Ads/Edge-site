import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import HomePage        from './pages/HomePage'
import BlogPage        from './pages/BlogPage'
import ServicePage from './pages/ServicePage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import FoundersPage from './pages/FoundersPage'
import ScrollToTop from './components/ui/ScrollToTop'


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"             element={<HomePage />}        />
        <Route path="/blog"         element={<BlogPage />}        />
        <Route path="/services"     element={<ServicePage />}     />
        <Route path="/contact"      element={<ContactPage />}     />
        <Route path="/about"        element={<AboutPage />}       />
        <Route path="/founders"     element={<FoundersPage />}    />
      </Routes>
    </BrowserRouter>
  )
}