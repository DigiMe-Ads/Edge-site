import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Navbar from '../components/common/Navbar'
import CommonHero from '../components/common/Hero'
import ApplyForm from '../components/careers/ApplyForm'
import Footer from '../components/common/Footer'

export default function JobDetailPage() {
  const { jobId } = useParams()
  const [job, setJob]         = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchJob() {
      setLoading(true)
      setNotFound(false)
      try {
        const snap = await getDoc(doc(db, 'jobs', jobId))
        if (cancelled) return
        if (snap.exists()) {
          setJob({ id: snap.id, ...snap.data() })
        } else {
          setNotFound(true)
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) setNotFound(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchJob()
    return () => { cancelled = true }
  }, [jobId])

  const requirements = (job?.requirements || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return (
    <main className="relative">
      <Navbar />
      <CommonHero title={job?.title || 'Careers'} />

      {loading && (
        <div className="py-24 text-center text-gray-400 text-[14px]">Loading job details…</div>
      )}

      {!loading && notFound && (
        <div className="py-24 text-center">
          <p className="font-display font-bold text-gray-800 text-[1.5rem] mb-3">
            This job posting could not be found
          </p>
          <Link to="/careers" className="text-red-600 hover:text-red-700 font-semibold text-[14px]">
            ← Back to all openings
          </Link>
        </div>
      )}

      {!loading && job && (
        <>
          <section className="w-full bg-white py-16 lg:py-20">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              <Link
                to="/careers"
                className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-gray-400 hover:text-red-600 transition-colors duration-200 mb-8"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
                </svg>
                Back to all openings
              </Link>

              {job.imageUrl && (
                <img
                  src={job.imageUrl}
                  alt={job.title}
                  className="w-full object-cover mb-8"
                  style={{ aspectRatio: '16/7' }}
                />
              )}

              <div className="flex items-center gap-2 mb-4">
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

              <h1 className="font-display font-extrabold text-gray-900 leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                {job.title}
              </h1>

              {job.heading && (
                <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
                  {job.heading}
                </p>
              )}

              {job.description && (
                <div className="mb-8">
                  <h2 className="font-display font-bold text-gray-900 text-[1.15rem] mb-3">
                    Job Description
                  </h2>
                  <p className="text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              )}

              {requirements.length > 0 && (
                <div>
                  <h2 className="font-display font-bold text-gray-900 text-[1.15rem] mb-3">
                    Requirements
                  </h2>
                  <ul className="space-y-2">
                    {requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-[14px] text-gray-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 mt-2 bg-red-600 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <div className="border-t border-gray-100">
            <ApplyForm jobId={job.id} jobTitle={job.title} />
          </div>
        </>
      )}

      <Footer />
    </main>
  )
}
