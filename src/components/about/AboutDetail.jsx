import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Skill bars ───────────────────────────────────────────────────────────────
const SKILLS = [
  { label: 'Consulting', pct: 82 },
  { label: 'Marketing',  pct: 65 },
]

const POINTS = [
  'Neglect should be incapable of drawing',
  'Present moment yet feel that',
  'Greater artist than now while the lovely valley',
]

// ─── Animated skill bar ───────────────────────────────────────────────────────
function SkillBar({ label, pct, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="mb-5">
      <p className="text-[12.5px] font-semibold text-gray-700 mb-1.5">{label}</p>
      <div className="h-[3px] bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-red-600"
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

// ─── Fade variants ────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function AboutDetailSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [playing, setPlaying] = useState(false)

  return (
    <section ref={ref} className="w-full bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: image with overlays ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Decorative grey rectangle behind/offset */}
            <div
              className="absolute pointer-events-none rounded-sm bg-gray-100"
              style={{ width: '88%', height: '92%', top: '-5%', left: '-4%', zIndex: 0 }}
            />

            {/* Main photo */}
            <div className="relative overflow-hidden rounded-sm" style={{ zIndex: 1 }}>
              {/*
                Place your image at: src/assets/about-detail.jpg
                Should be the two women photo from the design.
              */}
              <img
                src="/assets/about-detail.png"
                alt="About our agency"
                className="w-full object-cover object-center block"
                style={{ aspectRatio: '3/3.8' }}
              />

              {/* Bottom-left script text overlay */}
              <div
                className="absolute bottom-8 left-6 pointer-events-none select-none"
                style={{ zIndex: 3 }}
              >
                <p
                  className="text-white font-bold leading-none"
                  style={{
                    fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                    textShadow: '0 2px 12px rgba(0,0,0,0.35)',
                  }}
                >
                  Business
                </p>
              </div>
            </div>

            {/* Play button — bottom right, overlapping image edge */}
            <button
              onClick={() => setPlaying(true)}
              className="absolute z-10 flex items-center justify-center
                         w-12 h-12 rounded-full bg-white border border-red-500
                         shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-250
                         group"
              style={{ bottom: '-16px', right: '12%' }}
              aria-label="Play video"
            >
              <svg
                className="w-4 h-4 text-red-500 ml-0.5 group-hover:text-red-600 transition-colors"
                fill="currentColor" viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </motion.div>

          {/* ── RIGHT: text content ── */}
          <div>
            {/* Heading */}
            <motion.h2
              className="font-display font-extrabold text-gray-900 leading-[1.08] mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)' }}
              variants={fadeUp} custom={0.05}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              Number One Corporate Agency
            </motion.h2>

            {/* Sub-copy */}
            <motion.p
              className="text-[14px] text-gray-400 leading-relaxed mb-6 max-w-sm"
              variants={fadeUp} custom={0.12}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              Sense of mere tranquil existence, that I neglect my talents should be
              incapable of drawing single
            </motion.p>

            {/* Numbered list */}
            <motion.ol
              className="space-y-2 mb-8"
              variants={fadeUp} custom={0.18}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {POINTS.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-[13.5px] text-gray-600">
                  <span className="flex-shrink-0 font-semibold text-gray-700">{i + 1}.</span>
                  {pt}
                </li>
              ))}
            </motion.ol>

            {/* Skill bars */}
            <motion.div
              className="mb-9"
              variants={fadeUp} custom={0.24}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {SKILLS.map((s, i) => (
                <SkillBar key={s.label} label={s.label} pct={s.pct} delay={0.3 + i * 0.15} />
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.div
              variants={fadeUp} custom={0.3}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              <a
                href="#"
                className="inline-block bg-gray-900 text-white text-[11px] font-bold
                           uppercase tracking-[0.18em] px-7 py-4
                           hover:bg-red-600 transition-colors duration-300"
              >
                Get a Service
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}