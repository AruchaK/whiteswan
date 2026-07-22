import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

interface BackLinkProps {
  to: string
  children: ReactNode
  className?: string
}

/*
 * "← Back to X" navigation link, shared by the add/tree/pillar pages.
 * Pass spacing (e.g. mb-4) through className at the call site.
 */
export default function BackLink({ to, children, className = '' }: BackLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-1.5 text-[13px] font-medium text-espresso-600 hover:text-espresso-700 transition-colors no-underline ${className}`}
    >
      <ArrowLeft size={14} strokeWidth={2} />
      {children}
    </Link>
  )
}
