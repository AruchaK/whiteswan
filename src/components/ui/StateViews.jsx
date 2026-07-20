import { AlertTriangle, RotateCw } from 'lucide-react'
import Button from './Button'

/*
 * Shared loading / error / empty states so every data surface handles the full
 * lifecycle the same way. Pair with lib/useResource.js. See VaultPage for the
 * reference wiring.
 */

/* Skeleton placeholder while a resource loads. `count` cards, matching the grid
   the real content uses. The pulse has a reduced-motion fallback (index.css). */
export function LoadingSkeleton({ count = 6, className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border border-espresso-250 rounded-xl px-6 py-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-cream-300 animate-skeleton" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-2/3 rounded bg-cream-300 animate-skeleton" />
              <div className="h-3 w-2/5 rounded bg-cream-200 animate-skeleton" />
            </div>
          </div>
          <div className="h-3 w-24 rounded bg-cream-200 animate-skeleton" />
        </div>
      ))}
    </div>
  )
}

/* Recoverable error with a retry affordance. */
export function ErrorState({ title = 'Something went wrong', message = 'We couldn’t load this just now.', onRetry }) {
  return (
    <div
      role="alert"
      className="border border-espresso-250 rounded-2xl bg-white py-12 px-8 flex flex-col items-center text-center"
    >
      <span className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4">
        <AlertTriangle size={22} strokeWidth={1.8} className="text-amber-600" />
      </span>
      <p className="text-[16px] font-medium text-espresso-900 mb-1">{title}</p>
      <p className="text-[13px] text-espresso-600 mb-5 max-w-sm">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-full"
        >
          <RotateCw size={13} strokeWidth={2} />
          Try again
        </Button>
      )}
    </div>
  )
}

/* Empty state that teaches the surface rather than just saying "nothing here". */
export function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="border-2 border-dashed border-espresso-250 rounded-2xl bg-cream-50 py-12 px-8 flex flex-col items-center text-center">
      {Icon && (
        <span className="w-12 h-12 rounded-xl bg-cream-200 flex items-center justify-center mb-4">
          <Icon size={22} strokeWidth={1.8} className="text-espresso-600" />
        </span>
      )}
      <p className="text-[16px] font-medium text-espresso-900 mb-1">{title}</p>
      {message && <p className="text-[13px] text-espresso-600 mb-5 max-w-sm">{message}</p>}
      {action}
    </div>
  )
}
