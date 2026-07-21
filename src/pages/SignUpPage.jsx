import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, MailCheck } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import Button from '../components/ui/Button'
import TextField, { PasswordField } from '../components/ui/TextField'
import DatePicker from '../components/ui/DatePicker'
import LocationCombobox from '../components/ui/LocationCombobox'

const TODAY = new Date()
const DOB_START = new Date(1920, 0, 1)

const TOTAL_STEPS = 4

/* ── Validation ──────────────────────────────────────────────────────────
 * Each validator returns an empty string when valid, or a warm, plain-spoken
 * message when not. Messages are shown inline once a field is touched (blurred)
 * or the step's Continue is attempted — never as a silent disabled button.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(v) {
  const value = v.trim()
  if (!value) return 'Please enter your email address.'
  if (!EMAIL_RE.test(value)) return 'That doesn’t look like a complete email address.'
  return ''
}

function validateRequired(v, label) {
  return v.trim() ? '' : `Please enter your ${label}.`
}

function validatePassword(v) {
  if (v.length < 8) return 'Use at least 8 characters.'
  if (!/[A-Za-z]/.test(v) || !/[0-9]/.test(v)) return 'Include both letters and numbers.'
  return ''
}

function validateConfirm(pw, confirm) {
  if (!confirm) return 'Please re-enter your password.'
  if (pw !== confirm) return 'These passwords don’t match yet.'
  return ''
}

function passwordStrength(v) {
  let score = 0
  if (v.length >= 8) score += 1
  if (/[A-Za-z]/.test(v) && /[0-9]/.test(v)) score += 1
  if (/[^A-Za-z0-9]/.test(v) && v.length >= 10) score += 1
  return score // 0–3
}

/* Gates a set of computed field errors behind "touched or submitted", so a
 * field stays quiet until the user has engaged it or pressed Continue. */
function useStepValidation(errors) {
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const touch = (name) => () => setTouched((t) => ({ ...t, [name]: true }))
  const errorFor = (name) => (touched[name] || submitted ? errors[name] : '')
  const isValid = Object.values(errors).every((e) => !e)
  const attempt = (onValid) => () => {
    if (isValid) onValid()
    else setSubmitted(true)
  }

  return { touch, errorFor, attempt }
}

function StepHeader({ step, title, subtitle }) {
  return (
    <>
      <p className="text-[13px] font-medium text-espresso-500 mb-3">
        Step {step} of {TOTAL_STEPS}
      </p>
      <h1 className="font-serif text-[2.4rem] leading-tight text-espresso-900 mb-3 text-balance">
        {title}
      </h1>
      <p className="text-[15px] text-espresso-600 leading-relaxed mb-7">{subtitle}</p>
      <StepProgress current={step} />
    </>
  )
}

function StepProgress({ current }) {
  return (
    <div
      className="flex gap-1.5 mb-8"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={TOTAL_STEPS}
      aria-label={`Step ${current} of ${TOTAL_STEPS}`}
    >
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-colors duration-400 ${
            i < current ? 'bg-espresso-800' : 'bg-espresso-200'
          }`}
        />
      ))}
    </div>
  )
}

const btnClass = 'flex-1 rounded-full py-3.5 text-[15px] font-medium flex items-center justify-center gap-2'

function ContinueButton({ onClick }) {
  return (
    <Button type="button" onClick={onClick} className={btnClass}>
      Continue
      <ArrowRight size={17} strokeWidth={2} />
    </Button>
  )
}

function BackButton({ onClick }) {
  return (
    <Button variant="outline" type="button" onClick={onClick} className={btnClass}>
      <ArrowLeft size={17} strokeWidth={2} />
      Back
    </Button>
  )
}

/* Three-segment password strength indicator, in the muted brand palette. */
function PasswordStrength({ value, className = '' }) {
  const score = passwordStrength(value)
  const levels = [
    { label: 'Weak', text: 'text-amber-700', bar: 'bg-amber-400' },
    { label: 'Fair', text: 'text-gold-600', bar: 'bg-gold-500' },
    { label: 'Strong', text: 'text-green-700', bar: 'bg-green-600' },
  ]
  const lvl = levels[Math.max(0, score - 1)]
  return (
    <div className={className}>
      <div className="flex gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${i < score ? lvl.bar : 'bg-cream-300'}`}
          />
        ))}
      </div>
      <p className={`mt-1.5 text-[12px] font-medium ${lvl.text}`} aria-live="polite">
        Password strength: {lvl.label}
      </p>
    </div>
  )
}

/* ── Step 1 ── */
function Step1({ data, onChange, onNext }) {
  const { touch, errorFor, attempt } = useStepValidation({ email: validateEmail(data.email) })

  return (
    <>
      <StepHeader step={1} title="Begin your vault." subtitle="Tell us how to reach you." />

      <div className="mb-8">
        <TextField
          label="Email address"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          onBlur={touch('email')}
          error={errorFor('email') || undefined}
          placeholder="you@family.com"
          autoComplete="email"
        />
      </div>

      <div className="flex">
        <ContinueButton onClick={attempt(onNext)} />
      </div>

      <p className="text-[13px] text-espresso-600 text-center mt-8">
        Already have a vault?{' '}
        <Link
          to="/login"
          className="font-medium text-espresso-700 underline underline-offset-2 hover:text-espresso-900 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </>
  )
}

