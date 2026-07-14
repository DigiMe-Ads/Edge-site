import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../firebase'

const inputCls = `
  w-full border border-gray-200 rounded-none px-4 py-3
  text-[13.5px] text-gray-700 placeholder-gray-400
  outline-none focus:border-gray-400 focus:ring-0
  transition-colors duration-200 bg-white
`

const MAX_RESUME_SIZE = 5 * 1024 * 1024 // 5MB

export default function ApplyForm({ jobId, jobTitle }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [resumeFile, setResumeFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent]             = useState(false)
  const [error, setError]           = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null
    if (file && file.size > MAX_RESUME_SIZE) {
      setError('Resume file must be smaller than 5MB.')
      e.target.value = ''
      setResumeFile(null)
      return
    }
    setError(null)
    setResumeFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      let resumeUrl = null
      let resumePath = null

      if (resumeFile) {
        resumePath = `applications/${jobId}/${crypto.randomUUID()}-${resumeFile.name}`
        const fileRef = storageRef(storage, resumePath)
        await uploadBytes(fileRef, resumeFile)
        resumeUrl = await getDownloadURL(fileRef)
      }

      await addDoc(collection(db, 'applications'), {
        jobId,
        jobTitle,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        resumeUrl,
        resumePath,
        reviewed: false,
        createdAt: serverTimestamp(),
      })

      setSent(true)
    } catch (err) {
      setError('Something went wrong submitting your application. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section ref={ref} className="w-full bg-white py-16 lg:py-20">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-red-600 mb-3">
          Apply Now
        </p>
        <h3 className="font-display font-bold text-gray-900 text-[1.6rem] mb-1">
          Apply for {jobTitle}
        </h3>
        <p className="text-[12.5px] text-gray-400 mb-8">
          Fill out the form below and our team will get back to you.
        </p>

        {sent ? (
          <div className="py-12 text-center border border-gray-100 bg-gray-50">
            <p className="text-green-600 font-semibold text-[15px]">
              ✓ Application submitted! We'll be in touch soon.
            </p>
          </div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className={inputCls}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className={inputCls}
              />
            </div>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className={inputCls}
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us why you're a great fit for this role."
              rows={5}
              className={`${inputCls} resize-none`}
            />

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500 mb-2">
                Resume / CV (PDF or Word, max 5MB)
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full border border-gray-200 px-4 py-3 text-[13px] text-gray-600 bg-white file:mr-4 file:border-0 file:bg-gray-900 file:text-white file:text-[11px] file:font-bold file:uppercase file:tracking-wider file:px-4 file:py-2 file:cursor-pointer"
              />
            </div>

            {error && (
              <p className="text-red-600 text-[13px] font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gray-900 text-white text-[11px] font-bold
                         uppercase tracking-[0.2em] py-4
                         hover:bg-red-600 transition-colors duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting…' : 'Submit Application'}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}
