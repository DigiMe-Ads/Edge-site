import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Top two cards ────────────────────────────────────────────────────────────
const TOP_CARDS = [
  {
    icon: <VisionIcon />,
    title: 'Our Vision',
    desc: 'To be the catalyst that transforms human potential and organizational capability into business excellence.',
  },
  {
    icon: <MissionIcon />,
    title: 'Our Mission',
    desc: 'To enable organizations to turn talent, capability, and strategic direction into competitive advantage through insight-led people systems.',
  },
]

// ─── Bottom four value cards ──────────────────────────────────────────────────
const VALUE_CARDS = [
  {
    icon: <PulseIcon />,
    title: 'Excellence with Impact',
    desc: 'Deliver measurable outcomes that strengthen performance',
  },
  {
    icon: <PartnerIcon />,
    title: 'Deep Partnership',
    desc: 'Collaborate with shared ownership and clear outcomes',
  },
  {
    icon: <BulbIcon />,
    title: 'Growth through Innovation',
    desc: 'Design forward-thinking, future-ready solutions',
  },
  {
    icon: <ArrowUpIcon />,
    title: 'Empowering Potential',
    desc: 'Unlock capability to drive performance and execution',
  },
]

// ─── Fade variant ─────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

// ─── Card backgrounds ─────────────────────────────────────────────────────────
const CARD_BG    = 'rgba(255,255,255,0.06)'
const CARD_BORDER = '1px solid rgba(255,255,255,0.09)'

// ─── Main section ─────────────────────────────────────────────────────────────
export default function OurPurposeSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="w-full py-20 lg:py-28 overflow-hidden"
      style={{ background: '#0f1724' , borderRadius: '100px 100px 0 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.h2
            className="font-display font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
            variants={fadeUp} custom={0}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            Our Purpose
          </motion.h2>
          <motion.p
            className="text-white/50 text-[14px] max-w-lg mx-auto leading-relaxed"
            variants={fadeUp} custom={0.08}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            Transforming human potential and organizational capability into business excellence.
          </motion.p>
        </div>

        {/* ── Top 2 large cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {TOP_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="rounded-2xl p-8 group hover:bg-white/[0.09] transition-colors duration-300"
              style={{ background: CARD_BG, border: CARD_BORDER }}
              variants={fadeUp} custom={0.1 + i * 0.08}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {/* Icon */}
              <div className="mb-5">
                {card.icon}
              </div>
              {/* Title */}
              <h3 className="font-display font-bold text-white text-[1.15rem] mb-3">
                {card.title}
              </h3>
              {/* Desc */}
              <p className="text-white/50 text-[13.5px] leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom 4 smaller cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="rounded-2xl p-6 group hover:bg-white/[0.09] transition-colors duration-300"
              style={{ background: CARD_BG, border: CARD_BORDER }}
              variants={fadeUp} custom={0.22 + i * 0.07}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {/* Icon */}
              <div className="mb-4">
                {card.icon}
              </div>
              {/* Title */}
              <h4 className="font-display font-bold text-white text-[0.9rem] mb-2 leading-snug">
                {card.title}
              </h4>
              {/* Desc */}
              <p className="text-white/45 text-[12.5px] leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Icons — red outlined style ───────────────────────────────────────────────
function VisionIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" stroke="#e53e3e" strokeWidth="1.8" />
      <circle cx="16" cy="16" r="8"  stroke="#e53e3e" strokeWidth="1.8" />
      <circle cx="16" cy="16" r="3"  fill="#e53e3e" />
    </svg>
  )
}

function MissionIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 4 L16 4 C16 4 8 10 8 18 C8 22.4 11.6 26 16 26 C20.4 26 24 22.4 24 18 C24 10 16 4 16 4Z"
        stroke="#e53e3e" strokeWidth="1.8" strokeLinejoin="round"
      />
      <path d="M12 18 L15 21 L21 15" stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PulseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline
        points="2,14 6,14 9,6 12,20 15,10 18,14 24,14"
        stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

function PartnerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9"  cy="8"  r="4" stroke="#e53e3e" strokeWidth="1.8" />
      <circle cx="18" cy="8"  r="4" stroke="#e53e3e" strokeWidth="1.8" />
      <path d="M2 22 C2 18 5.5 15 9 15" stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 22 C24 18 20.5 15 17 15" stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 15 C9 15 13 18 17 15" stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function BulbIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 3 C8.6 3 5 6.6 5 11 C5 14 6.8 16.6 9.4 17.8 L9.4 20 C9.4 20.6 9.8 21 10.4 21 L15.6 21 C16.2 21 16.6 20.6 16.6 20 L16.6 17.8 C19.2 16.6 21 14 21 11 C21 6.6 17.4 3 13 3Z"
        stroke="#e53e3e" strokeWidth="1.8" strokeLinejoin="round"
      />
      <line x1="10" y1="23" x2="16" y2="23" stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="3,18 9,10 14,14 22,6" stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17,6 22,6 22,11"      stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}