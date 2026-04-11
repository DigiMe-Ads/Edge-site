import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Left column items ────────────────────────────────────────────────────────
const ITEMS = [
  { num: '01', title: 'Better Economic\nActivities' },
  { num: '02', title: 'Unpredictable\nFactors'      },
  { num: '03', title: 'Thought\nLeadership'         },
  { num: '04', title: 'Innovative\nSolution'        },
]

// ─── Right column stats ───────────────────────────────────────────────────────
const STATS = [
  { value: '4,541', label: 'Project Completed' },
  { value: '50',    label: 'Team Member'        },
  { value: '100',   label: 'Client Satisfaction'},
]

// ─── Fade variant ─────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function WhoWeAreSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="w-full bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_0.9fr] gap-12 lg:gap-10">

          {/* ══ COL 1: Numbered list ══ */}
          <div className="space-y-8">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.num}
                className="flex items-start gap-4"
                variants={fadeUp} custom={i * 0.1}
                initial="hidden" animate={inView ? 'visible' : 'hidden'}
              >
                {/* Large faded number */}
                <span
                  className="font-display font-bold text-gray-200 leading-none select-none flex-shrink-0"
                  style={{ fontSize: '2.6rem', lineHeight: 1 }}
                >
                  {item.num}.
                </span>

                {/* Title — separator line between num and text */}
                <div className="pt-1">
                  <div className="w-5 h-px bg-gray-300 mb-2" />
                  <h3
                    className="font-display font-bold text-gray-800 leading-snug"
                    style={{ fontSize: '0.97rem', whiteSpace: 'pre-line' }}
                  >
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ══ COL 2: Who We Are text + blockquote + signature ══ */}
          <motion.div
            variants={fadeUp} custom={0.08}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            {/* Heading */}
            <h2
              className="font-display font-extrabold text-gray-900 leading-tight mb-4"
              style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}
            >
              Who We Are
            </h2>

            {/* Lead paragraph — underlined first sentence effect */}
            <p className="text-[13.5px] text-gray-600 leading-relaxed mb-5">
              <span className="underline underline-offset-2 decoration-gray-400">
                Neglect sense of mere tranquil existence, that I neglect my talents.
                I should be incapable of drawing a single
              </span>
            </p>

            {/* Body paragraph */}
            <p className="text-[13.5px] text-gray-500 leading-relaxed mb-8">
              Exquisite sense of mere tranquil existence, that I neglect my talents.
              I should be incapable of drawing a single stroke at the present moment;
              and yet I feel that I never was a greater artist than now exquisite
              sense of mere tranquil
            </p>

            {/* Blockquote */}
            <blockquote className="relative pl-10 mb-8">
              {/* Large quotation mark */}
              <span
                className="absolute left-0 top-0 text-gray-200 font-serif select-none leading-none"
                style={{ fontSize: '4rem', lineHeight: 0.8 }}
                aria-hidden="true"
              >
                "
              </span>
              <p
                className="text-[13.5px] text-gray-500 italic leading-relaxed"
              >
                Exquisite sense of mere tranquil existence, that I neglect my talents
                should be incapable of drawing a single about
              </p>
            </blockquote>

            {/* Signature image */}
            {/*
              Place your signature image at: src/assets/signature.png
              It should be the "Michel Jhon" handwritten signature PNG.
            */}
            <img
              src="/assets/signature.png"
              alt="Michel Jhon signature"
              className="h-10 w-auto object-contain"
              style={{ filter: 'contrast(1.1)' }}
            />
          </motion.div>

          {/* ══ COL 3: Stats ══ */}
          <div className="space-y-10 lg:pl-6 lg:border-l border-gray-100">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp} custom={0.1 + i * 0.1}
                initial="hidden" animate={inView ? 'visible' : 'hidden'}
              >
                <p
                  className="font-display font-bold text-gray-900 leading-none mb-1"
                  style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)' }}
                >
                  {stat.value}
                </p>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {stat.label}
                </p>

                {/* Thin separator below each stat except last */}
                {i < STATS.length - 1 && (
                  <div className="mt-8 border-b border-gray-100" />
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}