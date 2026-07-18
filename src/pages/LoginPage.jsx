import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import Button from '../components/ui/Button'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', remember: false })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: integrate auth
  }

  const update = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }))

  return (
    <AuthLayout>
      <p className="text-[10px] tracking-[0.18em] text-espresso-400 uppercase mb-5">
        Welcome Back
      </p>

      <h1 className="font-serif text-[2.4rem] leading-tight text-espresso-900 mb-3">
        Sign in to your vault.
      </h1>

      <p className="text-sm text-espresso-400 leading-relaxed mb-10">
        Continue preparing what matters most — quality, securely, together.
      </p>

      <form onSubmit={handleSubmit} className="space-y-7" noValidate>
        {/* Email */}
        <div>
          <label className="block text-[10px] tracking-[0.16em] text-espresso-500 uppercase mb-2">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="you@family.com"
            autoComplete="email"
            className="w-full border-0 border-b border-espresso-200 bg-transparent py-2 text-sm text-espresso-800 placeholder-espresso-300 focus:outline-none focus:border-espresso-600 transition-colors"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[10px] tracking-[0.16em] text-espresso-500 uppercase mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={update('password')}
              placeholder="Your password"
              autoComplete="current-password"
              className="w-full border-0 border-b border-espresso-200 bg-transparent py-2 pr-8 text-sm text-espresso-800 placeholder-espresso-300 focus:outline-none focus:border-espresso-600 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-0 top-2 text-espresso-300 hover:text-espresso-600 transition-colors"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={update('remember')}
              className="accent-espresso-700 w-3.5 h-3.5"
            />
            <span className="text-[11px] text-espresso-500">Keep me signed in on this device</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-[11px] text-espresso-400 underline underline-offset-2 hover:text-espresso-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full py-3 text-xs tracking-[0.12em] uppercase">
          Sign in →
        </Button>
      </form>

      <p className="text-[11px] text-espresso-400 text-center mt-8">
        New to WhiteSwan?{' '}
        <Link
          to="/signup"
          className="text-espresso-700 underline underline-offset-2 hover:text-espresso-900 transition-colors"
        >
          Create your account
        </Link>
      </p>
    </AuthLayout>
  )
}
