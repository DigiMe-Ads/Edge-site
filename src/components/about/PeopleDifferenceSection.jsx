import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PILLARS = [
  { title: 'Impact',  sub: 'Measurable Outcomes'   },
  { title: 'Growth',  sub: 'Sustainable Scalability' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function PeopleDifferentiatorSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="w-full bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: rounded image + red dot ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Rounded photo */}
            <div className="overflow-hidden" style={{ borderRadius: '1.75rem' }}>
              {/*
                Place image at: src/assets/people-diff.jpg
                The overhead desk/laptops photo.
              */}
              <img
                src="/assets/people-diff.png"
                alt="People are the differentiator"
                className="w-full object-cover object-center block"
                style={{ aspectRatio: '1/1.05' }}
              />
            </div>

            {/* Red filled circle — overlaps bottom-right of the image */}
            <motion.div
              className="absolute rounded-full bg-red-600"
              style={{
                width: 56, height: 56,
                bottom: '10%',
                right: '-4%',
                zIndex: 2,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.5, ease: 'backOut' }}
            />
          </motion.div>

          {/* ── RIGHT: text content ── */}
          <div>
            {/* Eyebrow */}
            <motion.p
              className="text-[11px] font-bold uppercase tracking-[0.24em] text-red-600 mb-4"
              variants={fadeUp} custom={0.05}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              Who We Are
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="font-display font-extrabold text-gray-900 leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)' }}
              variants={fadeUp} custom={0.1}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              People are the differentiator between organizations that thrive and fall behind.
            </motion.h2>

            {/* Body para 1 */}
            <motion.p
              className="text-[14px] text-gray-500 leading-relaxed mb-4"
              variants={fadeUp} custom={0.15}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              In today's fast-changing world, organizations need more than HR support; they
              need a transformation engine that turns talent into{' '}
              <strong className="text-gray-800 font-semibold">Measurable Business Outcomes</strong>.
            </motion.p>

            {/* Body para 2 */}
            <motion.p
              className="text-[14px] text-gray-500 leading-relaxed mb-6"
              variants={fadeUp} custom={0.2}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              We are more than consultants – we are Catalysts of Transformation. We collaborate
              with leaders to bridge the gap between people strategy and business strategy.
            </motion.p>

            {/* Pull quote — red left border */}
            <motion.blockquote
              className="border-l-4 border-red-600 pl-4 mb-8"
              variants={fadeUp} custom={0.25}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              <p className="text-[14px] text-gray-600 italic leading-relaxed">
                "Because true value is not in plans – it's in results."
              </p>
            </motion.blockquote>

            {/* Two-column pillar cards */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={fadeUp} custom={0.3}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="border border-gray-100 rounded-sm px-5 py-4
                             hover:border-red-200 hover:shadow-sm transition-all duration-250"
                >
                  <p className="text-[15px] font-display font-bold text-red-600 mb-1">
                    {p.title}
                  </p>
                  <p className="text-[12px] text-gray-400 font-medium">
                    {p.sub}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}