import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Accordion items ──────────────────────────────────────────────────────────
const ACCORDION = [
  {
    q: 'Strategy does not translate into execution',
    a: 'We bridge the gap between high-level vision and daily operations through performance architecture and disciplined governance.',
  },
  {
    q: 'Talent and structure are not aligned to priorities',
    a: 'Misaligned talent costs businesses significantly. We realign roles, capabilities, and structure to strategic intent.',
  },
  {
    q: 'Leadership capability does not match ambition',
    a: 'Leaders are often promoted without being equipped. We develop leadership capacity that matches organizational ambition.',
  },
]

// ─── Right grid cards ─────────────────────────────────────────────────────────
const GRID_CARDS = [
  {
    icon: <PeopleIcon />,
    text: 'Talent misalignment costs businesses millions annually.',
    col: 1, row: 1,
  },
  {
    icon: <GearIcon />,
    text: 'Operating models often lag behind strategic pivots.',
    col: 2, row: 1,
  },
  {
    icon: <TrendIcon />,
    text: 'Execution discipline is the rarest skill in leadership.',
    col: 1, row: 2,
  },
  {
    icon: <ShieldIcon />,
    text: 'Culture eats strategy for breakfast without alignment.',
    col: 2, row: 2,
  },
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
  const [open, setOpen] = useState(0)

  return (
    <section
      ref={ref}
      className="w-full py-20 lg:py-28 overflow-hidden"
      style={{ background: '#f4f4f6' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ══ LEFT ══ */}
          <div>
            {/* Eyebrow */}
            <motion.p
              className="text-[11px] font-bold uppercase tracking-[0.24em] text-red-600 mb-3"
              variants={fadeUp} custom={0}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              The Challenge
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="font-display font-extrabold text-gray-900 leading-[1.08] mb-8"
              style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)' }}
              variants={fadeUp} custom={0.07}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              Why Strategy Fails in Organizations
            </motion.h2>

            {/* Accordion */}
            <motion.div
              className="mb-6"
              variants={fadeUp} custom={0.13}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {ACCORDION.map((item, i) => {
                const isOpen = open === i
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl mb-3 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4
                                 px-6 py-5 text-left group"
                    >
                      <span className={`text-[14px] font-semibold leading-snug transition-colors
                                        ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}>
                        {item.q}
                      </span>
                      {/* +/– icon */}
                      <span
                        className={`flex-shrink-0 w-6 h-6 flex items-center justify-center
                                    transition-colors duration-200
                                    ${isOpen ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-600'}`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" strokeWidth={2.5}>
                          {isOpen
                            ? <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                            : <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          }
                        </svg>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-[13.5px] text-gray-500 leading-relaxed">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </motion.div>

            {/* Red quote card */}
            <motion.div
              className="rounded-2xl px-7 py-6 bg-red-600"
              variants={fadeUp} custom={0.2}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              <p className="text-white font-display font-bold leading-snug"
                 style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}>
                "Strategy does not fail because of vision. It fails because of misalignment."
              </p>
            </motion.div>
          </div>

          {/* ══ RIGHT: 2×2 card grid ══ */}
          <div
            className="grid grid-cols-2 gap-4 items-start"
            style={{ gridTemplateRows: 'auto auto' }}
          >
            {GRID_CARDS.map((card, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm
                           hover:shadow-md transition-shadow duration-250"
                variants={fadeUp} custom={0.1 + i * 0.08}
                initial="hidden" animate={inView ? 'visible' : 'hidden'}
                style={{
                  // Stagger: col-1 cards sit higher, col-2 cards offset down
                  marginTop: card.col === 2 ? 32 : 0,
                }}
              >
                {/* Icon */}
                <div className="mb-4 text-gray-500">
                  {card.icon}
                </div>
                {/* Text */}
                <p className="text-[13.5px] text-gray-600 leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Icons — dark grey outlined ───────────────────────────────────────────────
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

function GearIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="4" />
      <path d="M14 3v3M14 22v3M3 14h3M22 14h3M6.2 6.2l2.1 2.1M19.7 19.7l2.1 2.1M6.2 21.8l2.1-2.1M19.7 8.3l2.1-2.1" />
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

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3L5 7v7c0 5 4 9.3 9 10.5C19 23.3 23 19 23 14V7L14 3z" />
      <path d="M10 14l3 3 5-5" />
    </svg>
  )
}