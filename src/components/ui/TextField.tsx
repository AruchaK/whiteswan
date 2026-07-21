import { forwardRef, useId, useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'

/*
 * Labeled text input — the form primitive for auth, settings, and add flows.
 * A filled, bordered field (not a bare underline): 48px min height, 15px value
 * text, sentence-case label, associated via htmlFor/id, and a keyboard focus
 * ring inherited from the global :focus-visible rule (index.css) plus a border
 * shift on focus. Persona reads with glasses — legibility and hit size win over
 * the minimal underline look.
 *
 * `hint` shows helper copy; `error` replaces it and flags aria-invalid.
 * `trailing` renders inside the field on the right (e.g. a password reveal).
 */
export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
  trailing?: ReactNode
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, trailing, id, className = '', ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id || autoId
  const descId = error || hint ? `${inputId}-desc` : undefined

  return (
    <div className={className}>
      <label htmlFor={inputId} className="block text-[13px] font-medium text-espresso-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          aria-describedby={descId}
          aria-invalid={error ? 'true' : undefined}
          className={`w-full min-h-12 rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-espresso-900 placeholder:text-espresso-500 transition-colors focus:border-espresso-600 ${
            error ? 'border-red-400' : 'border-espresso-250'
          } ${trailing ? 'pr-11' : ''}`}
          {...props}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">{trailing}</div>
        )}
      </div>
      {error ? (
        <p id={descId} className="mt-1.5 text-[12px] text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p id={descId} className="mt-1.5 text-[12px] text-espresso-600 leading-relaxed">
          {hint}
        </p>
      ) : null}
    </div>
  )
})

export default TextField

/*
 * Password field with a built-in show/hide reveal. Manages its own visibility;
 * the toggle is a 40px keyboard-reachable target with a legible icon (not the
 * near-invisible espresso-300 the old inputs used).
 */
export function PasswordField(props: Omit<TextFieldProps, 'type' | 'trailing'>) {
  const [show, setShow] = useState(false)
  return (
    <TextField
      type={show ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="flex items-center justify-center w-10 h-10 rounded-md text-espresso-500 hover:text-espresso-800 transition-colors cursor-pointer"
        >
          {show ? <EyeOff size={17} strokeWidth={1.8} /> : <Eye size={17} strokeWidth={1.8} />}
        </button>
      }
      {...props}
    />
  )
}
