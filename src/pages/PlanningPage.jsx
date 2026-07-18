import { Link } from 'react-router-dom'
import { ArrowRight, Upload, Plus, PenLine, FileText } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { PILLARS_BY_KEY } from '../lib/pillars'
import { currentUser } from '../lib/currentUser'

/* ── Mock data ── */
const continueTask = {
  pillar: 'legal',
  title: 'Sign your Power of Attorney',
  due: 'Jun 12',
  duration: '~30 min',
  progress: '4 of 6 essentials complete',
}

const pillarProgress = [
  { key: 'legal', done: 4, total: 6, pct: 62, summary: 'Will, Power of Attorney, Trusts', missing: '1 critical item missing' },
  { key: 'medical', done: 3, total: 8, pct: 38, summary: 'Directives, GP, Insurance, allergies', missing: '2 critical items missing' },
  { key: 'financial', done: 5, total: 7, pct: 71, summary: 'Bank, Investments, Insurance, Pension', missing: '1 review overdue' },
  { key: 'personal', done: 2, total: 9, pct: 22, summary: 'Letters, Funeral, Values, Digital legacy', needsAttention: true },
  { key: 'family', done: 4, total: 9, pct: 45, summary: 'Contacts, Family network, Roles', missing: 'Key contacts list incomplete' },
]

const quickActions = [
  { icon: Upload, label: 'Upload document' },
  { icon: Plus, label: 'Add a task' },
  { icon: PenLine, label: 'Write a reflection' },
  { icon: FileText, label: 'Add a contact' },
]

function PillarCard({ progress }) {
  const pillar = PILLARS_BY_KEY[progress.key]
  const Icon = pillar.icon
  const pct = progress.pct

  return (
    <div className="rounded-xl overflow-hidden border border-espresso-200 bg-white flex flex-col">
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
        <span className="text-white font-serif text-2xl shrink-0">{pct}%</span>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-[13px] text-espresso-700 mb-3">{progress.summary}</p>

        <div className="h-1.5 rounded-full bg-cream-200 overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-[width] duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${pct}%`, background: pillar.color }}
          />
        </div>

        {progress.needsAttention ? (
          <span className="inline-flex items-center text-xs font-medium text-red-700 bg-red-50 border border-red-100 rounded-full px-3 py-1 self-start mb-3">
            Needs attention
          </span>
        ) : (
          <p className="text-[12px] text-espresso-500 mb-3">
            Missing: <span className="font-medium text-espresso-700">{progress.missing}</span>
          </p>
        )}

        <Link
          to={`/dashboard/planning/${pillar.key}`}
          className="mt-auto inline-flex items-center gap-1 text-[12.5px] font-medium text-espresso-600 hover:text-espresso-800 transition-colors no-underline"
        >
          {progress.needsAttention ? 'Start guided flow' : 'Open pillar'} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}

/* ── Page ── */
export default function PlanningPage() {
  const remaining = 100 - currentUser.preparedness

  return (
    <AppLayout>
      <div className="max-w-300 mx-auto space-y-6 animate-fade-in">

        {/* ─ Continue + Overall preparedness row ─ */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          {/* Pick up where you left off */}
          <div className="relative overflow-hidden rounded-xl bg-espresso-950 p-8 flex flex-col justify-between min-h-55">
            <div
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gold-500/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <p className="text-[10px] font-bold tracking-[0.16em] text-mist-100 uppercase mb-3">
                Pick up where you left off
              </p>
              <h2 className="font-serif text-2xl sm:text-[28px] text-cream-50 leading-snug mb-2">
                {continueTask.title}
              </h2>
              <p className="text-[13px] text-mist-200">
                {PILLARS_BY_KEY[continueTask.pillar].label} pillar · Due {continueTask.due} · {continueTask.duration} · {continueTask.progress}
              </p>
            </div>
            <Button
              as={Link}
              to={`/dashboard/planning/${continueTask.pillar}`}
              variant="light"
              className="relative z-10 self-start flex items-center gap-1.5 text-[13px] font-medium px-5 py-2.5 rounded-full no-underline mt-6"
            >
              Continue
              <ArrowRight size={14} strokeWidth={2} />
            </Button>
          </div>

          {/* Overall preparedness */}
          <Card className="p-6 flex flex-col justify-center">
            <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase mb-2">Overall Preparedness</p>
            <p className="text-[13px] text-espresso-500 mb-5">Across all pillars</p>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="font-serif text-5xl font-semibold text-espresso-900">{currentUser.preparedness}</span>
              <span className="font-serif text-2xl text-espresso-900">%</span>
            </div>
            <div className="h-1.5 rounded-full bg-cream-300 overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-linear-to-r from-espresso-500 to-gold-500"
                style={{ width: `${currentUser.preparedness}%` }}
              />
            </div>
            <p className="text-[11.5px] text-espresso-500">{remaining}% remaining</p>
          </Card>
        </section>

        {/* ─ Pillar cards + Quick actions ─ */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillarProgress.map((progress) => (
            <PillarCard key={progress.key} progress={progress} />
          ))}

          {/* Quick actions */}
          <div className="rounded-xl border-2 border-dashed border-espresso-250 bg-cream-50 p-6 flex flex-col">
            <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase mb-2">Quick Actions</p>
            <h3 className="font-serif text-xl text-espresso-900 mb-5">Add to any pillar</h3>
            <div className="flex flex-col gap-1">
              {quickActions.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 py-2 text-[13.5px] text-espresso-700">
                  <span className="w-8 h-8 rounded-full bg-white border border-espresso-200 flex items-center justify-center shrink-0">
                    <Icon size={14} strokeWidth={1.8} />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
