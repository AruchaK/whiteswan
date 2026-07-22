import { ShieldCheck, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'

/*
 * Document status pill (verified / draft), shared by the Vault and the
 * family-tree document lists. The status→label/icon/color map lived in both
 * files verbatim; it now lives here once.
 *
 * `size` picks the padding/type ("md" in the Vault grid, "sm" in the tree
 * side-panel). `children` renders after the label — the tree appends "· date".
 */
const STATUS = {
  verified: { label: 'Verified', icon: ShieldCheck, className: 'text-green-700 bg-green-50 border-green-100' },
  draft: { label: 'Draft', icon: TriangleAlert, className: 'text-amber-700 bg-amber-50 border-amber-100' },
}

const SIZES = {
  md: { box: 'text-[12px] px-2.5 py-1', icon: 12 },
  sm: { box: 'text-[11px] px-2.25 py-0.75', icon: 11 },
}

export type DocumentStatus = keyof typeof STATUS
type StatusBadgeSize = keyof typeof SIZES

interface StatusBadgeProps {
  status: DocumentStatus
  size?: StatusBadgeSize
  className?: string
  children?: ReactNode
}

export default function StatusBadge({ status, size = 'md', className = '', children }: StatusBadgeProps) {
  const s = STATUS[status]
  const z = SIZES[size]
  const Icon = s.icon
  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full border ${z.box} ${s.className} ${className}`}>
      <Icon size={z.icon} strokeWidth={2} />
      {s.label}{children}
    </span>
  )
}
