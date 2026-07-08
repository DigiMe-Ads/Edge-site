import { motion } from 'framer-motion'

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
        width: dot.size, height: dot.size,
        top: dot.top, left: dot.left,
        background: dot.color, opacity: dot.opacity,
        filter: `blur(${dot.blur}px)`,
        animationDelay: `${dot.delay}s`,
        animationDuration: `${dot.duration}s`,
      }}
    />
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function HeroSection() {
  return (
    <div style={{ background: '#ffffff' }}>
      <section
        className="relative w-full overflow-hidden"
        style={{
          height: '90svh',
          minHeight: 640,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 94%)',
        }}
      >
        {/* ── Background image ── */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/hero-bg-sharp.jpg')" }}
          aria-hidden="true"
        />

        {/* ── Dark overlay ── */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(8,8,18,0.78) 0%, rgba(8,8,18,0.42) 55%, rgba(8,8,18,0.08) 100%)',
          }}
          aria-hidden="true"
        />

        {/* ── Red angular accent — top left ── */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{
            top: '-18%', left: '-12%', width: '52%', maxWidth: 520, aspectRatio: '1/1', zIndex: 2,
            background: 'linear-gradient(135deg, #e53e3e 0%, #b71c1c 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 30%, 30% 100%, 0 100%)',
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.32, scale: 1 }}
          transition={{ duration: 1.3, ease: 'easeOut' }}
          aria-hidden="true"
        />

        {/* ── Red angular accent — bottom right ── */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '16%', right: '4%', width: '16%', maxWidth: 260, aspectRatio: '1/1', zIndex: 2,
            background: 'linear-gradient(135deg, #f57c00 0%, #e53e3e 100%)',
            clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ duration: 1.3, ease: 'easeOut', delay: 0.25 }}
          aria-hidden="true"
        />

        {/* ── Bokeh particles ── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 3 }}>
          {DOTS.map((dot, i) => <FloatingDot key={i} dot={dot} />)}
        </div>

        {/* ── Hero content ── */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* <motion.p
            className="text-white/55 text-[11px] font-semibold tracking-[0.28em] uppercase mb-5"
            variants={fadeUp}
          >
            
          </motion.p> */}

          <motion.h1
            className="font-display font-extrabold text-white leading-[1.0] mb-6"
            style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)' }}
            variants={fadeUp}
          >
            Edge Consultants
            <br/>
            (Private) Limited
          </motion.h1>

          <motion.p
            className="text-white/70 font-light text-base md:text-lg mb-10 max-w-[720px]"
            variants={fadeUp}
          >
            Building the Future of Business
            <br/>
            <br/>
            Transforming Strategy, Talent, and Execution into Measurable Business Performance
            <br/>
            <br/>
            We enable organizations to align leadership, capability, and execution to drive 
            sustainable growth and competitive advantage.
          </motion.p>

          <motion.div variants={fadeUp}>
            <button className="btn-primary mr-3">Book a Consultation</button>
            <button className="btn-secondary">Explore Our Services</button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}