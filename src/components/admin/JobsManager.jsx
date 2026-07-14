import { useEffect, useState } from 'react'
import {
  collection, onSnapshot, orderBy, query, doc, deleteDoc,
} from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { db, storage } from '../../firebase'
import JobFormModal from './JobFormModal'

export default function JobsManager() {
  const [jobs, setJobs]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [modalJob, setModalJob] = useState(undefined) // undefined = closed, null = new, object = edit
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return unsub
  }, [])

  const handleDelete = async (job) => {
    if (!confirm(`Delete "${job.title}"? This cannot be undone.`)) return
    setDeletingId(job.id)
    try {
      if (job.imagePath) {
        try {
          await deleteObject(storageRef(storage, job.imagePath))
        } catch {
          // ignore if file already missing
        }
      }
      await deleteDoc(doc(db, 'jobs', job.id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete job posting.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-gray-900 text-[1.3rem]">
          Job Listings
        </h2>
        <button
          onClick={() => setModalJob(null)}
          className="bg-red-600 text-white text-[11px] font-bold uppercase tracking-[0.16em] py-3 px-5 hover:bg-red-700 transition-colors"
        >
          + Add New Job
        </button>
      </div>

      {loading && <p className="text-gray-400 text-[13.5px]">Loading…</p>}

      {!loading && jobs.length === 0 && (
        <p className="text-gray-400 text-[13.5px] py-10 text-center border border-dashed border-gray-200">
          No job postings yet. Click "Add New Job" to create one.
        </p>
      )}

      {!loading && jobs.length > 0 && (
        <div className="overflow-x-auto border border-gray-100">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 font-semibold">Image</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <img
                      src={job.imageUrl || '/assets/hero-bg-sharp.jpg'}
                      alt=""
                      className="w-16 h-10 object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{job.title}</td>
                  <td className="px-4 py-3 text-gray-500">{job.type || '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{job.location || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <button
                        onClick={() => setModalJob(job)}
                        className="text-gray-500 hover:text-gray-900 font-semibold uppercase text-[11px] tracking-wider transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job)}
                        disabled={deletingId === job.id}
                        className="text-red-500 hover:text-red-700 font-semibold uppercase text-[11px] tracking-wider transition-colors disabled:opacity-50"
                      >
                        {deletingId === job.id ? 'Deleting…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalJob !== undefined && (
        <JobFormModal
          job={modalJob}
          onClose={() => setModalJob(undefined)}
          onSaved={() => setModalJob(undefined)}
        />
      )}
    </div>
  )
}
