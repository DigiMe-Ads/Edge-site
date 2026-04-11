import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Contact details ──────────────────────────────────────────────────────────
const CONTACTS = [
  {
    icon: <PhoneIcon />,
    label: 'Call Us',
    lines: ['+94 77 748 8022', '+94 77 776 7299'],
    href: ['tel:+94777488022', 'tel:+94777767299'],
  },
  {
    icon: <MailIcon />,
    label: 'Email Us',
    lines: ['prasangani@edgeconsultants.org', 'samadhi@edgeconsultants.org'],
    href: ['mailto:prasangani@edgeconsultants.org', 'mailto:samadhi@edgeconsultants.org'],
  },
  {
    icon: <PinIcon />,
    label: 'Office',
    lines: ['No. 506/B/6, Hokandara Road, Dharmapala Mawatha,', 'Thalawathugoda, Sri Lanka'],
    href: [null, null],
  },
]

// ─── Interest options ─────────────────────────────────────────────────────────
const INTERESTS = [
  'Strategic Advisory',
  'Human Capital & Leadership',
  'Business Effectiveness Tools',
  'Execution Support',
  'Other',
]

// ─── Input shared styles ──────────────────────────────────────────────────────
const inputCls = `
  w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3
  text-[13.5px] text-gray-700 placeholder-gray-400
  outline-none focus:border-gray-400 focus:bg-white focus:ring-0
  transition-all duration-200
`

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function ConsultationSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState({
    name: '', company: '', interest: 'Strategic Advisory', message: '',
  })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }

  return (
    <section
      ref={ref}
      className="w-full py-16 lg:py-24 overflow-hidden"
      style={{ background: '#f0f0f2' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10 xl:px-16">
        <motion.div
          className="flex flex-col lg:flex-row overflow-hidden shadow-xl"
          style={{ borderRadius: '1.5rem' }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >

          {/* ══ LEFT: red panel ══ */}
          <div
            className="flex-shrink-0 lg:w-[42%] px-8 py-10 lg:px-10 lg:py-12 flex flex-col justify-between"
            style={{
              background: 'linear-gradient(160deg, #e53e3e 0%, #c53030 100%)',
              borderRadius: '1.5rem 0 0 1.5rem',
            }}
          >
            {/* Heading + sub */}
            <div className="mb-10">
              <h2
                className="font-display font-extrabold text-white leading-[1.1] mb-4"
                style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)' }}
              >
                Let's Build the Future Together
              </h2>
              <p className="text-white/70 text-[13.5px] leading-relaxed max-w-xs">
                Partner with us to align your strategy, talent, and execution for measurable results.
              </p>
            </div>

            {/* Contact rows */}
            <ul className="space-y-7">
              {CONTACTS.map((c, i) => (
                <li key={i} className="flex items-start gap-4">
                  {/* Icon bubble */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.15)' }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-white/60 text-[10.5px] font-bold uppercase tracking-[0.18em] mb-1">
                      {c.label}
                    </p>
                    {c.lines.map((line, j) => (
                      c.href[j] ? (
                        <a
                          key={j}
                          href={c.href[j]}
                          className="block text-white font-semibold text-[13.5px] leading-snug
                                     hover:text-white/80 transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={j} className="text-white font-medium text-[13px] leading-snug">
                          {line}
                        </p>
                      )
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ══ RIGHT: white form panel ══ */}
          <div
            className="flex-1 bg-white px-8 py-10 lg:px-10 lg:py-12"
            style={{ borderRadius: '0 1.5rem 1.5rem 0' }}
          >
            {sent ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center py-16">
                  <p className="text-green-600 font-semibold text-[15px] mb-2">
                    ✓ Request received!
                  </p>
                  <p className="text-gray-400 text-[13px]">
                    We'll be in touch to schedule your consultation.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">
                      Name
                    </label>
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      placeholder="Your full name" required
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">
                      Company
                    </label>
                    <input
                      name="company" value={form.company} onChange={handleChange}
                      placeholder="Your organization" required
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Interest select */}
                <div>
                  <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">
                    Interest
                  </label>
                  <select
                    name="interest" value={form.interest} onChange={handleChange}
                    className={`${inputCls} cursor-pointer appearance-none`}
                  >
                    {INTERESTS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us about your challenges…"
                    rows={5} required
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gray-900 text-white text-[13px] font-bold
                             uppercase tracking-[0.14em] py-4
                             hover:bg-red-600 transition-colors duration-300"
                >
                  Schedule a Consultation
                </button>
              </form>
            )}
          </div>

        </motion.div>
      </div>
    </section>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}