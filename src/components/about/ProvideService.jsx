import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  {
    title: 'Possession Entire Soul Like These',
    desc:  'Enjoy with my whole heart. I am alone, and feel the charm',
  },
  {
    title: 'Feel The Chart Of Existence',
    desc:  'Enjoy with my whole heart. I am alone, and feel the charm',
  },
  {
    title: 'Existence In The Spot',
    desc:  'Enjoy with my whole heart. I am alone, and feel the charm',
  },
]

export default function ProvideServicesSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(1)

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
    >
      {/* ── Full-bleed background photo ── */}
      <img
        src="/assets/provide-service.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 bottom-0 right-0 object-cover object-center pointer-events-none select-none"
        style={{ zIndex: 0, left: '12.5%', width: '92%', height: '120%' }}
        />

      {/* ── Layout: white card left, empty right (photo visible) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 xl:px-16 py-20 lg:py-28
                      flex items-center justify-start">

        {/* White floating card */}
        <motion.div
          className="relative bg-white shadow-lg w-full lg:w-[46%] px-8 py-10 lg:px-10 lg:py-12"
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Heading */}
          <h2
            className="font-display font-extrabold text-gray-900 leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.3rem)' }}
          >
            Provide Best Services For You
          </h2>

          {/* Sub-copy */}
          <p className="text-[13.5px] text-gray-400 leading-relaxed mb-8 max-w-xs">
            Sense of mere tranquil existence, that I neglect my talents should be
            incapable of drawing a single
          </p>

          {/* Feature list */}
          <ul>
            {FEATURES.map((f, i) => {
              const isActive = active === i
              return (
                <li key={i}>
                  <button onClick={() => setActive(i)} className="w-full text-left group">
                    <div
                      className={`
                        relative flex items-start gap-5 py-5
                        border-b border-gray-100 last:border-b-0
                        transition-opacity duration-200
                        ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'}
                      `}
                    >
                      {/* Check circle */}
                      <div
                        className={`
                          flex-shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center mt-0.5
                          transition-colors duration-250
                          ${isActive ? 'border-red-400' : 'border-gray-200'}
                        `}
                      >
                        <svg
                          className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-red-500' : 'text-gray-300'}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.8}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <p className={`text-[14px] font-bold leading-snug mb-1 ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                          {f.title}
                        </p>
                        <p className="text-[13px] text-gray-400 leading-relaxed">
                          {f.desc}
                        </p>
                      </div>

                      {/* Active chevron pill — floats on the right edge of the white card */}
                      {isActive && (
                        <motion.div
                          className="absolute -right-6 top-1/2 -translate-y-1/2 z-20
                                     w-11 h-11 rounded-full bg-white shadow-md
                                     flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.22, ease: 'backOut' }}
                        >
                          <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24"
                               stroke="currentColor" strokeWidth={2.6}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </motion.div>

      </div>
    </section>
  )
}