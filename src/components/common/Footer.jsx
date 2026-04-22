import { motion } from 'framer-motion'

// ─── Link columns ─────────────────────────────────────────────────────────────
const USEFUL_LINKS   = ['About', 'Blog', 'Services']
const SOLUTION_LINKS = ['Home', 'Case Study', 'Contact']

const CONTACTS = [
  {
    icon: <PinIcon />,
    text: '22/1 Dirstrck zip 9100, Melborn Australia',
    href: null,
  },
  {
    icon: <ChatIcon />,
    text: '+123 456 789',
    href: 'tel:+123456789',
  },
  {
    icon: <MailIcon />,
    text: 'edge@gmail.com',
    href: 'mailto:edge@gmail.com',
  },
]

const SOCIALS = [
  { label: 'Facebook',  href: '#', icon: <FbIcon  /> },
  { label: 'Twitter',   href: '#', icon: <TwIcon  /> },
  { label: 'Instagram', href: '#', icon: <IgIcon  /> },
  { label: 'LinkedIn',  href: '#', icon: <LiIcon  /> },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden">

      {/* ── Background image ─────────────────────────────────────────────────
          The dark footer image already has the white wave swerve baked into
          its top edge. Using <img> pinned to top so the wave is never cropped.
          Place the image at: src/assets/footer-bg.jpg
      ── */}
      <img
        src="/assets/footer-bg2.jpg"
        alt=""
        aria-hidden="true"
        className="absolute left-0 top-0 w-full h-full object-fill object-top
                   pointer-events-none select-none"
        style={{ zIndex: 0 }}
      />

      {/* ── Red blob — top right ─────────────────────────────────────────────
          Place your blob PNG at: src/assets/blob-footer.png
      ── */}
      <div
        className="absolute pointer-events-none select-none"
        style={{ top: 0, right: 0, width: '28%', maxWidth: 360, zIndex: 1 }}
        aria-hidden="true"
      >
        <img src="/assets/new-footer.png" alt="" className="w-full h-auto" />
      </div>

      {/* ── Content ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto
                   px-6 lg:px-10 xl:px-16 pt-56 pb-14"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr] gap-12 lg:gap-8">

          {/* ── Col 1: Logo + tagline + socials ── */}
          <div>
            {/* Logo image */}
            <a href="/" className="inline-block mb-6">
              <img
                src="/logo.png"
                alt="Edge Consultants"
                className="h-10 w-auto object-contain"
              />
            </a>

            <p className="text-white/55 text-[14px] leading-relaxed mb-8 max-w-[260px]">
              Gleams steal into the inner sanctuary throw myself down among the
              tall grass by the trickling
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center
                             text-white/70 hover:text-white hover:border-white hover:bg-white/10
                             transition-all duration-250"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Useful Links ── */}
          <div>
            <h4 className="text-white font-display font-bold text-[1.05rem] mb-7">
              Usefull Link
            </h4>
            <ul className="space-y-5">
              {USEFUL_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 text-[14px] hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Solution Links ── */}
          <div>
            <h4 className="text-white font-display font-bold text-[1.05rem] mb-7">
              Solution Links
            </h4>
            <ul className="space-y-5">
              {SOLUTION_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 text-[14px] hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contacts ── */}
          <div>
            <h4 className="text-white font-display font-bold text-[1.05rem] mb-7">
              Contacts
            </h4>
            <ul className="space-y-6">
              {CONTACTS.map((c, i) => (
                <li key={i} className="flex items-start gap-4">
                  {/* Icon */}
                  <span className="flex-shrink-0 mt-0.5 text-white/50 w-5">
                    {c.icon}
                  </span>
                  {/* Text */}
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-white/60 text-[13.5px] leading-snug
                                 hover:text-white transition-colors duration-200
                                 underline underline-offset-4 decoration-white/20"
                    >
                      {c.text}
                    </a>
                  ) : (
                    <span className="text-white/60 text-[13.5px] leading-snug">
                      {c.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 pt-6 border-t border-white/10">
          <p className="text-white/30 text-[12px] text-center tracking-wide">
            © {new Date().getFullYear()} Edge Consultants. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  )
}

// ─── Contact icons ────────────────────────────────────────────────────────────
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

// ─── Social icons ─────────────────────────────────────────────────────────────
function FbIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

function TwIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  )
}

function IgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LiIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}