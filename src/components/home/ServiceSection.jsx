import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─── Card data ────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: '01',
    title: 'Strategic & Organizational Advisory',
    items: ['Strategy alignment', 'Organization design', 'Governance & operating models', 'Performance architecture'],
    icon: <TargetIcon />,
  },
  {
    num: '02',
    title: 'Human Capital & Leadership Advisory',
    items: ['Talent strategy', 'Leadership development', 'Culture transformation', 'Capability acceleration'],
    icon: <PeopleIcon />,
  },
  {
    num: '03',
    title: 'Business Effectiveness & Execution Support',
    items: ['Strategic execution alignment', 'Process optimization', 'Change management', 'Performance improvement initiatives'],
    icon: <GearIcon />,
  },
]

// ─── Card component ───────────────────────────────────────────────────────────
function ServiceCard({ data, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="bg-white flex flex-col p-7 sm:p-8 group relative overflow-hidden w-full h-full
                 border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Red top-edge accent on hover */}
      <div className="absolute left-0 right-0 top-0 h-[3px] bg-red-600
                      scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

      <div className="flex items-start justify-between mb-8">
        <p className="font-display font-bold text-gray-200 leading-none select-none"
           style={{ fontSize: '1.9rem' }}>
          {data.num}
        </p>
        <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
          {data.icon}
        </div>
      </div>

      <h3 className="font-display font-bold text-gray-900 leading-snug mb-5"
          style={{ fontSize: '1.1rem' }}>
        {data.title}
      </h3>

      <ul className="space-y-2.5 mt-auto">
        {data.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 bg-red-600" />
            <span className="text-[13px] text-gray-500 leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const headRef = useRef(null)
  const inView  = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section className="w-full" style={{ background: '#f1f1f3' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-20 lg:py-28">

        {/* ── Header ── */}
        <div ref={headRef} className="text-center mb-14">
          <motion.p
            className="text-[11px] font-bold uppercase tracking-[0.24em] text-red-600 mb-3"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
          >
            Our Services
          </motion.p>
          <motion.h2
            className="font-display font-extrabold text-gray-900 leading-[1.1]"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            Transforming Strategy, Talent, and Execution
          </motion.h2>
        </div>

        {/* ── 3-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} data={s} delay={0.06 * i} />
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="text-center">
          <Link
            to="/our-core"
            className="inline-block bg-gray-900 text-white text-[11px] font-bold uppercase
                       tracking-[0.16em] px-8 py-4 hover:bg-red-600 transition-colors duration-300"
          >
            View Our Services
          </Link>
        </div>

      </div>
    </section>
  )
}

// ─── Icon SVGs ────────────────────────────────────────────────────────────────
function TargetIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
         stroke="#d32f2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="15" cy="15" r="12" />
      <circle cx="15" cy="15" r="6.5" />
      <circle cx="15" cy="15" r="1.8" fill="#d32f2f" stroke="none" />
    </svg>
  )
}

function PeopleIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
         stroke="#d32f2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="9" r="4.5" />
      <circle cx="21" cy="9" r="3.5" />
      <path d="M2 26c0-4.7 4-8.5 8.5-8.5s8.5 3.8 8.5 8.5" />
      <path d="M20.5 12.5c3.2 0 5.7 2.5 5.7 6.5" />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
         stroke="#d32f2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="15" cy="15" r="4" />
      <path d="M15 2v3M15 25v3M2 15h3M25 15h3M5.5 5.5l2.1 2.1M22.4 22.4l2.1 2.1M5.5 24.5l2.1-2.1M22.4 7.6l2.1-2.1" />
    </svg>
  )
}
