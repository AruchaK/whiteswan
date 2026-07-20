import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/*
 * Catch-all for unknown URLs (App.jsx `path="*"`). Standalone rather than
 * inside AppLayout — the URL is unknown, so we don't assume the dashboard
 * chrome applies. Branded to match the rest of the app.
 */
export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-cream-50 flex flex-col items-center justify-center text-center px-6">
      <Link to="/" className="mb-10">
        <img src="/logo.svg" alt="WhiteSwan" className="h-8 opacity-80" />
      </Link>

      <p className="text-[11px] font-bold tracking-[0.18em] text-espresso-600 uppercase mb-3">
        Page not found
      </p>
      <h1 className="font-serif text-[clamp(2.5rem,8vw,6rem)] font-semibold text-espresso-900 leading-none mb-8">
        404
      </h1>
      <p className="text-[15px] text-espresso-600 leading-relaxed max-w-sm mb-8">
        We couldn&rsquo;t find that page. It may have moved, or the link may be incomplete.
      </p>

      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 bg-espresso-900 text-cream-50 text-[13px] font-medium px-5 py-2.5 rounded-full no-underline hover:bg-espresso-700 transition-colors"
      >
        <ArrowLeft size={14} strokeWidth={2} />
        Back to your dashboard
      </Link>
    </main>
  )
}
