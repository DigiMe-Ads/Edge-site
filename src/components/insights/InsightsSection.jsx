import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Card data ────────────────────────────────────────────────────────────────
const CARDS = [
  { label: 'Industry reports',   img: '/assets/insights-1.jpg' },
  { label: 'Research articles',  img: '/assets/insights-2.jpg' },
  { label: 'Case studies',       img: '/assets/insights-3.jpg' },
  { label: 'Blogs',              img: '/assets/insights-4.jpg' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function InsightsSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="w-full bg-white py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">

        {/* ── Header row: heading left, COMING SOON badge right ── */}
        <motion.div
          className="flex items-start justify-between gap-6 mb-10"
          variants={fadeUp} custom={0}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
        >
          <div>
            <h2
              className="font-display font-extrabold text-gray-900 leading-tight mb-1"
              style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)' }}
            >
              Insights &amp; Thought Leadership
            </h2>
            <p className="text-[13px] text-gray-400">
              Stay ahead with our latest research and reports.
            </p>
          </div>

          {/* COMING SOON pill */}
          <div
            className="flex-shrink-0 self-start px-3 py-1.5 rounded-sm border border-red-500 rounded-3xl"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-600 ">
              Coming Soon
            </span>
          </div>
        </motion.div>

        {/* ── 4 image cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              variants={fadeUp} custom={0.08 + i * 0.08}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {/* Image — rounded corners */}
              <div
                className="overflow-hidden mb-3 group cursor-pointer"
                style={{ borderRadius: '0.75rem', aspectRatio: '1/0.85' }}
              >
                <img
                  src={card.img}
                  alt={card.label}
                  className="w-full h-full object-cover object-center
                             transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>

              {/* Label */}
              <p className="text-[13px] font-semibold text-gray-500 hover:text-red-600
                            transition-colors duration-200 cursor-pointer">
                {card.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom centred tagline ── */}
        <motion.p
          className="text-center text-[13.5px] text-gray-500 leading-relaxed"
          variants={fadeUp} custom={0.38}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
        >
          To position EDGE as a thought leader in business transformation and performance
        </motion.p>

      </div>
    </section>
  )
}