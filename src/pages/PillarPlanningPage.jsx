import { useCallback, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Plus,
  PenLine,
  FileText,
  Phone,
  Mail,
} from 'lucide-react'
import AppLayout from '../components/AppLayout'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import Toast from '../components/ui/Toast'
import NewTaskDialog from '../components/NewTaskDialog'
import { PILLARS, PILLARS_BY_KEY } from '../lib/pillars'
import { PILLAR_DATA } from '../lib/pillarData'
import { PILLAR_READINESS, essentialsLabel } from '../lib/readiness'
import { addTask, useAddedTasks } from '../lib/addedTasksStore'

/* Pillars that surface an attention dot in the top pill bar. */
const ATTENTION_KEYS = new Set(['personal'])

/* Turn a solid banner color into a soft diagonal gradient for the hero. */
function bannerGradient(color) {
  return `linear-gradient(135deg, ${color} 0%, ${color} 45%, rgba(255,255,255,0.14) 130%)`
}

function initials(name) {
  return name
    .replace(/^(Khun|Dr\.|Phra|Ajahn)\s+/i, '')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
}

const PRIORITY_STYLES = {
  HIGH: 'text-red-700 bg-red-50 border-red-100',
  MED: 'text-espresso-600 bg-cream-200 border-espresso-250',
  LOW: 'text-espresso-600 bg-cream-150 border-espresso-250',
}

