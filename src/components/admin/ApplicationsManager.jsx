import { useEffect, useState } from 'react'
import {
  collection, onSnapshot, orderBy, query, doc, deleteDoc, updateDoc,
} from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { db, storage } from '../../firebase'

function formatDate(ts) {
  if (!ts?.toDate) return '—'
  return ts.toDate().toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function ApplicationsManager() {
  const [apps, setApps]       = useState([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId]   = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setApps(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return unsub
  }, [])

  const toggleReviewed = async (app) => {
    setBusyId(app.id)
    try {
      await updateDoc(doc(db, 'applications', app.id), { reviewed: !app.reviewed })
    } finally {
      setBusyId(null)
    }
  }

  const handleDelete = async (app) => {
    if (!confirm(`Delete application from "${app.name}"? This cannot be undone.`)) return
    setBusyId(app.id)
    try {
      if (app.resumePath) {
        try {
          await deleteObject(storageRef(storage, app.resumePath))
        } catch {
          // ignore if file already missing
        }
      }
      await deleteDoc(doc(db, 'applications', app.id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete application.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div>
      <h2 className="font-display font-bold text-gray-900 text-[1.3rem] mb-6">
        Applications
      </h2>

      {loading && <p className="text-gray-400 text-[13.5px]">Loading…</p>}

      {!loading && apps.length === 0 && (
        <p className="text-gray-400 text-[13.5px] py-10 text-center border border-dashed border-gray-200">
          No applications submitted yet.
        </p>
      )}

      {!loading && apps.length > 0 && (
        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id} className="border border-gray-100 p-5 bg-white">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-semibold text-gray-900 text-[14.5px]">{app.name}</p>
                  <p className="text-gray-500 text-[12.5px]">
                    Applied for <span className="font-medium text-gray-700">{app.jobTitle}</span>
                    {' '}&middot; {formatDate(app.createdAt)}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${
                    app.reviewed ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}
                >
                  {app.reviewed ? 'Reviewed' : 'New'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-[13px] text-gray-600">
                <p><span className="font-semibold text-gray-800">Email:</span> {app.email}</p>
                <p><span className="font-semibold text-gray-800">Phone:</span> {app.phone}</p>
              </div>

              {app.message && (
                <p className="mt-3 text-[13px] text-gray-600 leading-relaxed whitespace-pre-line">
                  {app.message}
                </p>
              )}

              <div className="flex items-center gap-5 mt-4">
                {app.resumeUrl && (
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View Resume
                  </a>
                )}
                <button
                  onClick={() => toggleReviewed(app)}
                  disabled={busyId === app.id}
                  className="text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-50"
                >
                  Mark as {app.reviewed ? 'New' : 'Reviewed'}
                </button>
                <button
                  onClick={() => handleDelete(app)}
                  disabled={busyId === app.id}
                  className="text-[11px] font-bold uppercase tracking-wider text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
