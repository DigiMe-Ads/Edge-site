import { useEffect, useState } from 'react'
import {
  collection, onSnapshot, orderBy, query, doc, deleteDoc, updateDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'

function formatDate(ts) {
  if (!ts?.toDate) return '—'
  return ts.toDate().toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function ContactSubmissionsManager() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading]   = useState(true)
  const [busyId, setBusyId]     = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'contactSubmissions'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return unsub
  }, [])

  const toggleReviewed = async (msg) => {
    setBusyId(msg.id)
    try {
      await updateDoc(doc(db, 'contactSubmissions', msg.id), { reviewed: !msg.reviewed })
    } finally {
      setBusyId(null)
    }
  }

  const handleDelete = async (msg) => {
    if (!confirm(`Delete the message from "${msg.name}"? This cannot be undone.`)) return
    setBusyId(msg.id)
    try {
      await deleteDoc(doc(db, 'contactSubmissions', msg.id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete message.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div>
      <h2 className="font-display font-bold text-gray-900 text-[1.3rem] mb-6">
        Contact Messages
      </h2>

      {loading && <p className="text-gray-400 text-[13.5px]">Loading…</p>}

      {!loading && messages.length === 0 && (
        <p className="text-gray-400 text-[13.5px] py-10 text-center border border-dashed border-gray-200">
          No consultation requests submitted yet.
        </p>
      )}

      {!loading && messages.length > 0 && (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="border border-gray-100 p-5 bg-white">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-semibold text-gray-900 text-[14.5px]">{msg.name}</p>
                  <p className="text-gray-500 text-[12.5px]">
                    {msg.company}
                    {' '}&middot; {formatDate(msg.createdAt)}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${
                    msg.reviewed ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}
                >
                  {msg.reviewed ? 'Reviewed' : 'New'}
                </span>
              </div>

              <p className="mt-3 text-[13px] text-gray-600">
                <span className="font-semibold text-gray-800">Interested in:</span> {msg.interest}
              </p>

              {msg.message && (
                <p className="mt-2 text-[13px] text-gray-600 leading-relaxed whitespace-pre-line">
                  {msg.message}
                </p>
              )}

              <div className="flex items-center gap-5 mt-4">
                <button
                  onClick={() => toggleReviewed(msg)}
                  disabled={busyId === msg.id}
                  className="text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-50"
                >
                  Mark as {msg.reviewed ? 'New' : 'Reviewed'}
                </button>
                <button
                  onClick={() => handleDelete(msg)}
                  disabled={busyId === msg.id}
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
