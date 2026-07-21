import { FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PILLARS_BY_KEY, type PillarKey } from '../../lib/pillars'

interface CategoryIconProps {
  category: PillarKey
  icon?: LucideIcon
  size?: number
  className?: string
}

export default function CategoryIcon({ category, icon: Icon = FileText, size = 42, className = '' }: CategoryIconProps) {
  const pillar = PILLARS_BY_KEY[category]
  return (
    <div
      className={`rounded-full flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size, background: pillar?.banner }}
    >
      <Icon size={Math.round(size * 0.45)} className="text-white" strokeWidth={1.8} />
    </div>
  )
}
