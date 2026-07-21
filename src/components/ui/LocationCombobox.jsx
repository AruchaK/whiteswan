import { useId, useState } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react'
import { Check, ChevronsUpDown, MapPin } from 'lucide-react'
import { LOCATIONS } from '../../lib/locations'

/*
 * Searchable location field (Headless UI Combobox) over a bundled dataset —
 * type to filter, click or key to pick. Styled to match TextField/DatePicker.
 * The option list is anchored (floats outside the form) so it never clips, and
 * sized to the input via Headless UI's --input-width.
 *
 * `value` is the selected string ('' when none).
 */
export default function LocationCombobox({
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  placeholder = 'Search for a city or province',
  options = LOCATIONS,
  className = '',
}) {
  const id = useId()
  const [query, setQuery] = useState('')
  const descId = error || hint ? `${id}-desc` : undefined

  const filtered =
    query === ''
      ? options
      : options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[13px] font-medium text-espresso-700 mb-1.5">
        {label}
      </label>
      <Combobox value={value} onChange={(v) => onChange(v ?? '')} onClose={() => setQuery('')}>
        <div className="relative">
          <MapPin
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-500"
          />
          <ComboboxInput
            id={id}
            onBlur={onBlur}
            aria-describedby={descId}
            aria-invalid={error ? 'true' : undefined}
            displayValue={(v) => v || ''}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={`w-full min-h-12 rounded-lg border bg-white pl-10 pr-10 py-2.5 text-[15px] text-espresso-900 placeholder:text-espresso-500 transition-colors focus:border-espresso-600 ${
              error ? 'border-red-400' : 'border-espresso-250'
            }`}
          />
          <ComboboxButton
            aria-label="Show location options"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-espresso-500 cursor-pointer"
          >
            <ChevronsUpDown size={16} strokeWidth={1.8} aria-hidden="true" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          className="z-50 max-h-64 w-[var(--input-width)] overflow-auto rounded-xl border border-espresso-250 bg-white p-1.5 shadow-lg [--anchor-gap:0.5rem] empty:invisible"
        >
          {filtered.length === 0 ? (
            <p className="px-3 py-2.5 text-[13px] text-espresso-600">No matches for “{query.trim()}”.</p>
          ) : (
            filtered.map((option) => (
              <ComboboxOption
                key={option}
                value={option}
                className="group flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-[15px] text-espresso-800 data-[focus]:bg-cream-100 data-[selected]:font-medium"
              >
                <span>{option}</span>
                <Check
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="invisible shrink-0 text-espresso-700 group-data-[selected]:visible"
                />
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
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
}
