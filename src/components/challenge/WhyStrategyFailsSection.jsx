import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Key challenges — straight from the source content ───────────────────────
const CHALLENGES = [
  { icon: <TargetIcon />,  text: 'Strategy does not translate into execution' },
  { icon: <PeopleIcon />,  text: 'Talent and structure are not aligned to priorities' },
  { icon: <TrendIcon />,   text: 'Leadership capability does not match ambition' },
  { icon: <GearIcon />,    text: 'Operational inefficiencies reduce performance' },
  { icon: <CompassIcon />, text: 'Culture and incentives do not drive results' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function WhyStrategyFailsSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="w-full py-20 lg:py-28 overflow-hidden"
      style={{ background: '#f4f4f6' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10 xl:px-16">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.p
            className="text-[11px] font-bold uppercase tracking-[0.24em] text-red-600 mb-3"
            variants={fadeUp} custom={0}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            The Challenge
          </motion.p>
          <motion.h2
            className="font-display font-extrabold text-gray-900 leading-[1.08]"
            style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)' }}
            variants={fadeUp} custom={0.07}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            Key Challenges We Address
          </motion.h2>
        </div>

        {/* ── Challenge cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-14">
          {CHALLENGES.map((item, i) => (
            <motion.div
              key={item.text}
              className="bg-white p-6 flex flex-col items-center text-center
                         shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              variants={fadeUp} custom={0.12 + i * 0.07}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              <div
                className="w-14 h-14 flex items-center justify-center mb-5 text-red-600"
                style={{ background: 'rgba(239,68,68,0.08)' }}
              >
                {item.icon}
              </div>
              <p className="text-[13.5px] text-gray-700 font-medium leading-snug">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Statement ── */}
        <motion.div
          className="px-8 py-10 bg-red-600 text-center"
          variants={fadeUp} custom={0.5}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
        >
          <p
            className="text-white font-display font-bold leading-snug max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1.15rem, 2vw, 1.5rem)' }}
          >
            "Strategy does not fail because of vision. It fails because of misalignment."
          </p>
        </motion.div>

      </div>
    </section>
  )
}

// ─── Icons — dark grey outlined ───────────────────────────────────────────────
function TargetIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="11" />
      <circle cx="14" cy="14" r="6" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PeopleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="8" r="4" />
      <circle cx="20" cy="8" r="3" />
      <path d="M2 24c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <path d="M20 13c2.8 0 5 2.2 5 6" />
    </svg>
  )
}

function TrendIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3,20 9,12 14,16 22,7" />
      <polyline points="17,7 22,7 22,12" />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="4" />
      <path d="M14 3v3M14 22v3M3 14h3M22 14h3M6.2 6.2l2.1 2.1M19.7 19.7l2.1 2.1M6.2 21.8l2.1-2.1M19.7 8.3l2.1-2.1" />
    </svg>
  )
}

function CompassIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="11" />
      <polygon points="18,10 15.5,15.5 10,18 12.5,12.5" />
    </svg>
  )
}
