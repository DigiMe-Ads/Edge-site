import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Blog post data ───────────────────────────────────────────────────────────
const POSTS = [
  {
    date:  'March 5, 2023',
    title: 'Gleams steal into the inner sub',
    img:   '/assets/blog-1.png',
  },
  {
    date:  'March 5, 2023',
    title: 'Strikes the upper surface impenetrable',
    img:   '/assets/blog-2.png',
  },
  {
    date:  'March 5, 2023',
    title: 'Foliage of my trees, and but a few',
    img:   '/assets/blog-3.png',
  },
]

// ─── Single blog card ─────────────────────────────────────────────────────────
function BlogCard({ post, delay, inView }) {
  return (
    <motion.a
      href="#"
      className="group relative block overflow-hidden rounded-sm"
      style={{ aspectRatio: '3/3.5' }}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Photo */}
      <img
        src={post.img}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover object-center
                   transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dark purple-tinted overlay — always on, deepens on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          background:
            'linear-gradient(to top, rgba(40,20,60,0.82) 0%, rgba(40,20,60,0.45) 50%, rgba(40,20,60,0.18) 100%)',
        }}
      />
      {/* Extra hover tint */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: 'rgba(80,40,100,0.22)' }}
      />

      {/* Content — bottom of card */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        {/* Date */}
        <p className="text-white/70 text-[11px] font-medium tracking-wide mb-2">
          {post.date}
        </p>

        {/* Title */}
        <h3 className="text-white font-display font-bold leading-snug mb-5"
            style={{ fontSize: '1.05rem' }}>
          {post.title}
        </h3>

        {/* Arrow button — outlined circle */}
        <div
          className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center
                     group-hover:border-white group-hover:bg-white/15 transition-all duration-300"
        >
          <svg className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-0.5"
               fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.a>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function BlogSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="w-full bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">

        {/* ── Header — centred ── */}
        <div className="text-center mb-12">
          <motion.p
            className="text-[11px] font-bold uppercase tracking-[0.26em] text-red-600 mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
          >
            Blog
          </motion.p>
          <motion.h2
            className="font-display font-extrabold text-gray-900 leading-[1.1]"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            Check Our Lates<br />Insides
          </motion.h2>
        </div>

        {/* ── 3-column card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POSTS.map((post, i) => (
            <BlogCard key={i} post={post} delay={0.08 + i * 0.1} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}