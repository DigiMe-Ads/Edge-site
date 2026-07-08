import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Products & Solutions categories ─────────────────────────────────────────
const CATEGORIES = [
  {
    title: 'Strategic Solutions',
    desc: 'Align business strategy with execution and performance',
    icon: <TargetIcon />,
  },
  {
    title: 'Human Capital Solutions',
    desc: 'Design talent systems that drive capability and growth',
    icon: <PeopleIcon />,
  },
  {
    title: 'Leadership & Capability Programs',
    desc: 'Build leadership strength and organizational readiness',
    icon: <BulbIcon />,
  },
  {
    title: 'Business Effectiveness Tools',
    desc: 'Improve productivity, efficiency, and execution discipline',
    icon: <PulseIcon />,
  },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function EcosystemSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="w-full bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.p
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-red-600 mb-3"
            variants={fadeUp} custom={0}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            What We Offer
          </motion.p>
          <motion.h2
            className="font-display font-extrabold text-gray-900 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
            variants={fadeUp} custom={0.08}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            Our Products & Solutions
          </motion.h2>
        </div>

        {/* ── 4-category grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="border border-gray-100 p-7 hover:border-red-200 hover:shadow-md transition-all duration-300"
              variants={fadeUp} custom={0.1 + i * 0.08}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              <div
                className="w-14 h-14 flex items-center justify-center flex-shrink-0 mb-6"
                style={{ background: 'rgba(239,68,68,0.08)' }}
              >
                {cat.icon}
              </div>

              <h3 className="font-display font-extrabold text-gray-900 text-[1.05rem] mb-3 leading-snug">
                {cat.title}
              </h3>

              <p className="text-[13.5px] text-gray-500 leading-relaxed">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function TargetIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="11" />
      <circle cx="14" cy="14" r="6"  />
      <circle cx="14" cy="14" r="2" fill="#e53e3e" stroke="none" />
    </svg>
  )
}

function PeopleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="9" r="4" />
      <circle cx="19" cy="9" r="3.2" />
      <path d="M2.5 25c0-4.2 3.4-7.6 7.5-7.6s7.5 3.4 7.5 7.6" />
      <path d="M19 12.5c2.8 0 5 2.3 5 6" />
    </svg>
  )
}

function BulbIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 3 C9 3 5 7 5 12 C5 15.4 7 18.3 9.9 19.7 L9.9 22.2 C9.9 22.9 10.4 23.4 11.1 23.4 L16.9 23.4 C17.6 23.4 18.1 22.9 18.1 22.2 L18.1 19.7 C21 18.3 23 15.4 23 12 C23 7 19 3 14 3Z"
        stroke="#e53e3e" strokeWidth="1.8" strokeLinejoin="round"
      />
      <line x1="10.5" y1="25.5" x2="17.5" y2="25.5" stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function PulseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2,16 6,16 9,6 12,22 15,11 18,16 26,16" />
    </svg>
  )
}
