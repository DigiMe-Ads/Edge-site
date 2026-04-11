import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import HomePage        from './pages/HomePage'
import BlogPage        from './pages/BlogPage'
import ServicePage from './pages/ServicePage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import ChallengePage from './pages/ChallengePage'
import LeadershipPage from './pages/LeadershipPage'
import OurPurposePage from './pages/OurPurposePage'
import FoundersPage from './pages/FoundersPage'
import OurCorePage from './pages/OurCorePage'
import ValuePage from './pages/ValuePage'
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
        <Route path="/challenge"    element={<ChallengePage />}   />
        <Route path="/purpose"  element={<OurPurposePage />} />
        <Route path="/leadership"   element={<LeadershipPage />}  />
        <Route path="/founders"     element={<FoundersPage />}    />
        <Route path="/our-core"     element={<OurCorePage />}    />
        <Route path="/values"       element={<ValuePage />}      />
      </Routes>
    </BrowserRouter>
  )
}