import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'

function DuneBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EDE0CC" />
            <stop offset="55%" stopColor="#D9C4A6" />
            <stop offset="100%" stopColor="#C4A07A" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#skyGrad)" />
        {/* Back dune - lightest */}
        <path
          d="M-5 78 Q10 62 28 66 Q50 72 72 60 Q88 52 105 62 L105 100 L-5 100 Z"
          fill="#C8A882"
          opacity="0.65"
        />
        {/* Mid dune */}
        <path
          d="M-5 86 Q15 74 38 78 Q58 82 80 72 Q95 66 105 74 L105 100 L-5 100 Z"
          fill="#A88050"
          opacity="0.8"
        />
        {/* Front dune */}
        <path
          d="M-5 92 Q20 84 45 87 Q68 90 88 82 Q98 78 105 84 L105 100 L-5 100 Z"
          fill="#8C6030"
          opacity="0.9"
        />
        {/* Ground fill */}
        <path
          d="M-5 96 Q25 92 50 94 Q75 96 105 91 L105 100 L-5 100 Z"
          fill="#6E4820"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-start justify-between p-12 select-none">
        <DuneBackground />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" aria-label="WhiteSwan home">
            <img src="/logo.svg" alt="WhiteSwan" className="w-40 opacity-90" />
          </Link>
        </div>

        {/* Quote block */}
        <div className="relative z-10 pb-8 max-w-sm">
          <blockquote className="font-serif text-[1.65rem] italic text-espresso-900 leading-normal text-balance">
            &ldquo;The most loving decisions are often the ones made before they are needed.&rdquo;
          </blockquote>
          <p className="text-[13px] font-medium text-espresso-700 mt-5">
            WhiteSwan &middot; our brand belief
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center px-6 py-12 sm:px-8 lg:px-16">
        <div className="w-full max-w-md">{children}</div>

        {/* Trust marker — present on every auth surface (PRODUCT: trust on every screen). */}
        <p className="mt-10 flex items-center justify-center gap-1.5 text-[12px] text-espresso-600">
          <Lock size={13} strokeWidth={1.8} aria-hidden="true" />
          Encrypted and private — only you hold the key.
        </p>
      </div>
    </div>
  )
}
