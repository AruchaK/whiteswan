import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

const TOTAL_STEPS = 4

function StepProgress({ current }) {
  return (
    <div className="flex gap-1.5 mb-9">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`h-[2px] flex-1 transition-colors duration-400 ${
            i < current ? 'bg-espresso-800' : 'bg-espresso-200'
          }`}
        />
      ))}
    </div>
  )
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.16em] text-espresso-500 uppercase mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full border-0 border-b border-espresso-200 bg-transparent py-2 text-sm text-espresso-800 placeholder-espresso-300 focus:outline-none focus:border-espresso-600 transition-colors'

function ContinueButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex-1 bg-espresso-900 text-cream-50 py-3 text-xs tracking-[0.12em] uppercase hover:bg-espresso-700 active:bg-espresso-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Continue →
    </button>
  )
}

function BackButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 border border-espresso-300 text-espresso-700 py-3 text-xs tracking-[0.12em] uppercase hover:bg-cream-100 transition-colors"
    >
      ← Back
    </button>
  )
}

/* ── Step 1 ── */
function Step1({ data, onChange, onNext }) {
  return (
    <>
      <p className="text-[10px] tracking-[0.18em] text-espresso-400 uppercase mb-5">Step 1 of 4</p>
      <h1 className="font-serif text-[2.4rem] leading-tight text-espresso-900 mb-3">
        Begin your vault.
      </h1>
      <p className="text-sm text-espresso-400 leading-relaxed mb-8">Tell us how to reach you.</p>

      <StepProgress current={1} />

      <div className="mb-8">
        <FormField label="Email Address">
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="you@family.com"
            autoComplete="email"
            className={inputClass}
          />
        </FormField>
      </div>

      <ContinueButton onClick={onNext} disabled={!data.email.trim()} />

      <p className="text-[11px] text-espresso-400 text-center mt-8">
        Already have a vault?{' '}
        <Link
          to="/login"
          className="text-espresso-700 underline underline-offset-2 hover:text-espresso-900 transition-colors"
        >
          Sign in.
        </Link>
      </p>
    </>
  )
}

/* ── Step 2 ── */
function Step2({ data, onChange, onNext, onBack }) {
  const canContinue = data.firstName.trim() && data.surname.trim()

  return (
    <>
      <p className="text-[10px] tracking-[0.18em] text-espresso-400 uppercase mb-5">Step 2 of 4</p>
      <h1 className="font-serif text-[2.4rem] leading-tight text-espresso-900 mb-3">
        A little about you.
      </h1>
      <p className="text-sm text-espresso-400 leading-relaxed mb-8">
        Help us personalise your vault.
      </p>

      <StepProgress current={2} />

      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="First Name">
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              autoComplete="given-name"
              className={inputClass}
            />
          </FormField>
          <FormField label="Surname">
            <input
              type="text"
              value={data.surname}
              onChange={(e) => onChange({ surname: e.target.value })}
              autoComplete="family-name"
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Date of Birth">
            <input
              type="text"
              value={data.dob}
              onChange={(e) => onChange({ dob: e.target.value })}
              placeholder="mm/dd/yyyy"
              autoComplete="bday"
              className={inputClass}
            />
          </FormField>
          <FormField label="Location">
            <input
              type="text"
              value={data.location}
              onChange={(e) => onChange({ location: e.target.value })}
              autoComplete="address-level2"
              className={inputClass}
            />
          </FormField>
        </div>
      </div>

      <div className="flex gap-3">
        <BackButton onClick={onBack} />
        <ContinueButton onClick={onNext} disabled={!canContinue} />
      </div>
    </>
  )
}

/* ── Step 3 ── */
function Step3({ data, onChange, onNext, onBack }) {
  const canContinue =
    data.password.length >= 8 &&
    data.password === data.confirmPassword &&
    data.agreed

  return (
    <>
      <p className="text-[10px] tracking-[0.18em] text-espresso-400 uppercase mb-5">Step 3 of 4</p>
      <h1 className="font-serif text-[2.4rem] leading-tight text-espresso-900 mb-3">
        Secure your legacy.
      </h1>
      <p className="text-sm text-espresso-400 leading-relaxed mb-8">Protect your legacy.</p>

      <StepProgress current={3} />

      <div className="space-y-6 mb-8">
        <FormField label="Create Password">
          <input
            type="password"
            value={data.password}
            onChange={(e) => onChange({ password: e.target.value })}
            autoComplete="new-password"
            className={inputClass}
          />
          <p className="text-[11px] text-espresso-400 mt-1.5">
            Minimum 8 characters with letters, numbers, symbols
          </p>
        </FormField>

        <FormField label="Confirm Password">
          <input
            type="password"
            value={data.confirmPassword}
            onChange={(e) => onChange({ confirmPassword: e.target.value })}
            autoComplete="new-password"
            className={inputClass}
          />
        </FormField>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.agreed}
            onChange={(e) => onChange({ agreed: e.target.checked })}
            className="mt-0.5 accent-espresso-700 w-3.5 h-3.5 flex-shrink-0"
          />
          <span className="text-[11px] text-espresso-500 leading-relaxed">
            I understand WhiteSwan encrypts my vault with AES-256 and agree to the{' '}
            <a href="#" className="underline underline-offset-2 text-espresso-700 hover:text-espresso-900">
              Terms of Care
            </a>{' '}
            and{' '}
            <a href="#" className="underline underline-offset-2 text-espresso-700 hover:text-espresso-900">
              Privacy promise
            </a>
            .
          </span>
        </label>
      </div>

      <div className="flex gap-3">
        <BackButton onClick={onBack} />
        <ContinueButton onClick={onNext} disabled={!canContinue} />
      </div>
    </>
  )
}

/* ── Step 4 ── */
function Step4({ email }) {
  return (
    <>
      <p className="text-[10px] tracking-[0.18em] text-espresso-400 uppercase mb-5">Step 4 of 4</p>
      <h1 className="font-serif text-[2.4rem] leading-tight text-espresso-900 mb-3">
        Welcome to WhiteSwan.
      </h1>
      <p className="text-sm text-espresso-400 leading-relaxed mb-8">Your vault is ready.</p>

      <StepProgress current={4} />

      <div className="border border-espresso-200 p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-6 h-6 rounded-full border border-espresso-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="#5C4530"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-espresso-700 mb-2">your vault is ready.</p>
            <p className="text-[12px] text-espresso-400 leading-relaxed">
              We&rsquo;ve sent a verification email to{' '}
              <span className="text-espresso-700">{email}</span>. You can continue exploring now, or
              verify later from Settings.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-espresso-900 text-cream-50 py-3 text-xs tracking-[0.12em] uppercase hover:bg-espresso-700 active:bg-espresso-950 transition-colors"
      >
        Enter the vault →
      </button>
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
    dob: '',
    location: 'Bangkok, Thailand',
    password: '',
    confirmPassword: '',
    agreed: false,
  })

  const update = (fields) => setFormData((prev) => ({ ...prev, ...fields }))

  return (
    <AuthLayout>
      {step === 1 && (
        <Step1 data={formData} onChange={update} onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <Step2
          data={formData}
          onChange={update}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3
          data={formData}
          onChange={update}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && <Step4 email={formData.email} />}
    </AuthLayout>
  )
}
