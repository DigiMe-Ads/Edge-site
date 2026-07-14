import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── 4 step data ──────────────────────────────────────────────────────────────
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

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

const CARD_STYLE = {
  background: 'rgba(255,255,255,0.04)',
  border:     '1px solid rgba(255,255,255,0.08)',
}

const AUTO_ADVANCE_MS = 4500

export default function DeliveryMethodologySection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)

  // Auto-advance through the steps once the section is in view; restarts
  // whenever the user manually selects a step.
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), AUTO_ADVANCE_MS)
    return () => clearTimeout(t)
  }, [inView, active])

  return (
    <section
      ref={ref}
      className="w-full py-20 lg:py-28 overflow-hidden"
      style={{ background: '#0d1526' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">

        {/* ── Header row ── */}
        <div className="mb-14">
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
              A disciplined 4-step framework for measurable business outcomes.
            </p>
          </motion.div>
        </div>

        {/* ── Interactive stepper ── */}
        <motion.div
          className="relative flex items-start justify-between mb-3"
          variants={fadeUp} custom={0.1}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
        >
          <div className="absolute top-5 left-0 right-0 h-px bg-white/10" aria-hidden="true" />
          {STEPS.map((step, i) => {
            const isActive = active === i
            const isPast   = i < active
            return (
              <button
                key={step.num}
                onClick={() => setActive(i)}
                className="relative z-10 flex flex-col items-center gap-3 flex-1 group cursor-pointer"
                aria-label={`Show step ${i + 1}: ${step.title}`}
              >
                <span
                  className={`w-10 h-10 flex items-center justify-center font-display font-bold text-[13px] transition-all duration-300 ${
                    isActive
                      ? 'bg-red-600 text-white scale-110'
                      : isPast
                      ? 'bg-red-600/30 text-white'
                      : 'bg-white/5 text-white/40 group-hover:bg-white/10'
                  }`}
                  style={{ border: isActive ? 'none' : '1px solid rgba(255,255,255,0.15)' }}
                >
                  {step.num}
                </span>
                <span
                  className={`text-[11.5px] font-semibold uppercase tracking-wider transition-colors duration-300 hidden sm:block ${
                    isActive ? 'text-white' : 'text-white/35 group-hover:text-white/60'
                  }`}
                >
                  {step.title}
                </span>
                {/* Progress bar — fills while this step is active */}
                <div className="w-full max-w-[80px] h-[2px] bg-white/5 overflow-hidden hidden sm:block">
                  {isActive && (
                    <motion.div
                      key={active}
                      className="h-full bg-red-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </div>
              </button>
            )
          })}
        </motion.div>

        {/* ── Detail panel — swaps content on step change ── */}
        <div className="mb-14 mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="p-8 lg:p-10 flex flex-col sm:flex-row items-start gap-6"
              style={CARD_STYLE}
            >
              <div
                className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-red-500"
                style={{ background: 'rgba(220,60,60,0.12)' }}
              >
                {STEPS[active].icon}
              </div>
              <div>
                <p className="text-red-500 font-display font-extrabold text-[0.85rem] uppercase tracking-[0.2em] mb-2">
                  Step {STEPS[active].num}
                </p>
                <h3 className="font-display font-extrabold text-white text-[1.5rem] mb-3">
                  {STEPS[active].title}
                </h3>
                <p className="text-white/55 text-[14.5px] leading-relaxed max-w-xl">
                  {STEPS[active].desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom badges ── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          variants={fadeUp} custom={0.4}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
        >
          {BADGES.map((badge) => (
            <div key={badge} className="flex items-center gap-2.5">
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
