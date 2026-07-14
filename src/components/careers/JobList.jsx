import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'

// ─── Single job card ──────────────────────────────────────────────────────────
function JobCard({ job, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.article
      ref={ref}
      className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link to={`/careers/${job.id}`} className="block overflow-hidden group">
        <img
          src={job.imageUrl || '/assets/hero-bg-sharp.jpg'}
          alt={job.title}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          style={{ aspectRatio: '16/9' }}
        />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        {(job.location || job.type) && (
          <div className="flex items-center gap-2 mb-3">
            {job.type && (
              <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-red-600 bg-red-50 px-2.5 py-1">
                {job.type}
              </span>
            )}
            {job.location && (
              <span className="text-[10.5px] font-medium uppercase tracking-[0.1em] text-gray-400">
                {job.location}
              </span>
            )}
          </div>
        )}

        <h2 className="font-display font-extrabold text-gray-900 leading-tight mb-2"
            style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)' }}>
          <Link to={`/careers/${job.id}`} className="hover:text-red-600 transition-colors duration-200">
            {job.title}
          </Link>
        </h2>

        {job.heading && (
          <p className="text-[13.5px] text-gray-500 leading-relaxed mb-5 flex-1">
            {job.heading}
          </p>
        )}

        <Link
          to={`/careers/${job.id}`}
          className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase
                     tracking-[0.16em] text-gray-700 hover:text-red-600 transition-colors duration-200 mt-auto"
        >
          View &amp; Apply
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" strokeWidth={2.3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.article>
  )
}

// ─── Main JobList ─────────────────────────────────────────────────────────────
export default function JobList() {
  const [jobs, setJobs]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchJobs() {
      try {
        const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        if (cancelled) return
        setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchJobs()
    return () => { cancelled = true }
  }, [])

  return (
    <section className="w-full bg-gray-50 py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 xl:px-16">
        {loading && (
          <p className="text-center text-gray-400 text-[14px] py-16">Loading open positions…</p>
        )}

        {!loading && error && (
          <p className="text-center text-red-500 text-[14px] py-16">
            Couldn't load job listings right now. Please try again later.
          </p>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display font-bold text-gray-800 text-[1.4rem] mb-2">
              No open positions right now
            </p>
            <p className="text-gray-400 text-[13.5px]">
              Check back soon — new opportunities are posted regularly.
            </p>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
