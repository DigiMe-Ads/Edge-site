import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import JobsManager from './JobsManager'
import ApplicationsManager from './ApplicationsManager'
import ContactSubmissionsManager from './ContactSubmissionsManager'

const TABS = [
  { key: 'jobs', label: 'Job Listings', Component: JobsManager },
  { key: 'applications', label: 'Applications', Component: ApplicationsManager },
  { key: 'contact', label: 'Contact Messages', Component: ContactSubmissionsManager },
]

export default function AdminDashboard({ user }) {
  const [tab, setTab] = useState('jobs')

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <header className="bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-red-500 mb-0.5">
              Admin
            </p>
            <h1 className="font-display font-extrabold text-[1.3rem]">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-[12.5px] hidden sm:inline">{user.email}</span>
            <button
              onClick={() => signOut(auth)}
              className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-4 py-2 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex gap-8">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`py-4 text-[13px] font-bold uppercase tracking-wider border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-red-600 text-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        {(() => {
          const Active = TABS.find((t) => t.key === tab).Component
          return <Active />
        })()}
      </main>
    </div>
  )
}
