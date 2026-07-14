import { useState } from 'react'
import {
  collection, addDoc, doc, updateDoc, serverTimestamp,
} from 'firebase/firestore'
import {
  ref as storageRef, uploadBytes, getDownloadURL, deleteObject,
} from 'firebase/storage'
import { db, storage } from '../../firebase'

const inputCls = `
  w-full border border-gray-200 rounded-none px-4 py-3
  text-[13.5px] text-gray-700 placeholder-gray-400
  outline-none focus:border-gray-400 focus:ring-0
  transition-colors duration-200 bg-white
`
const labelCls = 'block text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500 mb-2'

export default function JobFormModal({ job, onClose, onSaved }) {
  const isEdit = Boolean(job)

  const [form, setForm] = useState({
    title: job?.title || '',
    heading: job?.heading || '',
    location: job?.location || '',
    type: job?.type || 'Full-time',
    requirements: job?.requirements || '',
    description: job?.description || '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      let imageUrl  = job?.imageUrl || null
      let imagePath = job?.imagePath || null

      if (imageFile) {
        // Remove the previous image (if any) before uploading the replacement
        if (isEdit && job.imagePath) {
          try {
            await deleteObject(storageRef(storage, job.imagePath))
          } catch {
            // ignore if the old file is already gone
          }
        }
        imagePath = `jobs/${crypto.randomUUID()}-${imageFile.name}`
        const fileRef = storageRef(storage, imagePath)
        await uploadBytes(fileRef, imageFile)
        imageUrl = await getDownloadURL(fileRef)
      }

      const payload = {
        ...form,
        imageUrl,
        imagePath,
        updatedAt: serverTimestamp(),
      }

      if (isEdit) {
        await updateDoc(doc(db, 'jobs', job.id), payload)
      } else {
        await addDoc(collection(db, 'jobs'), {
          ...payload,
          createdAt: serverTimestamp(),
        })
      }

      onSaved()
    } catch (err) {
      console.error(err)
      setError('Failed to save job posting. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-display font-bold text-gray-900 text-[1.25rem]">
            {isEdit ? 'Edit Job Posting' : 'New Job Posting'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className={labelCls}>Job Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Senior Marketing Strategist"
              required
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Employment Type</label>
              <select name="type" value={form.type} onChange={handleChange} className={inputCls}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Colombo, Sri Lanka"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Short Summary (shown on listing card)</label>
            <textarea
              name="heading"
              value={form.heading}
              onChange={handleChange}
              rows={2}
              placeholder="A one or two sentence summary of the role"
              className={`${inputCls} resize-none`}
            />
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Full job description"
              className={`${inputCls} resize-none`}
            />
          </div>

          <div>
            <label className={labelCls}>Requirements (one per line)</label>
            <textarea
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              rows={5}
              placeholder={"3+ years experience in...\nStrong communication skills\nBachelor's degree in..."}
              className={`${inputCls} resize-none`}
            />
          </div>

          <div>
            <label className={labelCls}>Job Image</label>
            {job?.imageUrl && !imageFile && (
              <img src={job.imageUrl} alt="Current" className="w-full mb-3 object-cover" style={{ aspectRatio: '16/7' }} />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-200 px-4 py-3 text-[13px] text-gray-600 bg-white file:mr-4 file:border-0 file:bg-gray-900 file:text-white file:text-[11px] file:font-bold file:uppercase file:tracking-wider file:px-4 file:py-2 file:cursor-pointer"
            />
          </div>

          {error && <p className="text-red-600 text-[13px] font-medium">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-gray-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] py-3.5 px-8
                         hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Job'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-[11px] font-bold uppercase tracking-[0.2em] py-3.5 px-6 text-gray-500 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
