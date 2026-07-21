import { useId } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { Calendar } from 'lucide-react'
import 'react-day-picker/style.css'

/*
 * Labeled date field that opens a calendar (react-day-picker) in a floating
 * Headless UI popover. The trigger mirrors TextField exactly — 48px, rounded-lg,
 * espresso-250 border, keyboard focus ring — so date and text inputs read as one
 * family. The popover is anchored (rendered outside the form) so it never clips.
 *
 * `value` is a Date | null. Calendar constraints (startMonth/endMonth/disabled/
 * captionLayout/defaultMonth) pass through `calendarProps`.
 */
export default function DatePicker({
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  placeholder = 'Select a date',
  displayFormat = 'd MMM yyyy',
  calendarProps,
  className = '',
}) {
  const id = useId()
  const descId = error || hint ? `${id}-desc` : undefined

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[13px] font-medium text-espresso-700 mb-1.5">
        {label}
      </label>
      <Popover className="relative">
        <PopoverButton
          id={id}
          onBlur={onBlur}
          aria-describedby={descId}
          aria-invalid={error ? 'true' : undefined}
          className={`flex w-full min-h-12 items-center justify-between gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-[15px] transition-colors cursor-pointer focus:border-espresso-600 ${
            error ? 'border-red-400' : 'border-espresso-250'
          } ${value ? 'text-espresso-900' : 'text-espresso-500'}`}
        >
          <span>{value ? format(value, displayFormat) : placeholder}</span>
          <Calendar size={17} strokeWidth={1.8} className="text-espresso-500 shrink-0" aria-hidden="true" />
        </PopoverButton>

        <PopoverPanel
          anchor="bottom start"
          className="ws-calendar z-50 rounded-xl border border-espresso-250 bg-white p-3 shadow-lg [--anchor-gap:0.5rem]"
        >
          {({ close }) => (
            <DayPicker
              mode="single"
              selected={value ?? undefined}
              onSelect={(d) => {
                onChange(d ?? null)
                if (d) close()
              }}
              captionLayout="dropdown"
              {...calendarProps}
            />
          )}
        </PopoverPanel>
      </Popover>
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
