import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Left column checklist ────────────────────────────────────────────────────
const ADVISORY_ITEMS = [
  'Strategy alignment',
  'Organization design',
  'Governance & operating models',
  'Performance architecture',
]

// ─── Tag pills on featured card ───────────────────────────────────────────────
const TAGS = ['Talent Strategy', 'Culture', 'Capability']

// ─── Team avatar placeholder colors ──────────────────────────────────────────
const AVATAR_COLORS = ['#c084fc', '#60a5fa', '#34d399', '#f87171']

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
            Our Ecosystem
          </motion.p>
          <motion.h2
            className="font-display font-extrabold text-gray-900 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
            variants={fadeUp} custom={0.08}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            Integrated Solutions for Business Performance
          </motion.h2>
        </div>

        {/* ── 3-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr_1fr] gap-5 items-start">

          {/* ══ COL 1: Strategic Advisory ══ */}
          <motion.div
            variants={fadeUp} custom={0.1}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            {/* Icon + title row */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239,68,68,0.08)' }}
              >
                <TargetIcon />
              </div>
              <h3 className="font-display font-extrabold text-gray-900 text-[1.2rem]">
                Strategic Advisory
              </h3>
            </div>

            {/* Checklist */}
            <ul className="space-y-3 mb-8">
              {ADVISORY_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CircleCheckIcon />
                  <span className="text-[13.5px] text-gray-600">{item}</span>
                </li>
              ))}
            </ul>

            {/* Quote box */}
            <div
              className="rounded-2xl px-5 py-5"
              style={{ background: '#f4f4f6' }}
            >
              <p className="text-[13px] text-gray-500 italic leading-relaxed">
                "Improve productivity, efficiency, and execution discipline through tailored tools."
              </p>
            </div>
          </motion.div>

          {/* ══ COL 2: Featured dark card + Business Effectiveness ══ */}
          <div className="flex flex-col gap-5">

            {/* Dark featured card */}
            <motion.div
              className="relative rounded-2xl p-7 overflow-hidden"
              style={{ background: '#0f1724', minHeight: 260 }}
              variants={fadeUp} custom={0.14}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {/* Dark maroon blob top-right decoration */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                style={{
                  background: 'rgba(120,30,40,0.55)',
                  filter: 'blur(18px)',
                  transform: 'translate(20%, -20%)',
                }}
              />

              {/* Icon */}
              <div className="mb-5">
                <PeopleRedIcon />
              </div>

              {/* Title */}
              <h3 className="font-display font-extrabold text-white leading-snug mb-3"
                  style={{ fontSize: '1.25rem' }}>
                Human Capital &amp; Leadership
              </h3>

              {/* Desc */}
              <p className="text-white/55 text-[13px] leading-relaxed mb-6">
                Design talent systems that drive capability and build leadership strength
                for long-term readiness.
              </p>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60
                               border border-white/20 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Business Effectiveness card */}
            <motion.div
              className="rounded-2xl p-7 border border-gray-100 shadow-sm
                         hover:shadow-md transition-shadow duration-250"
              variants={fadeUp} custom={0.2}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-display font-extrabold text-gray-900 text-[1.05rem] mb-2">
                    Business Effectiveness Tools
                  </h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">
                    We provide the technical frameworks needed to sustain transformation
                    long after we leave.
                  </p>
                </div>

                {/* Stacked avatars + count */}
                <div className="flex items-center flex-shrink-0 ml-2">
                  <div className="flex -space-x-2">
                    {AVATAR_COLORS.map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center"
                        style={{ background: color, zIndex: 4 - i }}
                      >
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                        </svg>
                      </div>
                    ))}
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white bg-red-600
                                 flex items-center justify-center text-white text-[11px] font-bold"
                      style={{ zIndex: 0 }}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ══ COL 3: Execution Support ══ */}
          <motion.div
            className="rounded-2xl p-7 border border-gray-100 shadow-sm
                       hover:shadow-md transition-shadow duration-250"
            style={{ marginTop: 0 }}
            variants={fadeUp} custom={0.17}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            {/* Icon */}
            <div className="mb-5">
              <PulseIcon />
            </div>

            {/* Title */}
            <h3 className="font-display font-extrabold text-gray-900 text-[1.15rem] mb-3">
              Execution Support
            </h3>

            {/* Desc */}
            <p className="text-[13.5px] text-gray-400 leading-relaxed mb-6">
              Change management and performance improvement initiatives focused on
              real-world impact.
            </p>

            {/* Learn More link */}
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-red-600
                         hover:text-red-700 transition-colors duration-200"
            >
              Learn More
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

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

function CircleCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
         stroke="#e53e3e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="7.5" />
      <path d="M6 9.5l2 2 4-4" />
    </svg>
  )
}

function PeopleRedIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
         stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="5" />
      <circle cx="22" cy="9" r="4" />
      <path d="M3 27c0-5 4-9 9-9s9 4 9 9" />
      <path d="M22 13c3.3 0 6 2.7 6 7" />
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