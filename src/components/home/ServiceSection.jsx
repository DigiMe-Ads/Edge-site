import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Card data ────────────────────────────────────────────────────────────────
const ROW1 = [
  { num: '01', title: 'Mobile\nDevelopment',  icon: <MobileIcon />    },
  { num: '02', title: 'UI/UX\nDesign',        icon: <UxIcon />        },
  { num: '03', title: 'Process\nDevelopment', icon: <MegaphoneIcon /> },
  { num: '04', title: 'Market\nAnalysis',     icon: <ChartIcon />     },
]
const ROW2 = [
  { num: '05', title: 'Process\nDevelopment', icon: <GearIcon />      },
  { num: '06', title: 'UI/UI\nDesign',        icon: <DiamondIcon />   },
  { num: '07', title: 'Mobile\nDevelopment',  icon: <MobileIcon />    },
  { num: '08', title: 'Digital\nMarketing',   icon: <MegaphoneIcon /> },
]

// All 8 cards flattened — used for mobile/tablet simple grid
const ALL_CARDS = [...ROW1, ...ROW2]

const CARD_HEIGHT = 200

// ─── Card component ───────────────────────────────────────────────────────────
function ServiceCard({ data, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-sm flex flex-col justify-between p-5 sm:p-6 group cursor-pointer
                 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden w-full"
      style={{ height: CARD_HEIGHT }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Red left-edge accent on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600
                      scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />

      <p className="font-display font-bold text-gray-200 leading-none select-none"
         style={{ fontSize: '1.7rem' }}>
        {data.num}
      </p>

      <h3 className="font-display font-bold text-gray-900 leading-snug"
          style={{ fontSize: '0.92rem', whiteSpace: 'pre-line' }}>
        {data.title}
      </h3>

      <div className="flex items-end justify-between gap-2">
        <a href="#"
           className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em]
                      text-gray-400 group-hover:text-red-600 transition-colors duration-200 whitespace-nowrap">
          See Details
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
          {data.icon}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const headRef = useRef(null)
  const inView  = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section className="relative w-full bg-white">

      {/* ── Top wave ── */}
      <div className="w-full leading-[0]" style={{ marginBottom: -1 }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"
             className="w-full block" style={{ height: 'clamp(40px, 7vw, 100px)' }}>
          <path d="M0,100 L0,72 C180,30 360,85 540,60 C720,35 900,75 1080,52 C1220,34 1340,65 1440,55 L1440,100 Z"
                fill="#f1f1f3" />
        </svg>
      </div>

      {/* ── Grey body ── */}
      <div className="relative" style={{ background: '#f1f1f3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 pt-6 pb-16">

          {/* ── Header ── */}
          <div ref={headRef} className="relative z-10 mb-8 sm:mb-10">
            <motion.p
              className="text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400 mb-3"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}
            >
              Services
            </motion.p>
            <motion.h2
              className="font-display font-extrabold text-gray-900 leading-[1.1]"
              style={{ fontSize: 'clamp(1.4rem, 4vw, 2.1rem)' }}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              Get Our Best Services For<br />Your Business Growth
            </motion.h2>
          </div>

          {/* ══════════════════════════════════════════════════
              MOBILE + TABLET: simple responsive grid (no stagger)
              Hidden on desktop (lg+)
          ══════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {ALL_CARDS.map((card, i) => (
              <ServiceCard key={`m-${i}`} data={card} delay={0.04 * i} />
            ))}
          </div>

          {/* ══════════════════════════════════════════════════
              DESKTOP: 4-column staggered layout with blob
              Hidden on mobile/tablet
          ══════════════════════════════════════════════════ */}
          <div className="relative hidden lg:block">

            {/* Blob */}
            <motion.div
              className="absolute pointer-events-none select-none"
              style={{ right: '14%', top: '-120px', width: 'clamp(300px, 26%, 500px)', zIndex: 10, opacity: 0.72 }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={inView ? { opacity: 0.72, scale: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.05 }}
            >
              <img src="/assets/blob-services.png" alt="" className="w-full h-auto" />
            </motion.div>

            {/* 4-column staggered grid */}
            <div className="grid gap-x-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>

              {/* Col 1 — top */}
              <div className="flex flex-col gap-4" style={{ marginTop: 0 }}>
                <ServiceCard data={ROW1[0]} delay={0.05} />
                <ServiceCard data={ROW2[0]} delay={0.12} />
              </div>

              {/* Col 2 — offset down */}
              <div className="flex flex-col gap-4" style={{ marginTop: 28 }}>
                <ServiceCard data={ROW1[1]} delay={0.1} />
                <ServiceCard data={ROW2[1]} delay={0.17} />
              </div>

              {/* Col 3 — top */}
              <div className="flex flex-col gap-4" style={{ marginTop: 0 }}>
                <ServiceCard data={ROW1[2]} delay={0.15} />
                <ServiceCard data={ROW2[2]} delay={0.22} />
              </div>

              {/* Col 4 — offset down */}
              <div className="flex flex-col gap-4" style={{ marginTop: 28 }}>
                <ServiceCard data={ROW1[3]} delay={0.2} />
                <ServiceCard data={ROW2[3]} delay={0.27} />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom wave ── */}
      <div className="w-full leading-[0]" style={{ marginTop: -1 }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"
             className="w-full block" style={{ height: 'clamp(40px, 7vw, 100px)' }}>
          <path d="M0,0 L0,48 C200,78 420,22 660,55 C880,82 1100,30 1300,58 C1360,65 1400,60 1440,42 L1440,0 Z"
                fill="#f1f1f3" />
        </svg>
      </div>

    </section>
  )
}

// ─── Icon SVGs ────────────────────────────────────────────────────────────────
function GradSVG({ id, children, size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="2" y1="2" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d32f2f" />
          <stop offset="1" stopColor="#f57c00" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  )
}

function MobileIcon() {
  return (
    <GradSVG id="ic-mob">
      <rect x="15" y="4" width="22" height="38" rx="3.5" stroke="url(#ic-mob)" strokeWidth="2" />
      <line x1="21" y1="38" x2="31" y2="38" stroke="url(#ic-mob)" strokeWidth="2" strokeLinecap="round" />
      <rect x="20" y="11" width="12" height="18" rx="1.5" stroke="url(#ic-mob)" strokeWidth="1.5" />
    </GradSVG>
  )
}

function UxIcon() {
  return (
    <GradSVG id="ic-ux">
      <circle cx="26" cy="26" r="10" stroke="url(#ic-ux)" strokeWidth="2" />
      <line x1="26" y1="4"  x2="26" y2="16" stroke="url(#ic-ux)" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="36" x2="26" y2="48" stroke="url(#ic-ux)" strokeWidth="2" strokeLinecap="round" />
      <line x1="4"  y1="26" x2="16" y2="26" stroke="url(#ic-ux)" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="26" x2="48" y2="26" stroke="url(#ic-ux)" strokeWidth="2" strokeLinecap="round" />
    </GradSVG>
  )
}

function MegaphoneIcon() {
  return (
    <GradSVG id="ic-mega">
      <path d="M8 20 L8 32 L17 32 L17 20Z" stroke="url(#ic-mega)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M17 15 L42 8 L42 40 L17 33Z" stroke="url(#ic-mega)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M17 33 L15 44 L21 44 L23 33" stroke="url(#ic-mega)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="44" cy="24" r="3" stroke="url(#ic-mega)" strokeWidth="2" />
    </GradSVG>
  )
}

function ChartIcon() {
  return (
    <GradSVG id="ic-chart">
      <line x1="6"  y1="44" x2="46" y2="44" stroke="url(#ic-chart)" strokeWidth="2" strokeLinecap="round" />
      <line x1="6"  y1="6"  x2="6"  y2="44" stroke="url(#ic-chart)" strokeWidth="2" strokeLinecap="round" />
      <polyline points="10,38 20,24 30,30 42,12" stroke="url(#ic-chart)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="42" cy="12" r="3.5" stroke="url(#ic-chart)" strokeWidth="2" />
    </GradSVG>
  )
}

function GearIcon() {
  return (
    <GradSVG id="ic-gear">
      <circle cx="26" cy="26" r="7" stroke="url(#ic-gear)" strokeWidth="2" />
      <path d="M26 10 L28 15 L33 13 L35 18 L40 19 L40 24 L45 26 L43 31 L45 36 L40 38 L39 43 L34 43 L31 47 L26 45 L21 47 L18 43 L13 43 L12 38 L7 36 L9 31 L7 26 L12 24 L12 19 L17 18 L19 13 L24 15Z"
            stroke="url(#ic-gear)" strokeWidth="2" strokeLinejoin="round" />
    </GradSVG>
  )
}

function DiamondIcon() {
  return (
    <GradSVG id="ic-diamond">
      <polygon points="26,6 44,20 26,46 8,20" stroke="url(#ic-diamond)" strokeWidth="2" strokeLinejoin="round" />
      <line x1="8"  y1="20" x2="44" y2="20" stroke="url(#ic-diamond)" strokeWidth="2" />
      <line x1="17" y1="6"  x2="8"  y2="20" stroke="url(#ic-diamond)" strokeWidth="1.5" />
      <line x1="35" y1="6"  x2="44" y2="20" stroke="url(#ic-diamond)" strokeWidth="1.5" />
      <line x1="26" y1="6"  x2="17" y2="20" stroke="url(#ic-diamond)" strokeWidth="1.5" />
      <line x1="26" y1="6"  x2="35" y2="20" stroke="url(#ic-diamond)" strokeWidth="1.5" />
    </GradSVG>
  )
}