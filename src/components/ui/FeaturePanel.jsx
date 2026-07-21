/*
 * The dark promo panel (deep espresso ground + a soft blurred gold glow in the
 * corner) used for "pick up where you left off" and the family-tree promo.
 * Previously duplicated verbatim on two pages.
 *
 * Renders the shell + glow only; callers supply their own content and action,
 * wrapping foreground elements in `relative z-10` so they sit above the glow.
 */
export default function FeaturePanel({ padding = 'p-8', className = '', children }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-espresso-950 ${padding} flex flex-col justify-between min-h-55 ${className}`}
    >
      <div
        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gold-500/20 blur-3xl"
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
