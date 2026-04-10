import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Team data ────────────────────────────────────────────────────────────────
const MEMBERS = [
  { name: 'Michel Ihen',  role: 'CEO & Founder',     img: '/assets/team-1.jpg', tall: true  },
  { name: 'Sofia Jow',    role: 'Marketing Expert',  img: '/assets/team-2.jpg', tall: false },
  { name: 'Willium Nater',role: 'Sells Manager',     img: '/assets/team-3.jpg', tall: true  },
  { name: 'Abrila Ja',    role: 'Client Manager',    img: '/assets/team-4.jpg', tall: false },
]

// ─── Stagger variants ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

// ─── Single member card ───────────────────────────────────────────────────────
// Alternating heights: tall cards are ~480px, short cards ~420px —
// creating the staggered bottom-edge effect from the design.
function MemberCard({ member, index, started }) {
  const height = member.tall ? 480 : 420

  return (
    <motion.div
      className="relative overflow-hidden rounded-sm flex-shrink-0 group cursor-pointer"
      style={{
        width: '100%',
        height,
        alignSelf: 'flex-start', // let flex align top edges flush
      }}
      custom={index * 0.1}
      variants={fadeUp}
      initial="hidden"
      animate={started ? 'visible' : 'hidden'}
    >
      {/* Photo */}
      <img
        src={member.img}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover object-center
                   transition-transform duration-700 group-hover:scale-105"
      />

      {/* Permanent dark-to-transparent gradient overlay from bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(30,20,60,0.75) 0%, rgba(30,20,60,0.25) 45%, rgba(30,20,60,0.05) 100%)',
        }}
      />

      {/* Hover: full purple-tinted overlay that fades in */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: 'rgba(100,80,160,0.28)' }}
      />

      {/* Name + role — always visible, bottom-left */}
      <div className="absolute bottom-5 left-5 right-5 z-10">
        <p className="text-white font-display font-bold leading-tight"
           style={{ fontSize: '1rem' }}>
          {member.name}
        </p>
        <p className="text-white/65 text-[10px] font-semibold uppercase tracking-[0.18em] mt-0.5">
          {member.role}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function TeamSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="w-full bg-white pt-20 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">

        {/* ── Header row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-x-16 gap-y-6
                        items-start mb-12">

          {/* Left: eyebrow + heading */}
          <div>
            <motion.p
              className="text-[11px] font-bold uppercase tracking-[0.24em] text-red-600 mb-3"
              custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              Team
            </motion.p>
            <motion.h2
              className="font-display font-extrabold text-gray-900 leading-[1.08]"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', maxWidth: 420 }}
              custom={0.08} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              See Our All Expert Team Members
            </motion.h2>
          </div>

          {/* Centre: body copy */}
          <motion.p
            className="text-gray-400 text-[14px] leading-relaxed"
            style={{ maxWidth: 340, paddingTop: '2rem' }}
            custom={0.14} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            Entences fly into your mouth. Even the all-powerful Pointing has no
            control about the blind texts it is an almost unorthographic life One
            day however
          </motion.p>

          {/* Right: CTA button */}
          <motion.div
            style={{ paddingTop: '2rem' }}
            custom={0.2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            <a
              href="#"
              className="inline-block bg-gray-900 text-white text-[11px] font-bold
                         uppercase tracking-[0.18em] px-7 py-4 whitespace-nowrap
                         hover:bg-red-600 transition-colors duration-300"
            >
              See All Members
            </a>
          </motion.div>
        </div>

        {/* ── Cards grid ──
            4 equal columns. Tall and short cards alternate, creating the
            staggered bottom-edge look from the design.
        ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-start">
          {MEMBERS.map((member, i) => (
            <MemberCard key={i} member={member} index={i} started={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}