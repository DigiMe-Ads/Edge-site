import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Column data ──────────────────────────────────────────────────────────────
const COLUMNS = [
  {
    title: 'Strategic & Organizational Advisory',
    items: [
      'Strategy alignment',
      'Organization design',
      'Governance & operating models',
      'Performance architecture',
    ],
  },
  {
    title: 'Human Capital & Leadership Advisory',
    items: [
      'Talent strategy',
      'Leadership development',
      'Culture transformation',
      'Capability acceleration',
    ],
  },
  {
    title: 'Business Effectiveness & Execution Support',
    items: [
      'Strategic execution alignment',
      'Process optimization',
      'Change management',
      'Performance improvement initiatives',
    ],
  },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function ServicesListSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="w-full bg-white py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">

        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="font-display font-extrabold text-gray-900 leading-tight"
              style={{ fontSize: '2.5rem' }}>
            Our Core Service Lines
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {COLUMNS.map((col, ci) => (
            <motion.div
              key={ci}
              className="group relative border border-gray-100 p-7
                         hover:border-red-200 hover:shadow-md transition-all duration-300"
              variants={fadeUp} custom={ci * 0.1}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {/* Red top-edge accent on hover */}
              <div className="absolute left-0 right-0 top-0 h-[3px] bg-red-600
                              scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

              {/* Ghost number + icon row */}
              <div className="flex items-start justify-between mb-6">
                <span
                  className="font-display font-bold text-gray-200 leading-none select-none"
                  style={{ fontSize: '1.9rem' }}
                >
                  {String(ci + 1).padStart(2, '0')}
                </span>
                {/* Target icon in soft red tinted square */}
                <div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.08)' }}
                >
                  <TargetIcon />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display font-extrabold text-gray-900 leading-snug mb-5"
                  style={{ fontSize: '1.05rem' }}>
                {col.title}
              </h3>

              {/* Checklist */}
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CircleCheckIcon />
                    <span className="text-[13.5px] text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
         stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="1.5" fill="#e53e3e" stroke="none" />
    </svg>
  )
}

function CircleCheckIcon() {
  return (
    <svg
      className="flex-shrink-0"
      width="18" height="18" viewBox="0 0 18 18" fill="none"
      stroke="#e53e3e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="9" cy="9" r="7.5" />
      <path d="M5.5 9.5l2.5 2.5 5-5" />
    </svg>
  )
}