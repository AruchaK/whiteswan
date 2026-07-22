import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import Button from '../components/ui/Button'
import TextField, { PasswordField } from '../components/ui/TextField'

export default function LoginPage() {
  interface LoginForm {
    email: string
    password: string
    remember: boolean
  }

  const [form, setForm] = useState<LoginForm>({ email: '', password: '', remember: false })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: integrate auth
  }

  const update = (field: keyof LoginForm) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }))

  return (
    <AuthLayout>
      <div className="animate-slide-up">
        <p className="text-[13px] font-medium text-espresso-500 mb-3">Welcome back</p>

        <h1 className="font-serif text-[2.4rem] leading-tight text-espresso-900 mb-3 text-balance">
          Sign in to your vault.
        </h1>

        <p className="text-[15px] text-espresso-600 leading-relaxed mb-9">
          Continue preparing what matters most — quietly, securely, together.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="you@family.com"
            autoComplete="email"
          />

          <PasswordField
            label="Password"
            value={form.password}
            onChange={update('password')}
            placeholder="Your password"
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between gap-3 pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={update('remember')}
                className="accent-espresso-700 w-4.5 h-4.5"
              />
              <span className="text-[13px] text-espresso-600">Keep me signed in</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-[13px] font-medium text-espresso-700 underline underline-offset-2 hover:text-espresso-900 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full py-3.5 text-[15px] font-medium flex items-center justify-center gap-2 mt-2"
          >
            Sign in
            <ArrowRight size={17} strokeWidth={2} />
          </Button>
        </form>

        <p className="text-[13px] text-espresso-600 text-center mt-8">
          New to WhiteSwan?{' '}
          <Link
            to="/signup"
            className="font-medium text-espresso-700 underline underline-offset-2 hover:text-espresso-900 transition-colors"
          >
            Create your account
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
