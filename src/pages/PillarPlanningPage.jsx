import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, AlertTriangle, Clock } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import Card from '../components/ui/Card'
import { PILLARS_BY_KEY } from '../lib/pillars'

/* ── Mock checklist data, keyed by pillar ── */
const PILLAR_ITEMS = {
  legal: [
    { label: 'Will', status: 'done' },
    { label: 'Power of Attorney', status: 'done' },
    { label: 'Healthcare Proxy', status: 'done' },
    { label: 'Beneficiary Designations', status: 'done' },
    { label: 'Trusts', status: 'missing', critical: true },
    { label: 'Guardianship Documents', status: 'missing' },
  ],
  medical: [
    { label: 'Advance Directive', status: 'done' },
    { label: 'GP / Primary Doctor', status: 'done' },
    { label: 'Insurance Details', status: 'done' },
    { label: 'Allergies & Conditions', status: 'missing', critical: true },
    { label: 'Medication List', status: 'missing', critical: true },
    { label: 'Emergency Contacts', status: 'missing' },
    { label: 'Preferred Hospital', status: 'missing' },
    { label: 'Organ Donor Preference', status: 'missing' },
  ],
  financial: [
    { label: 'Bank Accounts', status: 'done' },
    { label: 'Investments', status: 'done' },
    { label: 'Insurance Policies', status: 'done' },
    { label: 'Pension', status: 'done' },
    { label: 'Tax Records', status: 'done' },
    { label: 'Debts & Loans', status: 'review' },
    { label: 'Property Deeds', status: 'missing' },
  ],
  personal: [
    { label: 'Letters', status: 'done' },
    { label: 'Personal Values', status: 'done' },
    { label: 'Funeral Wishes', status: 'missing' },
    { label: 'Digital Legacy', status: 'missing' },
    { label: 'Life Story', status: 'missing' },
    { label: 'Hobbies & Interests', status: 'missing' },
    { label: 'Charitable Wishes', status: 'missing' },
    { label: 'Personal Mementos', status: 'missing' },
    { label: 'Final Messages', status: 'missing' },
  ],
  family: [
    { label: 'Family Network Map', status: 'done' },
    { label: 'Roles & Responsibilities', status: 'done' },
    { label: 'Emergency Plan', status: 'done' },
    { label: 'Family Traditions', status: 'done' },
    { label: 'Key Contacts', status: 'missing', critical: true },
    { label: 'Communication Preferences', status: 'missing' },
    { label: 'Guardian Arrangements', status: 'missing' },
    { label: 'Family Meeting Notes', status: 'missing' },
    { label: 'Shared Calendar', status: 'missing' },
  ],
}

function StatusIcon({ status }) {
  if (status === 'done') {
    return (
      <span className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0">
        <Check size={13} className="text-green-700" strokeWidth={2.2} />
      </span>
    )
  }
  if (status === 'review') {
    return (
      <span className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
        <Clock size={12} className="text-amber-600" strokeWidth={2} />
      </span>
    )
  }
  return (
    <span className="w-6 h-6 rounded-full bg-cream-200 flex items-center justify-center shrink-0">
      <AlertTriangle size={12} className="text-espresso-400" strokeWidth={2} />
    </span>
  )
}

/* ── Page ── */
export default function PillarPlanningPage() {
  const { pillar: pillarKey } = useParams()
  const pillar = PILLARS_BY_KEY[pillarKey]
  const items = PILLAR_ITEMS[pillarKey]

  if (!pillar || !items) {
    return (
      <AppLayout>
        <div className="max-w-300 mx-auto space-y-6 animate-fade-in">
          <Link
            to="/dashboard/planning"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-espresso-500 hover:text-espresso-700 transition-colors no-underline mb-4"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to planning
          </Link>
          <Card className="p-8">
            <p className="text-[13px] text-espresso-400 italic">
              We couldn&rsquo;t find a pillar called &ldquo;{pillarKey}&rdquo;.
            </p>
          </Card>
        </div>
      </AppLayout>
    )
  }

  const done = items.filter((item) => item.status === 'done').length
  const total = items.length
  const criticalMissing = items.filter((item) => item.status === 'missing' && item.critical).length
  const Icon = pillar.icon

  return (
    <AppLayout>
      <div className="max-w-300 mx-auto space-y-6 animate-fade-in">
        <Link
          to="/dashboard/planning"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-espresso-500 hover:text-espresso-700 transition-colors no-underline"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Back to planning
        </Link>

        {/* ─ Header ─ */}
        <section className="rounded-xl overflow-hidden border border-espresso-200">
          <div className="p-6 sm:p-8 flex items-center gap-4" style={{ background: pillar.banner }}>
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <Icon size={22} className="text-white" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-white/70 text-[10px] font-bold tracking-[0.16em] uppercase mb-1">Pillar</p>
              <h1 className="font-serif text-2xl sm:text-3xl text-white leading-tight">{pillar.label}</h1>
              <p className="text-white/80 text-[13px] mt-1">{done} of {total} essentials complete</p>
            </div>
          </div>
          <div className="bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-medium text-espresso-600">Progress</span>
              <span className="text-[14px] font-semibold text-espresso-800 tabular-nums">
                {Math.round((done / total) * 100)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-cream-200 overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-[width] duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: `${Math.round((done / total) * 100)}%`, background: pillar.color }}
              />
            </div>
            {criticalMissing > 0 && (
              <p className="text-[12px] text-amber-700 font-medium mt-3">
                {criticalMissing} critical {criticalMissing === 1 ? 'item' : 'items'} missing
              </p>
            )}
          </div>
        </section>

        {/* ─ Essentials checklist ─ */}
        <Card className="p-6 sm:p-8">
          <h2 className="text-[15px] font-semibold text-espresso-900 mb-0.5">Essentials</h2>
          <p className="text-[12px] text-espresso-400 mb-5">Everything needed for this pillar to be complete</p>

          <div className="space-y-0 divide-y divide-black/6">
            {items.map((item) => (
              <div key={item.label} className="flex items-center gap-3 py-3.5 first:pt-0">
                <StatusIcon status={item.status} />
                <p className={`flex-1 text-[13.5px] ${item.status === 'done' ? 'text-espresso-500 line-through' : 'text-espresso-800 font-medium'}`}>
                  {item.label}
                </p>
                {item.critical && item.status !== 'done' && (
                  <span className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-0.5 shrink-0">
                    Critical
                  </span>
                )}
                {item.status === 'review' && (
                  <span className="text-[11px] font-medium text-espresso-600 bg-cream-200 border border-espresso-200 rounded-full px-2.5 py-0.5 shrink-0">
                    Needs review
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}