/* ── Step 2 ── */
function Step2({ data, onChange, onNext, onBack }) {
  const { touch, errorFor, attempt } = useStepValidation({
    firstName: validateRequired(data.firstName, 'first name'),
    surname: validateRequired(data.surname, 'surname'),
    location: validateRequired(data.location, 'location'),
  })

  return (
    <>
      <StepHeader step={2} title="A little about you." subtitle="This helps us personalise your vault." />

      <div className="space-y-5 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="First name"
            type="text"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            onBlur={touch('firstName')}
            error={errorFor('firstName') || undefined}
            autoComplete="given-name"
          />
          <TextField
            label="Surname"
            type="text"
            value={data.surname}
            onChange={(e) => onChange({ surname: e.target.value })}
            onBlur={touch('surname')}
            error={errorFor('surname') || undefined}
            autoComplete="family-name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            label="Date of birth"
            value={data.dob}
            onChange={(d) => onChange({ dob: d })}
            placeholder="Select a date"
            calendarProps={{
              startMonth: DOB_START,
              endMonth: TODAY,
              defaultMonth: data.dob ?? new Date(2010, 0),
              disabled: { after: TODAY },
            }}
          />
          <LocationCombobox
            label="Location"
            value={data.location}
            onChange={(loc) => onChange({ location: loc })}
            onBlur={touch('location')}
            error={errorFor('location') || undefined}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <BackButton onClick={onBack} />
        <ContinueButton onClick={attempt(onNext)} />
      </div>
    </>
  )
}

/* ── Step 3 ── */
function Step3({ data, onChange, onNext, onBack }) {
  const { touch, errorFor, attempt } = useStepValidation({
    password: validatePassword(data.password),
    confirmPassword: validateConfirm(data.password, data.confirmPassword),
    agreed: data.agreed ? '' : 'Please agree to the terms to continue.',
  })

  const passwordError = errorFor('password')

  return (
    <>
      <StepHeader step={3} title="Secure your legacy." subtitle="Choose a password only you will know." />

      <div className="space-y-5 mb-8">
        <div>
          <PasswordField
            label="Create password"
            value={data.password}
            onChange={(e) => onChange({ password: e.target.value })}
            onBlur={touch('password')}
            error={passwordError || undefined}
            hint={!data.password && !passwordError ? 'At least 8 characters, with letters and numbers.' : undefined}
            autoComplete="new-password"
          />
          {data.password && !passwordError && <PasswordStrength value={data.password} className="mt-2" />}
        </div>

        <PasswordField
          label="Confirm password"
          value={data.confirmPassword}
          onChange={(e) => onChange({ confirmPassword: e.target.value })}
          onBlur={touch('confirmPassword')}
          error={errorFor('confirmPassword') || undefined}
          autoComplete="new-password"
        />

        <div>
          <label className="flex items-start gap-3 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={data.agreed}
              onChange={(e) => onChange({ agreed: e.target.checked })}
              className="mt-0.5 accent-espresso-700 w-4.5 h-4.5 shrink-0"
            />
            <span className="text-[13px] text-espresso-600 leading-relaxed">
              I understand WhiteSwan encrypts my vault with AES-256, and I agree to the{' '}
              <a href="#" className="font-medium underline underline-offset-2 text-espresso-700 hover:text-espresso-900">
                Terms of Care
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium underline underline-offset-2 text-espresso-700 hover:text-espresso-900">
                Privacy promise
              </a>
              .
            </span>
          </label>
          {errorFor('agreed') && (
            <p className="mt-1.5 text-[12px] text-red-700">{errorFor('agreed')}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <BackButton onClick={onBack} />
        <ContinueButton onClick={attempt(onNext)} />
      </div>
    </>
  )
}

/* ── Step 4 ── */
function Step4({ email }) {
  return (
    <>
      <StepHeader step={4} title="Welcome to WhiteSwan." subtitle="Your vault is ready." />

      <div className="rounded-xl border border-espresso-250 bg-cream-50 p-6 mb-8">
        <div className="flex items-start gap-4">
          <span className="w-11 h-11 rounded-full bg-white border border-espresso-250 flex items-center justify-center shrink-0">
            <MailCheck size={20} strokeWidth={1.8} className="text-espresso-700" />
          </span>
          <div>
            <p className="text-[15px] font-medium text-espresso-900 mb-1">Check your inbox</p>
            <p className="text-[13px] text-espresso-600 leading-relaxed">
              We&rsquo;ve sent a verification email to{' '}
              <span className="font-medium text-espresso-800">{email || 'your address'}</span>. You
              can start exploring now, or verify later from Settings.
            </p>
          </div>
        </div>
      </div>

      <Button
        as={Link}
        to="/dashboard"
        className="w-full rounded-full py-3.5 text-[15px] font-medium flex items-center justify-center gap-2 no-underline"
      >
        Enter the vault
        <ArrowRight size={17} strokeWidth={2} />
      </Button>
    </>
  )
}

/* ── Root ── */
export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    surname: '',
    dob: null,
    location: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  })

  const update = (fields) => setFormData((prev) => ({ ...prev, ...fields }))

  return (
    <AuthLayout>
      {/* key remounts the step so the slide-up entrance re-runs each advance,
          and each step starts with a clean validation slate
          (reduced-motion falls back to an instant land — index.css). */}
      <div key={step} className="animate-slide-up">
        {step === 1 && <Step1 data={formData} onChange={update} onNext={() => setStep(2)} />}
        {step === 2 && (
          <Step2 data={formData} onChange={update} onNext={() => setStep(3)} onBack={() => setStep(1)} />
        )}
        {step === 3 && (
          <Step3 data={formData} onChange={update} onNext={() => setStep(4)} onBack={() => setStep(2)} />
        )}
        {step === 4 && <Step4 email={formData.email} />}
      </div>
    </AuthLayout>
  )
}
