import { Link } from 'react-router-dom'
import { PILLARS_BY_KEY } from '../../lib/pillars'
import ProgressBar from './ProgressBar'

/*
 * A single pillar as a card: colored banner (icon + label + done/total + %),
 * then a body with summary, readiness bar, status, and a link into the pillar.
 * Consumes an entry from READINESS_LIST (lib/readiness.js): { key, readiness,
 * done, total, summary, status, needsAttention? }.
 */
export default function PillarCard({ progress }) {
  const pillar = PILLARS_BY_KEY[progress.key]
  const Icon = pillar.icon

  return (
    <div className="rounded-xl overflow-hidden border border-espresso-250 bg-white flex flex-col">
      {/* Banner */}
      <div className="p-5 flex items-center justify-between" style={{ background: pillar.banner }}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <Icon size={16} className="text-white" strokeWidth={1.8} />
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-[15px] leading-tight truncate">{pillar.label}</p>
            <p className="text-white/70 text-[12px] mt-0.5">{progress.done}/{progress.total} done</p>
          </div>
        </div>
        <span className="text-white font-serif text-2xl shrink-0">{progress.readiness}%</span>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-[13px] text-espresso-700 mb-3">{progress.summary}</p>

        <ProgressBar value={progress.readiness} color={pillar.color} className="mb-3" />

        {progress.needsAttention ? (
          <span className="inline-flex items-center text-xs font-medium text-red-700 bg-red-50 border border-red-100 rounded-full px-3 py-1 self-start mb-3">
            Needs attention
          </span>
        ) : (
          <p className="text-[12px] text-espresso-600 mb-3">
            Missing: <span className="font-medium text-espresso-700">{progress.status}</span>
          </p>
        )}

        <Link
          to={`/dashboard/planning/${pillar.key}`}
          className="mt-auto inline-flex items-center gap-1 text-[13px] font-medium text-espresso-600 hover:text-espresso-800 transition-colors no-underline"
        >
          {progress.needsAttention ? 'Start guided flow' : 'Open pillar'} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}
