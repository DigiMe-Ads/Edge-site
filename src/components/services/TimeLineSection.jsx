import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Timeline data ────────────────────────────────────────────────────────────
const MILESTONES = [
  {
    year:  '2016',
    title: 'Started company',
    desc:  'Serenity has taken possession of my entire soul, like these',
  },
  {
    year:  '2017',
    title: 'Open new office',
    desc:  'Serenity has taken possession of my entire soul, like these',
  },
  {
    year:  '2018',
    title: 'Reach a milestone',
    desc:  'Serenity has taken possession of my entire soul, like these',
  },
  {
    year:  '2020',
    title: 'Business award',
    desc:  'Serenity has taken possession of my entire soul, like these',
  },
]

// ─── Main section ─────────────────────────────────────────────────────────────
export default function TimelineSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="w-full bg-white py-16 lg:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* ── Outer grid: 4 equal columns ── */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-0">

          {/* ── Continuous horizontal line behind all dots ──
              Spans from the centre of col-1's dot to the centre of col-4's dot.
              Positioned at the dot row height (top of content + year label ~24px + gap ~16px = ~40px from top of row container).
          ── */}
          <motion.div
            className="absolute hidden lg:block top-[38px] left-[12.5%] right-[12.5%] h-px bg-gray-200"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />

          {/* ── Each milestone ── */}
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year}
              className="flex flex-col items-center text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Year label */}
              <p className="text-[13px] font-medium text-gray-400 tracking-wide mb-3">
                {m.year}
              </p>

              {/* Dot — sits on the line */}
              <div className="relative z-10 w-3 h-3 rounded-full bg-gray-300 ring-4 ring-white mb-5 flex-shrink-0" />

              {/* Title */}
              <h3 className="font-display font-bold text-gray-900 text-[1rem] mb-2 leading-snug">
                {m.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-gray-400 leading-relaxed max-w-[180px]">
                {m.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}