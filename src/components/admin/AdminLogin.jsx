import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

const inputCls = `
  w-full border border-gray-200 rounded-none px-4 py-3
  text-[13.5px] text-gray-700 placeholder-gray-400
  outline-none focus:border-gray-400 focus:ring-0
  transition-colors duration-200 bg-white
`

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950 px-6">
      <div className="w-full max-w-sm">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-red-500 mb-3 text-center">
          Admin
        </p>
        <h1 className="font-display font-extrabold text-white text-[1.8rem] mb-8 text-center">
          Sign in to Dashboard
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={inputCls}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={inputCls}
          />

          {error && (
            <p className="text-red-400 text-[13px] font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white text-[11px] font-bold
                       uppercase tracking-[0.2em] py-4
                       hover:bg-red-700 transition-colors duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
