import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Stats data ───────────────────────────────────────────────────────────────
const STATS = [
  { value: 4541, label: 'Project\ncompleted', prefix: '', suffix: ',', icon: <RocketIcon /> },
  { value: 100,  label: 'Team member',        prefix: '', suffix: '',  icon: <BugIcon />    },
  { value: 15,   label: 'Country office',     prefix: '', suffix: '',  icon: <BriefcaseIcon /> },
  { value: 100,  label: 'Client\nSatisfaction', prefix: '', suffix: '', icon: <SmileIcon />  },
]

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return count
}

// ─── Single stat item ─────────────────────────────────────────────────────────
function StatItem({ stat, index, started }) {
  const count = useCounter(stat.value, 1600 + index * 100, started)

  // Format number with comma for 4541
  const formatted = stat.value >= 1000
    ? count.toLocaleString()
    : count.toString()

  return (
    <motion.div
      className="flex items-center gap-5"
      initial={{ opacity: 0, y: 20 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Circle icon */}
      <div
        className="flex-shrink-0 w-[60px] h-[60px] rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.12)' }}
      >
        {stat.icon}
      </div>

      {/* Number + label */}
      <div>
        <p
          className="text-white font-display font-bold leading-none"
          style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}
        >
          {formatted}
        </p>
        <p
          className="text-white/70 text-[13px] font-medium mt-1 leading-snug"
          style={{ whiteSpace: 'pre-line' }}
        >
          {stat.label}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Divider between stats ────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      className="hidden lg:block flex-shrink-0 self-stretch w-px"
      style={{ background: 'rgba(255,255,255,0.15)' }}
    />
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function StatsSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="w-full bg-white py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">
        {/* Blue banner card */}
        <motion.div
          ref={ref}
          className="w-full rounded-sm px-10 lg:px-16 py-10"
          style={{ background: 'linear-gradient(135deg, #1a5ca8 0%, #1565c0 50%, #1976d2 100%)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="contents">
                <StatItem stat={stat} index={i} started={inView} />
                {i < STATS.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Icon SVGs — white outlined, ~26px ───────────────────────────────────────
function RocketIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C12 2 7 6 7 13H17C17 6 12 2 12 2Z"
        stroke="white" strokeWidth="1.6" strokeLinejoin="round"
      />
      <path d="M7 13L5 17H19L17 13" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 17V19C9 20.1 9.9 21 11 21H13C14.1 21 15 20.1 15 19V17"
            stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      <line x1="12" y1="2" x2="12" y2="8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 13C5.5 13 4.5 14 5 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 13C18.5 13 19.5 14 19 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function BugIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="13" rx="5" ry="6" stroke="white" strokeWidth="1.6" />
      <path d="M9 7.5C9 6.12 10.34 5 12 5C13.66 5 15 6.12 15 7.5"
            stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="7" y1="10" x2="4" y2="8"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="13" x2="3" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="16" x2="4" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="10" x2="20" y2="8"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="13" x2="21" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="16" x2="20" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="9"  x2="12" y2="19" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="8" width="20" height="13" rx="2"
            stroke="white" strokeWidth="1.6" />
      <path d="M8 8V6C8 4.9 8.9 4 10 4H14C15.1 4 16 4.9 16 6V8"
            stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="2" y1="14" x2="22" y2="14" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="12" y1="12" x2="12" y2="16" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SmileIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.6" />
      <path d="M8.5 14.5C8.5 14.5 9.8 16.5 12 16.5C14.2 16.5 15.5 14.5 15.5 14.5"
            stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="9"  cy="10" r="1" fill="white" />
      <circle cx="15" cy="10" r="1" fill="white" />
    </svg>
  )
}