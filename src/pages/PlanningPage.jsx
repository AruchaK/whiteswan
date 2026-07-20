import { Link } from 'react-router-dom'
import { ArrowRight, Upload, Plus, PenLine, FileText } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import PillarCard from '../components/ui/PillarCard'
import FeaturePanel from '../components/ui/FeaturePanel'
import ProgressBar from '../components/ui/ProgressBar'
import { PILLARS_BY_KEY } from '../lib/pillars'
import { READINESS_LIST, overallPreparedness, essentialsLabel } from '../lib/readiness'

/* ── Mock data ── */
const continueTask = {
  pillar: 'legal',
  title: 'Sign your Power of Attorney',
  due: 'Jun 12',
  duration: '~30 min',
}

const quickActions = [
  { icon: Upload, label: 'Upload document' },
  { icon: Plus, label: 'Add a task' },
  { icon: PenLine, label: 'Write a reflection' },
  { icon: FileText, label: 'Add a contact' },
]

/* ── Page ── */
export default function PlanningPage() {
  const remaining = 100 - overallPreparedness

  return (
    <AppLayout>
      <div className="max-w-300 mx-auto space-y-6 animate-fade-in">

        {/* ─ Continue + Overall preparedness row ─ */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          {/* Pick up where you left off */}
          <FeaturePanel>
            <div className="relative z-10">
              <p className="text-[10px] font-bold tracking-[0.16em] text-mist-100 uppercase mb-3">
                Pick up where you left off
              </p>
              <h2 className="font-serif text-2xl sm:text-[28px] text-cream-50 leading-snug mb-2">
                {continueTask.title}
              </h2>
              <p className="text-[13px] text-mist-200">
                {PILLARS_BY_KEY[continueTask.pillar].label} pillar · Due {continueTask.due} · {continueTask.duration} · {essentialsLabel(continueTask.pillar)}
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
          </FeaturePanel>

          {/* Overall preparedness */}
          <Card className="p-6 flex flex-col justify-center">
            <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-600 uppercase mb-2">Overall Preparedness</p>
            <p className="text-[13px] text-espresso-600 mb-5">Across all pillars</p>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="font-serif text-5xl font-semibold text-espresso-900">{overallPreparedness}</span>
              <span className="font-serif text-2xl text-espresso-900">%</span>
            </div>
            <ProgressBar
              value={overallPreparedness}
              fillClassName="bg-linear-to-r from-espresso-500 to-gold-500"
              className="mb-2"
            />
            <p className="text-[11.5px] text-espresso-600">{remaining}% remaining</p>
          </Card>
        </section>

        {/* ─ Pillar cards + Quick actions ─ */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {READINESS_LIST.map((progress) => (
            <PillarCard key={progress.key} progress={progress} />
          ))}

          {/* Quick actions */}
          <div className="rounded-xl border-2 border-dashed border-espresso-250 bg-cream-50 p-6 flex flex-col">
            <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-600 uppercase mb-2">Quick Actions</p>
            <h3 className="font-serif text-xl text-espresso-900 mb-5">Add to any pillar</h3>
            <div className="flex flex-col gap-1">
              {quickActions.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 py-2 text-[13.5px] text-espresso-700">
                  <span className="w-8 h-8 rounded-full bg-white border border-espresso-250 flex items-center justify-center shrink-0">
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
