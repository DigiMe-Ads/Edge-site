import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── 4 step cards ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    num:   '01',
    icon:  <DiagnoseIcon />,
    title: 'Diagnose',
    desc:  'Identify root causes, gaps, and performance issues',
  },
  {
    num:   '02',
    icon:  <DesignIcon />,
    title: 'Design',
    desc:  'Develop aligned, integrated solutions',
  },
  {
    num:   '03',
    icon:  <DeliverIcon />,
    title: 'Deliver',
    desc:  'Execute with governance, accountability, and discipline',
  },
  {
    num:   '04',
    icon:  <SustainIcon />,
    title: 'Sustain',
    desc:  'Track performance and build long-term capability',
  },
]

// ─── Bottom badges ────────────────────────────────────────────────────────────
const BADGES = ['Data-Driven Insight', 'Measurable Outcomes', 'Deep Partnership']

// ─── Stats top-right ──────────────────────────────────────────────────────────
const STATS = [
  { value: '98%',  label: 'Success Rate' },
  { value: '200+', label: 'Projects'     },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

// ─── Card background / border colours ────────────────────────────────────────
const CARD_STYLE = {
  background: 'rgba(255,255,255,0.04)',
  border:     '1px solid rgba(255,255,255,0.08)',
}

export default function DeliveryMethodologySection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="w-full py-20 lg:py-28 overflow-hidden"
      style={{ background: '#0d1526' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">

        {/* ── Header row ── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-14">

          {/* Left: heading + sub */}
          <motion.div
            variants={fadeUp} custom={0}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            <h2
              className="font-display font-extrabold text-white leading-tight mb-2"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              Our Delivery Methodology
            </h2>
            <p className="text-white/45 text-[13.5px]">
              A rigorous 4-step framework for guaranteed business excellence.
            </p>
          </motion.div>

          {/* Right: two stats separated by a vertical line */}
          <motion.div
            className="flex items-center gap-6"
            variants={fadeUp} custom={0.1}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                {i > 0 && (
                  <div className="h-10 w-px" style={{ background: 'rgba(255,255,255,0.15)' }} />
                )}
                <div>
                  <p
                    className="font-display font-extrabold leading-none"
                    style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', color: '#e53e3e' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mt-1">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── 4 step cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="rounded-2xl p-6 flex flex-col gap-0
                         hover:bg-white/[0.07] transition-colors duration-300"
              style={CARD_STYLE}
              variants={fadeUp} custom={0.08 + i * 0.08}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {/* Top area: number + icon */}
              <div className="flex items-start justify-between mb-8">
                <span
                  className="font-display font-extrabold select-none"
                  style={{ fontSize: '2rem', color: 'rgba(220,60,60,0.35)' }}
                >
                  {step.num}
                </span>
                <div className="text-white/25 mt-1">
                  {step.icon}
                </div>
              </div>

              {/* Divider */}
              <div className="mb-5" style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />

              {/* Title */}
              <h3 className="font-display font-extrabold text-white text-[1.05rem] mb-2">
                {step.title}
              </h3>

              {/* Desc */}
              <p className="text-white/45 text-[13px] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom badges ── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          variants={fadeUp} custom={0.4}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
        >
          {BADGES.map((badge) => (
            <div key={badge} className="flex items-center gap-2.5">
              {/* Circle-check icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                   stroke="rgba(220,60,60,0.7)" strokeWidth="1.6"
                   strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="9" r="7.5" />
                <path d="M5.5 9.5l2.5 2.5 5-5" />
              </svg>
              <span className="text-[13px] font-medium text-white/60">
                {badge}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

// ─── Step icons — white/muted outlined ───────────────────────────────────────
function DiagnoseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <line x1="18" y1="18" x2="25" y2="25" />
      <line x1="9"  y1="12" x2="15" y2="12" />
      <line x1="12" y1="9"  x2="12" y2="15" />
    </svg>
  )
}

function DesignIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="14,3 25,24 3,24" />
      <line x1="14" y1="3"  x2="14" y2="24" />
      <line x1="3"  y1="17" x2="25" y2="17" />
    </svg>
  )
}

function DeliverIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="10" />
      <path d="M14 4 L14 4 C14 4 8 8 8 14 C8 19 11 22 14 23 C17 22 20 19 20 14 C20 8 14 4 14 4Z" />
      <line x1="4" y1="14" x2="24" y2="14" />
    </svg>
  )
}

function SustainIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3 C8 3 4 8 4 14 C4 20 8 25 14 25" />
      <path d="M14 25 C20 25 24 20 24 14 C24 8 20 3 14 3" strokeDasharray="3 3" />
      <polyline points="19,8 24,3 24,9" />
    </svg>
  )
}