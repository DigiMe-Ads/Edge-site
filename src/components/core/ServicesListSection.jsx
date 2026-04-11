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

        {/* Thin top border */}
        <div className="border-t border-gray-100 mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {COLUMNS.map((col, ci) => (
            <motion.div
              key={ci}
              variants={fadeUp} custom={ci * 0.1}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {/* Icon + Title row */}
              <div className="flex items-start gap-4 mb-6">
                {/* Target icon in soft red tinted rounded square */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.08)' }}
                >
                  <TargetIcon />
                </div>

                {/* Title */}
                <h3 className="font-display font-extrabold text-gray-900 leading-snug"
                    style={{ fontSize: '1rem', paddingTop: 2 }}>
                  {col.title}
                </h3>
              </div>

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

        {/* Thin bottom border */}
        <div className="border-b border-gray-100 mt-12" />

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