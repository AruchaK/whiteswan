const DEFAULT_QUOTE = 'The most loving decisions are often the ones made before they are needed.'

export default function FloatingPreparednessWidget({
  preparedness,
  href = '/dashboard/planning',
  quote = DEFAULT_QUOTE,
}) {
  return (
    <div className="hidden lg:block fixed bottom-6 left-6 z-40 bg-white border border-espresso-250 rounded-xl px-5 py-4 w-45 shadow-[0_4px_24px_rgba(0,0,0,0.06)] animate-slide-up">
      <p className="text-[9px] font-bold tracking-[0.18em] text-espresso-600 uppercase mb-2">Preparedness</p>
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-[28px] font-serif font-semibold text-espresso-900 leading-none">{preparedness}%</span>
        <span className="text-[11px] text-espresso-600">overall</span>
      </div>
      <a
        href={href}
        className="inline-flex items-center gap-1 text-[12px] font-medium text-gold-600 hover:text-gold-500 transition-colors no-underline mt-1"
      >
        Continue planning <span aria-hidden>→</span>
      </a>
      <p className="text-[10px] italic text-espresso-600 leading-snug mt-4 border-t border-espresso-250 pt-3">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}
