import { motion } from 'framer-motion'

// ─── Floating bokeh dot config ────────────────────────────────────────────────
const DOTS = [
  { size: 72,  top: '70%', left: '84%',  color: '#f0c040', opacity: 0.88, blur: 22, delay: 0,   duration: 4.5 },
  { size: 44,  top: '80%', left: '90%',  color: '#f5d060', opacity: 0.70, blur: 14, delay: 0.9, duration: 5.2 },
  { size: 28,  top: '75%', left: '93%',  color: '#f5a820', opacity: 0.55, blur: 9,  delay: 1.6, duration: 3.9 },
  { size: 16,  top: '86%', left: '81%',  color: '#fff8e0', opacity: 0.40, blur: 4,  delay: 0.4, duration: 4.8 },
  { size: 10,  top: '35%', left: '74%',  color: '#ffffff', opacity: 0.18, blur: 3,  delay: 1.2, duration: 6.1 },
  { size: 7,   top: '55%', left: '65%',  color: '#ffffff', opacity: 0.13, blur: 2,  delay: 2.1, duration: 5.6 },
  { size: 6,   top: '22%', left: '55%',  color: '#ffffff', opacity: 0.15, blur: 2,  delay: 0.6, duration: 7.2 },
]

function FloatingDot({ dot }) {
  return (
    <div
      className="dot absolute rounded-full pointer-events-none"
      style={{
        width:  dot.size,
        height: dot.size,
        top:    dot.top,
        left:   dot.left,
        background: dot.color,
        opacity: dot.opacity,
        filter: `blur(${dot.blur}px)`,
        animationDelay:    `${dot.delay}s`,
        animationDuration: `${dot.duration}s`,
      }}
    />
  )
}

// ─── Props: title (string, required), subtitle (string, optional) ─────────────
export default function CommonHero({ title = '', subtitle = '' }) {
  return (
    <section
      className="relative w-full overflow-hidden"
      // Inner pages don't need full viewport height — a shorter banner is fine
      style={{ height: '62vh', minHeight: 620 }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(8,8,18,0.78) 0%, rgba(8,8,18,0.50) 55%, rgba(8,8,18,0.18) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Red blob — top left */}
      <motion.div
        className="blob-animate absolute pointer-events-none select-none"
        style={{ top: '0%', left: '0%', width: '30%', maxWidth: 460, zIndex: 2 }}
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <img src="/assets/blob-red-top.png" alt="" className="w-full h-auto" />
      </motion.div>

      {/* Red blob — bottom right */}
      <motion.div
        className="blob-animate absolute pointer-events-none select-none"
        style={{ bottom: '20%', right: '5%', width: '20%', maxWidth: 340, zIndex: 2, animationDelay: '2.5s' }}
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, ease: 'easeOut', delay: 0.25 }}
        aria-hidden="true"
      >
        <img src="/assets/blob-red-right.png" alt="" className="w-full h-auto" />
      </motion.div>

      {/* Bokeh particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 3 }}>
        {DOTS.map((dot, i) => <FloatingDot key={i} dot={dot} />)}
      </div>

      {/* ── Centered content ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* {subtitle && (
          <motion.p
            className="text-white/55 text-[11px] font-semibold tracking-[0.28em] uppercase mb-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )} */}

        <motion.h1
          className="font-display font-extrabold text-white leading-none"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {title}
        </motion.h1>
      </div>

      {/* Bottom S-curve wave */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ zIndex: 10 }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ display: 'block', height: 'clamp(60px, 8vw, 110px)' }}
        >
          <path
            d="M0,110 L0,68 C120,55 240,44 400,62 C560,80 680,95 840,72 C1000,49 1160,28 1320,38 L1440,44 L1440,110 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}