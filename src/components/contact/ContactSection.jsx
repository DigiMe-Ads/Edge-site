import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Fade-up variant ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

// ─── Input / Textarea shared styles ──────────────────────────────────────────
const inputCls = `
  w-full border border-gray-200 rounded-none px-4 py-3
  text-[13.5px] text-gray-700 placeholder-gray-400
  outline-none focus:border-gray-400 focus:ring-0
  transition-colors duration-200 bg-white
`

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ContactSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState({ first: '', last: '', email: '', message: '' })
  const [sent, setSent]   = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Replace with your actual form submission logic
    setSent(true)
  }

  return (
    <section ref={ref} className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 xl:px-16">

        {/* ── Top two-column row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 mb-12">

          {/* ── LEFT: info column ── */}
          <motion.div
            variants={fadeUp} custom={0}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            {/* Eyebrow */}
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-red-600 mb-3">
              Team
            </p>

            {/* Heading */}
            <h2
              className="font-display font-extrabold text-gray-900 leading-[1.1] mb-5"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}
            >
              Any query? then fell<br />free to<br />contact us
            </h2>

            {/* Sub-copy */}
            <p className="text-[13.5px] text-gray-400 leading-relaxed mb-8 max-w-[240px]">
              Sense of more tranquil existence, that I neglect my talents should be
              incapable of drawing singl
            </p>

            {/* Contact details */}
            <ul className="space-y-6">
              {/* Phone */}
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-800 mb-0.5">Phone</p>
                  <p className="text-[13px] text-gray-500">123-456-7890</p>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <MailIcon />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-800 mb-0.5">Email</p>
                  <a href="mailto:mail@hotmail.com"
                     className="text-[13px] text-gray-500 hover:text-red-600 transition-colors">
                    mail@hotmail.com
                  </a>
                </div>
              </li>

              {/* Office hours */}
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <ClockIcon />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-800 mb-0.5">Office hour</p>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    Mon – Sat: 10.00am to 6.00pm<br />
                    (Sun: Closed)
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* ── RIGHT: quote form ── */}
          <motion.div
            variants={fadeUp} custom={0.1}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            <h3 className="font-display font-bold text-gray-900 text-[1.4rem] mb-1">
              Get a Quote
            </h3>
            <p className="text-[12.5px] text-gray-400 mb-6">
              Your email address will not be published.
            </p>

            {sent ? (
              <div className="py-12 text-center">
                <p className="text-green-600 font-semibold text-[15px]">
                  ✓ Message sent! We'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First / Last name row */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="first"
                    value={form.first}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className={inputCls}
                  />
                  <input
                    name="last"
                    value={form.last}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className={inputCls}
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className={inputCls}
                />

                {/* Message */}
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Please describe what you need. *"
                  required
                  rows={5}
                  className={`${inputCls} resize-none`}
                />

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white text-[11px] font-bold
                             uppercase tracking-[0.2em] py-4
                             hover:bg-red-600 transition-colors duration-300"
                >
                  Send It Now
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* ── Map ── */}
        <motion.div
          className="w-full overflow-hidden rounded-sm"
          style={{ height: 340 }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Dummy location: New York, NY — replace src with your own embed URL */}
          <iframe
            title="Office location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48374.26559789!2d-74.00597!3d40.71278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

      </div>
    </section>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
         stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
         stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
         stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}