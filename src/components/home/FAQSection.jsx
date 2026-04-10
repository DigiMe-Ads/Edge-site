import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Possession of my entire soul, like sweet mornings',
    a: 'Enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my friend, so absorbed in the exquisite sense of mere tranquil.',
    defaultOpen: true,
  },
  {
    q: 'Sense of mere tranquil existence, that I my talents',
    a: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast.',
    defaultOpen: false,
  },
  {
    q: 'Entire soul, like these sweet mornings of spring',
    a: 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
    defaultOpen: false,
  },
]

// ─── Single accordion item ────────────────────────────────────────────────────
function AccordionItem({ item, index, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span
          className={`text-[15px] font-semibold leading-snug transition-colors duration-200
            ${isOpen ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-900'}`}
        >
          {item.q}
        </span>

        {/* +/- button — outlined circle */}
        <span
          className={`
            flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center
            transition-colors duration-200
            ${isOpen
              ? 'border-red-500 text-red-500'
              : 'border-gray-300 text-gray-400 group-hover:border-gray-500 group-hover:text-gray-600'}
          `}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"
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
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[14px] text-gray-500 leading-relaxed pb-5 pr-10 max-w-xl">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0) // first item open by default

  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleToggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section ref={ref} className="w-full bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: circular photo ── */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Faint large circle ring behind photo */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '90%',
                paddingBottom: '90%',
                border: '1px solid rgba(180,180,200,0.22)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Soft blush blob bottom-left */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '75%',
                paddingBottom: '75%',
                background: 'rgba(220,60,60,0.06)',
                bottom: '-8%',
                left: '-8%',
                filter: 'blur(2px)',
              }}
            />

            {/* Circular photo */}
            <div
              className="relative overflow-show rounded-full"
              style={{ width: '100%', paddingBottom: '82%' }}
            >
              
              <img
                src="/assets/faq-photo.png"
                alt="FAQ — our consultant"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>

            {/* Red small dot */}
            <div
              className="absolute rounded-full bg-red-600"
              style={{ width: 14, height: 14, top: '18%', right: '12%' }}
            />

            {/* Navy large dot */}
            <div
              className="absolute rounded-full"
              style={{
                width: 44, height: 44,
                background: '#1b3a6b',
                top: 'calc(18% + 20px)',
                right: '9%',
              }}
            />
          </motion.div>

          {/* ── RIGHT: text + accordion ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Eyebrow */}
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-red-600 mb-4">
              FAQ
            </p>

            {/* Heading */}
            <h2
              className="font-display font-extrabold text-gray-900 leading-[1.08] mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
            >
              Provide Best Services<br />For You
            </h2>

            {/* Sub-copy */}
            <p className="text-[14px] text-gray-400 leading-relaxed mb-8 max-w-md">
              Sense of mere tranquil existence, that I neglect my talents should
              be incapable of drawing a single
            </p>

            {/* Accordion */}
            <div className="w-full">
              {FAQS.map((item, i) => (
                <AccordionItem
                  key={i}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}