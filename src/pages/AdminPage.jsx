import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import AdminLogin from '../components/admin/AdminLogin'
import AdminDashboard from '../components/admin/AdminDashboard'

export default function AdminPage() {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-950">
        <p className="text-white/50 text-[13.5px]">Loading…</p>
      </div>
    )
  }

  return user ? <AdminDashboard user={user} /> : <AdminLogin />
}