/* ── Top pillar switcher ── */
function PillarTabs({ activeKey }) {
  return (
    <nav className="flex items-center gap-2 flex-wrap">
      <Link
        to="/dashboard/planning"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-espresso-600 hover:text-espresso-700 transition-colors no-underline pr-1"
      >
        <ArrowLeft size={14} strokeWidth={2} />
        Planning
      </Link>
      <span className="text-espresso-300 select-none" aria-hidden>·</span>
      {PILLARS.map((p) => {
        const active = p.key === activeKey
        return (
          <Link
            key={p.key}
            to={`/dashboard/planning/${p.key}`}
            aria-current={active ? 'page' : undefined}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium no-underline transition-colors ${
              active
                ? 'bg-espresso-900 text-cream-50'
                : 'bg-white border border-espresso-250 text-espresso-600 hover:bg-cream-100'
            }`}
          >
            {p.label}
            {ATTENTION_KEYS.has(p.key) && !active && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-label="Needs attention" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

/* ── Hero: banner + readiness ── */
function BadgeIcon({ type }) {
  if (type === 'secure') return <ShieldCheck size={12} strokeWidth={1.8} />
  if (type === 'recency') return <Clock size={12} strokeWidth={1.8} />
  return <AlertTriangle size={12} strokeWidth={1.8} />
}

function Hero({ pillar, data }) {
  const Icon = pillar.icon
  const readiness = PILLAR_READINESS[pillar.key].readiness
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
      {/* Banner */}
      <div
        className="relative rounded-2xl overflow-hidden p-7 sm:p-8 min-h-52 flex flex-col justify-between"
        style={{ background: bannerGradient(pillar.banner) }}
      >
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-white leading-tight">{pillar.label} Pillar</h1>
          <p className="text-white/75 text-[13px] mt-2">{data.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {data.badges.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/15 px-3 py-1.5 text-[12px] font-medium text-white/90"
            >
              <BadgeIcon type={badge.type} />
              {badge.label}
            </span>
          ))}
        </div>
        <div
          className="absolute top-6 right-7 w-11 h-11 rounded-full bg-white/12 hidden sm:flex items-center justify-center"
          aria-hidden
        >
          <Icon size={20} className="text-white" strokeWidth={1.7} />
        </div>
      </div>

      {/* Readiness */}
      <Card className="p-6 flex flex-col">
        <p className="text-[11px] font-bold tracking-[0.16em] text-espresso-600 uppercase mb-5">Readiness</p>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="font-serif text-5xl font-semibold" style={{ color: pillar.color }}>
            {readiness}
          </span>
          <span className="font-serif text-xl" style={{ color: pillar.color }}>%</span>
        </div>

        <ProgressBar value={readiness} color={pillar.color} className="mb-2" />
        <p className="text-[12px] text-espresso-600 mb-5">{essentialsLabel(pillar.key)}</p>

        <Button
          variant="primary"
          className="self-start inline-flex items-center gap-1.5 text-[13px] font-medium px-4 py-2.5 rounded-full mt-auto"
        >
          {data.cta}
          <ArrowRight size={14} strokeWidth={2} />
        </Button>
      </Card>
    </section>
  )
}

/* ── Section switcher tabs ── */
function SectionTabs({ active, onChange, pillar }) {
  const tabs = [
    { key: 'tasks', label: 'Tasks', icon: Check },
    { key: 'contacts', label: 'Contacts', icon: Plus },
    { key: 'notes', label: 'Notes & Will', icon: PenLine },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {tabs.map(({ key, label, icon: Icon }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            className={`flex items-center gap-3 rounded-xl px-5 py-4 text-left transition-colors cursor-pointer border ${
              isActive
                ? 'text-white border-transparent'
                : 'bg-white border-espresso-250 text-espresso-700 hover:bg-cream-100'
            }`}
            style={isActive ? { background: pillar.banner } : undefined}
          >
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                isActive ? 'bg-white/15' : 'bg-cream-150 border border-espresso-250'
              }`}
            >
              <Icon size={15} strokeWidth={1.9} className={isActive ? 'text-white' : 'text-espresso-600'} />
            </span>
            <span className="font-serif text-lg flex-1">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ── Tasks panel ── */
function TaskRow({ task, done, onToggle }) {
  return (
    <div className="flex items-center gap-3.5 py-4 px-5">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={done}
        aria-label={done ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`}
        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
          done ? 'bg-green-600 border-green-600' : 'border-espresso-300 hover:border-espresso-500'
        }`}
      >
        {done && <Check size={12} className="text-white" strokeWidth={2.5} />}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-[14px] font-medium ${done ? 'text-espresso-600 line-through' : 'text-espresso-900'}`}>
          {task.title}
        </p>
        <div className="flex items-center flex-wrap gap-2 mt-1">
          <span className="text-[12px] text-espresso-600">
            Due {task.due} · {task.duration}
          </span>
          {task.vault && (
            <span className="inline-flex items-center gap-1 text-[11px] text-espresso-600 bg-cream-200 border border-espresso-250 rounded-md px-1.5 py-0.5">
              <FileText size={11} strokeWidth={1.8} />
              Upload to Vault
            </span>
          )}
        </div>
      </div>
      <span
        className={`text-[11px] font-semibold tracking-wide rounded-full border px-2.5 py-0.5 shrink-0 ${PRIORITY_STYLES[task.priority]}`}
      >
        {task.priority}
      </span>
    </div>
  )
}

function TasksPanel({ data, tasks, completedIds, onToggle, onAddTask }) {
  const active = tasks.filter((t) => !completedIds.has(t.id))
  const doneCount = data.completed.length

  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4">
        <h2 className="font-serif text-xl text-espresso-900">{data.checklistTitle}</h2>
        <Button
          variant="outline"
          onClick={onAddTask}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-full shrink-0"
        >
          <Plus size={13} strokeWidth={2} />
          Add task
        </Button>
      </div>

      <div className="divide-y divide-espresso-250 border-t border-espresso-250">
        {active.length === 0 ? (
          <p className="px-6 py-8 text-[13px] text-espresso-600 italic">All action items are complete. Nicely done.</p>
        ) : (
          active.map((task) => (
            <TaskRow key={task.id} task={task} done={false} onToggle={() => onToggle(task.id)} />
          ))
        )}
      </div>

      {/* Completed */}
      <div className="px-6 py-3 bg-cream-100 border-t border-espresso-250">
        <p className="text-[11px] font-bold tracking-[0.16em] text-espresso-600 uppercase">
          Completed ({doneCount})
        </p>
      </div>
      <div className="divide-y divide-espresso-250 border-t border-espresso-250">
        {data.completed.map((item) => (
          <div key={item.id} className="flex items-center gap-3.5 py-4 px-6">
            <span className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center shrink-0">
              <Check size={12} className="text-white" strokeWidth={2.5} />
            </span>
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-espresso-600 line-through truncate">{item.title}</p>
              <p className="text-[12px] text-espresso-600 mt-0.5">{item.when}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ── Contacts panel ── */
function ContactCard({ contact, pillar }) {
  return (
    <div className="rounded-xl border border-espresso-250 bg-white overflow-hidden flex flex-col">
      <div className="p-4 flex items-center gap-3">
        <span
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] font-semibold"
          style={{ background: pillar.banner }}
        >
          {initials(contact.name)}
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-espresso-900 truncate">{contact.name}</p>
          <p className="text-[12px] font-medium text-espresso-700 truncate">{contact.role}</p>
          {contact.org && <p className="text-[12px] text-espresso-600 truncate">{contact.org}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-espresso-250 divide-x divide-espresso-250 mt-auto">
        <button
          type="button"
          disabled
          title="Available once contact details are saved"
          className="flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-medium text-espresso-400 cursor-not-allowed"
        >
          <Phone size={12} strokeWidth={1.8} />
          Call
        </button>
        {contact.email ? (
          <button
            type="button"
            disabled
            title="Available once contact details are saved"
            className="flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-medium text-espresso-400 cursor-not-allowed"
          >
            <Mail size={12} strokeWidth={1.8} />
            Email
          </button>
        ) : (
          <span className="flex items-center justify-center py-2.5 text-[12px] text-espresso-300 select-none">—</span>
        )}
      </div>
    </div>
  )
}

function ContactsPanel({ data, pillar }) {
  return (
    <Card className="p-6">
      <h2 className="font-serif text-xl text-espresso-900 mb-5">{data.contactsTitle}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} pillar={pillar} />
        ))}
        <button
          type="button"
          disabled
          title="Adding contacts is coming soon"
          className="rounded-xl border-2 border-dashed border-espresso-250 bg-cream-50 min-h-30 flex flex-col items-center justify-center gap-2 text-espresso-400 cursor-not-allowed opacity-70"
        >
          <span className="w-9 h-9 rounded-full border border-espresso-300 flex items-center justify-center">
            <Plus size={16} strokeWidth={1.8} />
          </span>
          <span className="text-[13px] font-medium">Add contact</span>
        </button>
      </div>
    </Card>
  )
}

/* ── Notes panel ── */
function NoteRow({ note, highlight, pillar }) {
  return (
    <button
      type="button"
      className={`w-full text-left rounded-xl border p-4 flex items-start gap-3.5 transition-colors cursor-pointer group ${
        highlight ? 'border-espresso-300 bg-cream-50' : 'border-espresso-250 bg-white hover:bg-cream-50'
      }`}
    >
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={highlight ? { background: pillar.banner } : { background: 'var(--color-cream-200)' }}
      >
        {highlight ? (
          <ShieldCheck size={14} className="text-white" strokeWidth={1.8} />
        ) : (
          <PenLine size={13} className="text-espresso-600" strokeWidth={1.8} />
        )}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-serif text-lg text-espresso-900 leading-tight">{note.title}</p>
        <p className="text-[13px] text-espresso-600 mt-1.5 leading-relaxed">{note.body}</p>
        <p className="text-[11px] text-espresso-600 mt-2">{note.updated}</p>
      </div>
      <ArrowRight
        size={15}
        strokeWidth={2}
        className="text-espresso-300 group-hover:text-espresso-600 transition-colors shrink-0 mt-1"
      />
    </button>
  )
}

function NotesPanel({ data, pillar }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3 mb-5">
        <h2 className="font-serif text-xl text-espresso-900">{data.notesTitle}</h2>
        <Button
          variant="outline"
          disabled
          title="Creating notes is coming soon"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-full shrink-0"
        >
          <PenLine size={13} strokeWidth={1.9} />
          New note
        </Button>
      </div>

      <p className="text-[11px] font-bold tracking-[0.16em] text-espresso-600 uppercase mb-3 flex items-center gap-2">
        <span className="w-4 h-0.5 rounded-full bg-espresso-800 inline-block" />
        Will &amp; Directives
      </p>
      <div className="space-y-3 mb-6">
        {data.notes.will.map((note) => (
          <NoteRow key={note.id} note={note} highlight pillar={pillar} />
        ))}
      </div>

      <p className="text-[11px] font-bold tracking-[0.16em] text-espresso-600 uppercase mb-3 flex items-center gap-2">
        <span className="w-4 h-0.5 rounded-full inline-block" style={{ background: pillar.color }} />
        Personal Notes
      </p>
      <div className="space-y-3">
        {data.notes.personal.map((note) => (
          <NoteRow key={note.id} note={note} pillar={pillar} />
        ))}
      </div>
    </Card>
  )
}

/* ── Page ── */
export default function PillarPlanningPage() {
  const { pillar: pillarKey } = useParams()
  const pillar = PILLARS_BY_KEY[pillarKey]
  const data = PILLAR_DATA[pillarKey]

  const addedTasks = useAddedTasks(pillarKey)

  const [section, setSection] = useState('tasks')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [completedIds, setCompletedIds] = useState(() => new Set())
  const [toast, setToast] = useState(null)
  const dismissToast = useCallback(() => setToast(null), [])

  const tasks = useMemo(
    () => (data ? [...addedTasks, ...data.tasks] : []),
    [data, addedTasks],
  )

  if (!pillar || !data) {
    return (
      <AppLayout>
        <div className="max-w-300 mx-auto space-y-6 animate-fade-in">
          <Link
            to="/dashboard/planning"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-espresso-600 hover:text-espresso-700 transition-colors no-underline"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to planning
          </Link>
          <Card className="p-8">
            <p className="text-[13px] text-espresso-600 italic">
              We couldn&rsquo;t find a pillar called &ldquo;{pillarKey}&rdquo;.
            </p>
          </Card>
        </div>
      </AppLayout>
    )
  }

  const toggleTask = (id) =>
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const handleAddTask = (task) => {
    addTask(task)
    if (task.pillar === pillarKey) {
      // Lands on the checklist in view — confirm it in place.
      setToast({ message: 'Task added to your checklist' })
    } else {
      // Filed under another pillar — confirm where it went and offer a jump,
      // instead of silently dropping it or yanking the user away.
      const target = PILLARS_BY_KEY[task.pillar]
      setToast({
        message: `Task added to ${target.label} planning`,
        action: { label: 'View', to: `/dashboard/planning/${task.pillar}` },
      })
    }
  }

  return (
    <AppLayout>
      <div className="max-w-300 mx-auto space-y-6 animate-fade-in">
        <PillarTabs activeKey={pillarKey} />
        <Hero pillar={pillar} data={data} />
        <SectionTabs active={section} onChange={setSection} pillar={pillar} />

        {section === 'tasks' && (
          <TasksPanel
            data={data}
            tasks={tasks}
            completedIds={completedIds}
            onToggle={toggleTask}
            onAddTask={() => setDialogOpen(true)}
          />
        )}
        {section === 'contacts' && <ContactsPanel data={data} pillar={pillar} />}
        {section === 'notes' && <NotesPanel data={data} pillar={pillar} />}
      </div>

      {dialogOpen && (
        <NewTaskDialog
          onClose={() => setDialogOpen(false)}
          onSave={handleAddTask}
          defaultPillar={pillarKey}
        />
      )}

      {toast && <Toast message={toast.message} action={toast.action} onDismiss={dismissToast} />}
    </AppLayout>
  )
}
