import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─── Nav link data ────────────────────────────────────────────────────────────
// 5 links on each side — tighter spacing applied throughout
const LEFT_LINKS = [
  { label: 'Home',         href: '/',            dropdown: null },
  { label: 'Who We Are',   href: '/about',       dropdown: null },
  { label: 'Our Purpose',  href: '/purpose',     dropdown: null },
  { label: 'The Challenge',href: '/challenge',   dropdown: null },
  { label: 'Leadership',   href: '/leadership',  dropdown: null },
]

const RIGHT_LINKS = [
  { label: 'Products', href: '/services', dropdown: null },
  { label: 'Our Core',     href: '/blog',     dropdown: null },
  { label: 'Values',  href: '/contact',  dropdown: null },
  { label: 'Our Founders', href: '/careers',  dropdown: null },
  { label: 'Contact Us', href: '/contact',  dropdown: null },
]

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function Dropdown({ items }) {
  return (
    <motion.ul
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-white rounded-sm shadow-2xl py-1.5 z-50 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600" />
      {items.map((item) => (
        <li key={item}>
          <a
            href="#"
            className="block px-4 py-[9px] text-[12.5px] font-medium text-gray-600 hover:text-red-600 hover:bg-red-50/60 transition-colors"
          >
            {item}
          </a>
        </li>
      ))}
    </motion.ul>
  )
}

