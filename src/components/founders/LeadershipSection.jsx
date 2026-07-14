import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Leader data ──────────────────────────────────────────────────────────────
const LEADERS = [
  {
    name:  'Prasangani Perera',
    role:  'Director | Co-Founder',
    img:   '/assets/prasangi-founder.jpeg',
    credentials: [
      'MBA – Cardiff Metropolitan University, UK',
      'Associate Member – Chartered Institute of Personnel Management (CIPM), Sri Lanka',
      'Professional Qualification in HRM – CIPM, Sri Lanka',
      'Advanced Diploma in Train-the-Trainer (City & Guilds, UK)',
    ],
    bio:  'A strategic HR and business transformation leader with over 15 years of experience in aligning people strategies with business objectives. She brings deep expertise in driving performance, governance, and organizational effectiveness across complex business environments.',
    tags: ['HR Strategy & Transformation', 'Performance Management & Governance', 'HR Digitalization', 'Organizational Alignment'],
  },
  {
    name:  'Samadhi Perera',
    role:  'Director | Co-Founder',
    img:   '/assets/leader-1.png',
    credentials: [
      'MSc in HRM & Development – University of Salford, UK',
      'Associate Member – Chartered Institute of Personnel Management (CIPM), Sri Lanka',
      'Professional Qualification in HRM – CIPM, Sri Lanka',
      'Executive Certificate in HR Analytics (ECHRA), CIPM',
    ],
    bio:  'A seasoned leader in culture transformation and organizational development with over two decades of cross-industry experience. She specializes in building high-performance cultures and aligning leadership, talent, and strategy to drive sustainable growth.',
    tags: ['Culture Transformation', 'Leadership Development', 'Organizational Effectiveness', 'Talent Strategy & HR Systems'],
  },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

const SECTION_LABEL = 'text-[10.5px] font-bold uppercase tracking-[0.2em] text-red-600 mb-3'

// ─── Single leader card (photo + credentials / profile / expertise) ───────────
function LeaderCard({ leader, index, inView }) {
  const reversed = index === 1

  return (
    <motion.div
      className={`relative bg-white border border-gray-100 shadow-sm hover:shadow-xl
                  transition-shadow duration-300 p-6 sm:p-8 lg:p-10
                  flex flex-col ${reversed ? 'sm:flex-row-reverse' : 'sm:flex-row'} gap-8 sm:gap-10 items-start overflow-hidden`}
      variants={fadeUp} custom={0.1 + index * 0.12}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
    >
      {/* Ghost index number — always anchored top-right so it never sits behind body copy */}
      <span
        className="absolute top-2 right-4 select-none pointer-events-none font-display font-extrabold text-gray-50"
        style={{ fontSize: '7rem', lineHeight: 1 }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* ── Photo ── */}
      <div className="relative flex-shrink-0 w-full sm:w-[240px] z-10">
        <div className="overflow-hidden w-full" style={{ aspectRatio: '3/3.6' }}>
          <img
            src={leader.img}
            alt={leader.name}
            className="w-full h-full object-cover object-top
                       transition-transform duration-700 hover:scale-[1.05]"
          />
        </div>
        {/* Name + role — floating dark tag */}
        <div className="absolute -bottom-5 left-4 right-4 bg-gray-950 px-4 py-3 shadow-lg">
          <p className="font-display font-extrabold text-white text-[0.95rem] leading-tight">
            {leader.name}
          </p>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-red-500 mt-0.5">
            {leader.role}
          </p>
        </div>
      </div>

      {/* ── Credentials + Profile + Expertise ── */}
      <div className="flex-1 pt-2 mt-6 sm:mt-0 z-10">
        {/* Credentials */}
        <p className={SECTION_LABEL}>Credentials</p>
        <ul className="space-y-2 mb-7">
          {leader.credentials.map((c, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-500 leading-relaxed">
              <CertIcon />
              <span>{c}</span>
            </li>
          ))}
        </ul>

        {/* Profile */}
        <p className={SECTION_LABEL}>Profile</p>
        <p className="text-[13.5px] text-gray-600 leading-relaxed mb-7">
          {leader.bio}
        </p>

        {/* Expertise Areas */}
        <p className={SECTION_LABEL}>Expertise Areas</p>
        <div className="flex flex-wrap gap-2">
          {leader.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold text-red-700 bg-red-50
                         px-3 py-1.5 hover:bg-red-600 hover:text-white
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
    <section ref={ref} className="w-full bg-gray-50 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 xl:px-16">

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
        <div className="flex flex-col gap-10 lg:gap-12">
          {LEADERS.map((leader, i) => (
            <LeaderCard key={leader.name} leader={leader} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function CertIcon() {
  return (
    <svg
      className="flex-shrink-0 mt-[2px]"
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="12" cy="9" r="6" />
      <path d="M8.2 14.2L6.5 22l5.5-3 5.5 3-1.7-7.8" />
    </svg>
  )
}
