/*
 * The thin readiness/progress bar used across the dashboard, planning, and
 * pillar pages. Previously hand-rolled ~5 times with drifting track colors,
 * heights, and easings; this is the one implementation.
 *
 * Fill can be either a hex `color` (inline background — e.g. a pillar color) or
 * a `fillClassName` (for class-based fills like a gradient or bg-espresso-900);
 * `fillClassName` wins when both are given. Track, height, and extra classes
 * are overridable, but the transition/easing is fixed so bars animate alike.
 */
export default function ProgressBar({
  value,
  color,
  fillClassName = '',
  trackClassName = 'bg-cream-300',
  height = 'h-1.5',
  className = '',
}) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={`${height} rounded-full ${trackClassName} overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${fillClassName}`}
        style={{ width: `${clamped}%`, ...(color && !fillClassName ? { background: color } : null) }}
      />
    </div>
  )
}