// ─── Single nav item ──────────────────────────────────────────────────────────
function NavItem({ link, isScrolled }) {
  const [open, setOpen] = useState(false)

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={link.href}
        className={`
          flex items-center gap-[3px] font-medium tracking-[0.01em]
          transition-colors duration-200 whitespace-nowrap select-none py-1
          ${isScrolled ? 'text-gray-700 hover:text-red-600' : 'text-white/90 hover:text-white'}
        `}
        // Slightly smaller font when there are many links
        style={{ fontSize: '14px' }}
      >
        {link.label}
        {link.dropdown && (
          <svg
            className={`w-[8px] h-[8px] mt-[1px] transition-transform duration-200 opacity-50 ${open ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.8}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>
      <AnimatePresence>
        {link.dropdown && open && <Dropdown items={link.dropdown} />}
      </AnimatePresence>
    </li>
  )
}

// ─── Styled hamburger button ──────────────────────────────────────────────────
function HamburgerButton({ onClick, isScrolled, isOpen }) {
  const lineColor = isScrolled ? '#1a1a2e' : '#ffffff'
  const dotColor  = '#d32f2f'

  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      className="relative flex flex-col justify-center items-start gap-[5px] w-10 h-10 flex-shrink-0 group"
      style={{ outline: 'none' }}
    >
      <motion.span
        className="block rounded-full origin-left"
        style={{ height: 2, background: lineColor, width: 24 }}
        animate={isOpen ? { rotate: 45, y: 6, width: 24 } : { rotate: 0, y: 0, width: 24 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
      />
      <motion.span
        className="relative block rounded-full"
        style={{ height: 2, background: lineColor, width: 16 }}
        animate={isOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          className="absolute -right-[5px] -top-[3px] rounded-full"
          style={{ width: 8, height: 8, background: dotColor }}
          animate={isOpen ? { scale: 0 } : { scale: 1 }}
          transition={{ duration: 0.22, ease: 'backOut' }}
        />
      </motion.span>
      <span
        className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: isScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)' }}
      />
    </button>
  )
}

// ─── Mobile slide-out menu ────────────────────────────────────────────────────
function MobileMenu({ isOpen, onClose }) {
  const all = [...LEFT_LINKS, ...RIGHT_LINKS]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 left-0 bottom-0 z-50 w-72 flex flex-col"
            style={{ background: 'linear-gradient(160deg, #1a0505 0%, #0d0d1a 100%)' }}
          >
            <div
              className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'rgba(180,20,20,0.55)', filter: 'blur(40px)', transform: 'translate(-30%, -30%)' }}
            />
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="px-8 pt-8 pb-10 relative z-10">
              <img src="/logo.png" alt="Edge Consultants" className="h-8 w-auto" />
            </div>
            <nav className="relative z-10 flex-1 px-8 overflow-y-auto">
              <ul className="space-y-1">
                {all.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.055, duration: 0.3, ease: 'easeOut' }}
                  >
                    <Link
                      to={link.href}
                      className="flex items-center gap-2 py-3 text-[15px] font-medium text-white/75 hover:text-white border-b border-white/8 transition-colors group"
                      onClick={onClose}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="relative z-10 px-8 py-8 mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <p className="text-[10px] text-white/40 uppercase tracking-[0.22em] mb-1">Call Us</p>
              <a href="tel:+123456789" className="text-lg font-bold text-white hover:text-red-400 transition-colors">
                +123 456 789
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: isScrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          boxShadow: isScrolled ? '0 1px 32px rgba(0,0,0,0.09)' : 'none',
          transition: 'background 0.45s ease, box-shadow 0.45s ease',
        }}
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <div
          className="relative w-full h-[72px] flex items-center"
          style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
        >
          {/* FAR LEFT: Hamburger */}
          <HamburgerButton
            onClick={() => setMobileOpen(true)}
            isScrolled={isScrolled}
            isOpen={mobileOpen}
          />

          {/* CENTER LOGO */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 flex-shrink-0 z-10"
            aria-label="home"
          >
            <img
              src="/logo.png"
              alt="Edge Consultants"
              className="h-10 w-auto object-contain"
              style={{
                filter: isScrolled ? 'brightness(0)' : 'none',
                transition: 'filter 0.4s ease',
              }}
            />
          </Link>

          {/* NAV LINKS — centered around the absolutely-positioned logo.
              The outer div is inset-0 so it spans the full header width.
              We justify-center the inner group so it's viewport-centered,
              then use the spacer to "punch a hole" exactly where the logo sits.
              Tune w-[Xpx] on the spacer until links stop overlapping the logo.
          */}
          <div className="hidden xl:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="flex items-center gap-3 pointer-events-auto">

              <ul className="flex items-center gap-7">
                {LEFT_LINKS.map((link) => (
                  <NavItem key={link.label} link={link} isScrolled={isScrolled} />
                ))}
              </ul>

              {/*
                Spacer = logo rendered width + 2×padding on each side.
                Your logo at h-10 is roughly 130px wide.
                Add ~20px breathing room each side → 170px total.
                Increase if links still overlap, decrease if gap is too large.
              */}
              <div className="w-[170px] flex-shrink-0" />

              <ul className="flex items-center gap-7">
                {RIGHT_LINKS.map((link) => (
                  <NavItem key={link.label} link={link} isScrolled={isScrolled} />
                ))}
              </ul>

            </div>
          </div>

          {/* FAR RIGHT: Call Us */}
          <div className="hidden xl:flex items-center gap-2.5 ml-auto flex-shrink-0">
            <div
              className="flex-shrink-0 h-[18px] w-px"
              style={{ background: isScrolled ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.18)' }}
            />
            <svg
              width="34" height="30" viewBox="0 0 34 30" fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`flex-shrink-0 transition-colors duration-300 ${isScrolled ? 'text-gray-600' : 'text-white'}`}
            >
              <rect x="9" y="1" width="23" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
              <rect x="2" y="8" width="22" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
              <path d="M5 23 L2.5 29 L10 23Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
            </svg>
            <div className="leading-[1.25]">
              <p className={`text-[9.5px] font-bold uppercase tracking-[0.22em] ${isScrolled ? 'text-gray-400' : 'text-white/55'}`}>
                Call Us
              </p>
              <a
                href="tel:+123456789"
                className={`text-[13px] font-semibold tracking-[0.01em] transition-colors ${isScrolled ? 'text-gray-900 hover:text-red-600' : 'text-white hover:text-red-300'}`}
              >
                +123 456 789
              </a>
            </div>
          </div>

        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}