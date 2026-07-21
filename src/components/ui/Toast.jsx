import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'

/*
 * Transient confirmation toast. Auto-dismisses after ~4.5s; supports an
 * optional action link (e.g. "View"). Sits at the top of the semantic z-scale
 * (above the modal) so a confirmation is never hidden behind a dialog.
 * Shared by the global Add flow (AppLayout) and the pillar pages.
 */
export default function Toast({ message, action, onDismiss }) {
  useEffect(() => {
    const id = setTimeout(onDismiss, 4500)
    return () => clearTimeout(id)
  }, [onDismiss])

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60 flex items-center gap-2.5 rounded-full bg-espresso-900 text-cream-50 pl-3.5 pr-2 py-2 shadow-lg animate-slide-up"
    >
      <span className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center shrink-0">
        <Check size={12} className="text-white" strokeWidth={2.5} />
      </span>
      <span className="text-[13px] font-medium">{message}</span>
      {action && (
        <Link
          to={action.to}
          onClick={onDismiss}
          className="text-[13px] font-semibold text-gold-400 hover:text-gold-100 no-underline transition-colors"
        >
          {action.label}
        </Link>
      )}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="p-1 rounded-full text-cream-50/60 hover:text-cream-50 transition-colors cursor-pointer"
      >
        <X size={15} strokeWidth={2} />
      </button>
    </div>
  )
}
