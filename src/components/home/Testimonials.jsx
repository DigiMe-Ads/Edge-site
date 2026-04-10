import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Testimonial data ─────────────────────────────────────────────────────────
const TESTIMONIALS = [
  [
    {
      quote: 'Meridian sun strikes the upper surface of the way impenetrable foliage of my trees, and but a few gleams steal into the inner sanctuary strikes the upper surface of the way impenetrable foliage of my trees gleams steal strikes the upper surface foliage of my trees',
      name: 'Gornal Nagla',
      role: 'Business Owner',
    },
    {
      quote: 'Meridian sun strikes the upper surface of the way impenetrable foliage of my trees, and but a few gleams steal into the inner sanctuary strikes the upper surface of the way impenetrable foliage of my trees gleams steal strikes the upper surface foliage of my trees',
      name: 'John Doe',
      role: 'Founder',
    },
  ],
  [
    {
      quote: 'A wonderful experience from start to finish. The team delivered outstanding results that exceeded our expectations and transformed our business in ways we never imagined possible.',
      name: 'Sarah Mitchell',
      role: 'Marketing Director',
    },
    {
      quote: 'Their expertise in consultancy is unmatched. From strategy to execution, every step was handled with precision and professionalism. I would recommend them to any business.',
      name: 'James Carter',
      role: 'CEO',
    },
  ],
  [
    {
      quote: 'Working with this team was a game-changer for our company. They brought fresh ideas, deep industry knowledge, and a commitment to excellence that made all the difference.',
      name: 'Emily Ross',
      role: 'Operations Manager',
    },
    {
      quote: 'Exceptional service and results. The level of attention to detail and dedication shown by the team is something truly rare. Our growth metrics speak for themselves.',
      name: 'David Kim',
      role: 'Product Lead',
    },
  ],
]

// ─── Slide variants ───────────────────────────────────────────────────────────
const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.3 } }),
}

// ─── Single testimonial card ──────────────────────────────────────────────────
function TestimonialCard({ item }) {
  return (
    <div className="flex flex-col items-center text-center px-4 lg:px-10">
      {/* Quote text */}
      <p className="text-gray-500 text-[15px] leading-[1.9] mb-8 max-w-[480px]">
        {item.quote}
      </p>

      {/* Name | Role */}
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800">
          {item.name}
        </span>
        <span className="text-gray-300 text-lg leading-none">|</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
          {item.role}
        </span>
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-60px' })
  const [[page, direction], setPage] = useState([0, 0])

  const total   = TESTIMONIALS.length
  const current = TESTIMONIALS[page]

  const navigate = (dir) => {
    setPage(([p]) => {
      const next = (p + dir + total) % total
      return [next, dir]
    })
  }

  return (
    <section ref={ref} className="w-full bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <motion.p
            className="text-[11px] font-bold uppercase tracking-[0.26em] text-red-600 mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Testimonials
          </motion.p>
          <motion.h2
            className="font-display font-extrabold text-gray-900"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            What Our Clients Say
          </motion.h2>
        </div>

        {/* ── Slider row: PREV | two cards | NEXT ── */}
        <div className="relative flex items-center gap-2 lg:gap-4">

          {/* PREV button — far left */}
          <button
            onClick={() => navigate(-1)}
            className="flex-shrink-0 flex items-center gap-2 text-[11px] font-bold
                       uppercase tracking-[0.18em] text-gray-700 hover:text-red-600
                       transition-colors duration-200 group"
            aria-label="Previous testimonials"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Animated slide area */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6"
              >
                {current.map((item, i) => (
                  <TestimonialCard key={i} item={item} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* NEXT button — far right */}
          <button
            onClick={() => navigate(1)}
            className="flex-shrink-0 flex items-center gap-2 text-[11px] font-bold
                       uppercase tracking-[0.18em] text-gray-700 hover:text-red-600
                       transition-colors duration-200 group"
            aria-label="Next testimonials"
          >
            <span className="hidden sm:inline">Next</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </button>

        </div>

        {/* ── Dot indicators ── */}
        <div className="flex justify-center gap-2 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > page ? 1 : -1])}
              className="transition-all duration-300 rounded-full"
              style={{
                width:  i === page ? 24 : 8,
                height: 8,
                background: i === page ? '#d32f2f' : '#e5e7eb',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}