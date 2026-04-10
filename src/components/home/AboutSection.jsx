import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Skill bar data ───────────────────────────────────────────────────────────
const SKILLS = [
  { label: 'Consulting', pct: 85 },
  { label: 'Marketing',  pct: 68 },
]

// ─── Checklist items ──────────────────────────────────────────────────────────
const POINTS = [
  'Neglect should be incapable of drawing',
  'Present moment yet feel that',
  'Greater artist than now while the lovely valley',
]

// ─── Animated skill bar ───────────────────────────────────────────────────────
function SkillBar({ label, pct, delay }) {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="mb-6">
      <p className="text-[13px] font-semibold text-gray-800 mb-2">{label}</p>
      {/* Track */}
      <div className="relative h-[3px] bg-gray-200 rounded-full overflow-hidden">
        {/* Fill */}
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ background: '#d32f2f' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

// ─── Fade-up variant ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AboutSection() {
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="w-full bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Text content ── */}
          <div>
            {/* Eyebrow */}
            <motion.p
              className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600 mb-4"
              variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              About Us
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="font-display font-extrabold leading-[1.08] text-gray-900 mb-5"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}
              variants={fadeUp} custom={0.08} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              We are Business Consulting Agency.
            </motion.h2>

            {/* Body copy */}
            <motion.p
              className="text-gray-500 text-[15px] leading-relaxed mb-8 max-w-md"
              variants={fadeUp} custom={0.16} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              Sense of mere tranquil existence, that I neglect my talents should be
              incapable of drawing single
            </motion.p>

            {/* Check list */}
            <motion.ul
              className="space-y-3 mb-10"
              variants={fadeUp} custom={0.22} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {POINTS.map((pt) => (
                <li key={pt} className="flex items-start gap-3">
                  {/* Circle-check icon */}
                  <svg
                    className="w-[18px] h-[18px] flex-shrink-0 mt-[1px] text-red-600"
                    viewBox="0 0 20 20" fill="none"
                  >
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <path
                      d="M6.5 10.2l2.3 2.3 4.7-4.7"
                      stroke="currentColor" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[14px] text-gray-600 leading-snug">{pt}</span>
                </li>
              ))}
            </motion.ul>

            {/* Skill bars */}
            <motion.div
              className="mb-10"
              variants={fadeUp} custom={0.3} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {SKILLS.map((s, i) => (
                <SkillBar key={s.label} label={s.label} pct={s.pct} delay={0.35 + i * 0.15} />
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.div
              variants={fadeUp} custom={0.38} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              <a
                href="#"
                className="inline-block bg-gray-900 text-white text-[11px] font-bold uppercase tracking-[0.16em] px-7 py-4 hover:bg-red-600 transition-colors duration-300"
              >
                More About
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: Image with decorative elements ── */}
          <motion.div
            className="relative flex justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Large faint circle ring — sits behind the photo */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '88%',
                paddingBottom: '88%',
                top: '50%',
                left: '50%',
                transform: 'translate(-58%, -50%)',
                border: '1px solid rgba(180,180,200,0.30)',
                borderRadius: '9999px',
                zIndex: 0,
              }}
            />

            {/* Soft pink blob behind image — bottom-left of photo */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '55%',
                paddingBottom: '60%',
                bottom: '-6%',
                left: '-2%',
                background: 'rgba(220,60,60,0.07)',
                borderRadius: '9999px',
                filter: 'blur(2px)',
                zIndex: 0,
              }}
            />

            {/* Blue dot */}
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                width: 44,
                height: 44,
                bottom: '18%',
                left: '-1%',
                background: '#1b3a6b',
                zIndex: 2,
              }}
            />

            {/* Brown/terracotta small dot */}
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                width: 18,
                height: 18,
                bottom: 'calc(18% + 52px)',
                left: '2%',
                background: '#8b5a4a',
                zIndex: 2,
              }}
            />

            {/* The photo */}
            <div
              className="relative overflow-hidden rounded-sm"
              style={{ width: '97%', zIndex: 1 }}
            >
              
              <img
                src="/assets/home-about.png"
                alt="Business consultant working"
                className="w-full h-full object-cover object-center block"
                style={{ aspectRatio: '4/4.2' }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}