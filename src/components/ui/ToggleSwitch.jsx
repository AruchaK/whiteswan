export default function ToggleSwitch({ checked, onChange, ariaLabel, activeClassName = 'peer-checked:bg-espresso-900', className = '' }) {
  return (
    <label className={`relative w-11 h-6 shrink-0 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel}
        className="peer absolute opacity-0 w-0 h-0"
      />
      <span className={`absolute inset-0 bg-cream-400 rounded-xl transition-colors duration-250 ${activeClassName}`} />
      <span className="absolute top-0.75 left-0.75 w-4.5 h-4.5 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-transform duration-250 peer-checked:translate-x-5" />
    </label>
  )
}
