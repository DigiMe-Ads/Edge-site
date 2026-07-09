import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const POINTS = [
  'Align leadership, capability, and execution',
  'Drive sustainable growth and competitive advantage',
  'Partner with Catalysts of Transformation',
]

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function CtaBannerSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ minHeight: 560 }}
    >
      
      <img
        src="/assets/cta-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-top
                   pointer-events-none select-none"
        style={{ zIndex: 0 }}
      />

      
      <div
        className="absolute pointer-events-none select-none"
        style={{ top: 90, right: 0, width: '22%', maxWidth: 280, zIndex: 2 }}
        aria-hidden="true"
      >
        <img src="/assets/shape-red-top.png" alt="" className="w-full h-auto" />
      </div>

      {/* ── Content ── */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto
                   px-6 lg:px-10 xl:px-16 py-24 lg:py-32
                   flex items-center"
      >
        {/* Right-half text block */}
        <div className="w-full lg:w-1/2 lg:ml-auto">

          <motion.h2
            className="font-display font-extrabold text-white leading-[1.08] mb-5"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.7rem)' }}
            variants={fadeUp} custom={0}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            Let's Build the Future<br />of Your Business
          </motion.h2>

          <motion.p
            className="text-white/65 text-[14px] leading-relaxed mb-6 max-w-sm"
            variants={fadeUp} custom={0.1}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            Partner with us to align your strategy, talent, and execution for
            measurable results.
          </motion.p>

          <motion.p
            className="text-white font-semibold text-[15px] mb-4"
            variants={fadeUp} custom={0.18}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            Why Partner With EDGE
          </motion.p>

          <motion.ul
            className="space-y-3 mb-10"
            variants={fadeUp} custom={0.24}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            {POINTS.map((pt) => (
              <li key={pt} className="flex items-center gap-3">
                <svg className="w-4 h-4 flex-shrink-0 text-green-400"
                     fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white/80 text-[13.5px]">{pt}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="flex flex-wrap gap-4"
            variants={fadeUp} custom={0.32}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            <Link to="/services"
               className="inline-block bg-white text-gray-900 text-[11px] font-bold
                          uppercase tracking-[0.16em] px-7 py-4
                          hover:bg-gray-100 transition-colors duration-300">
              Explore Our Services
            </Link>
            <Link to="/contact"
               className="inline-block bg-red-600 text-white text-[11px] font-bold
                          uppercase tracking-[0.16em] px-7 py-4
                          hover:bg-red-700 transition-colors duration-300">
              Book a Consultation
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}