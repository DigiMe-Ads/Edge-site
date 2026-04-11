import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Leader data ──────────────────────────────────────────────────────────────
const LEADERS = [
  {
    name:  'Prasangani Perera',
    role:  'Director | Co-Founder',
    img:   '/assets/leader-1.png',
    credentials: [
      'MBA – Cardiff Metropolitan University, UK',
      'Associate Member – CIPM, Sri Lanka',
      'Advanced Diploma – City & Guilds, UK',
    ],
    bio:  'A strategic HR and business transformation leader with over 15 years of experience in aligning people strategies with business objectives.',
    tags: ['Digitalization', 'Governance', 'HR Strategy'],
  },
  {
    name:  'Samadhi Perera',
    role:  'Director | Co-Founder',
    img:   '/assets/leader-1.png',
    credentials: [
      'MSc in HRM & Development – Salford, UK',
      'Associate Member – CIPM, Sri Lanka',
      'Executive Cert in HR Analytics – CIPM',
    ],
    bio:  'A seasoned leader in culture transformation and organizational development with over two decades of cross-industry experience.',
    tags: ['Culture', 'Leadership', 'HR Analytics'],
  },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

// ─── Single leader card pair (photo + credentials side by side) ───────────────
function LeaderCard({ leader, index, inView }) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-6 items-start"
      variants={fadeUp} custom={0.1 + index * 0.12}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
    >
      {/* ── Photo card ── */}
      <div className="relative flex-shrink-0 w-full sm:w-[260px]">
        {/* Rounded photo */}
        <div
          className="overflow-hidden w-full"
          style={{ borderRadius: '1.25rem', aspectRatio: '3/3.8' }}
        >
          <img
            src={leader.img}
            alt={leader.name}
            className="w-full h-full object-cover object-top
                       transition-transform duration-700 hover:scale-[1.04]"
          />
        </div>

        {/* Name + role overlay — white card at bottom of photo */}
        <div
          className="absolute bottom-3 left-3 right-3 bg-white rounded-xl px-4 py-3 shadow-sm"
        >
          <p className="font-display font-extrabold text-gray-900 text-[0.95rem] leading-tight">
            {leader.name}
          </p>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-red-600 mt-0.5">
            {leader.role}
          </p>
        </div>
      </div>

      {/* ── Credentials + bio + tags ── */}
      <div className="flex-1 pt-1">
        {/* Credentials heading */}
        <p className="font-display font-bold text-gray-900 text-[0.95rem] mb-3">
          Credentials
        </p>

        {/* Bullet list */}
        <ul className="space-y-1 mb-5">
          {leader.credentials.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-gray-500">
              <span className="mt-[6px] flex-shrink-0 w-1 h-1 rounded-full bg-gray-400" />
              {c}
            </li>
          ))}
        </ul>

        {/* Bio */}
        <p className="text-[13.5px] text-gray-500 leading-relaxed mb-5">
          {leader.bio}
        </p>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-2">
          {leader.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-gray-500 border border-gray-200
                         rounded-full px-3 py-1 hover:border-red-300 hover:text-red-600
                         transition-colors duration-200 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function LeadershipSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="w-full bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <motion.p
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-red-600 mb-3"
            variants={fadeUp} custom={0}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            Leadership
          </motion.p>
          <motion.h2
            className="font-display font-extrabold text-gray-900 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
            variants={fadeUp} custom={0.07}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            The Architects of Transformation
          </motion.h2>
        </div>

        {/* ── Two leader cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {LEADERS.map((leader, i) => (
            <LeaderCard key={leader.name} leader={leader} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}