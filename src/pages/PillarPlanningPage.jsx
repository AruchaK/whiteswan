import { useMemo, useState } from 'react'
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
  ChevronDown,
} from 'lucide-react'
import AppLayout from '../components/AppLayout'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import NewTaskDialog from '../components/NewTaskDialog'
import { PILLARS, PILLARS_BY_KEY } from '../lib/pillars'
import { PILLAR_DATA } from '../lib/pillarData'

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
  MED: 'text-espresso-600 bg-cream-200 border-espresso-200',
  LOW: 'text-espresso-500 bg-cream-150 border-espresso-200',
}

/* ── Top pillar switcher ── */
function PillarTabs({ activeKey }) {
  return (
    <nav className="flex items-center gap-2 flex-wrap">
      <Link
        to="/dashboard/planning"
        className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-espresso-500 hover:text-espresso-700 transition-colors no-underline pr-1"
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
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium no-underline transition-colors ${
              active
                ? 'bg-espresso-900 text-cream-50'
                : 'bg-white border border-espresso-200 text-espresso-600 hover:bg-cream-100'
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
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
      {/* Banner */}
      <div
        className="relative rounded-2xl overflow-hidden p-7 sm:p-8 min-h-52 flex flex-col justify-between"
        style={{ background: bannerGradient(pillar.banner) }}
      >
        <div>
          <p className="text-white/60 text-[10px] font-bold tracking-[0.18em] uppercase mb-2">Pillar</p>
          <h1 className="font-serif text-3xl sm:text-4xl text-white leading-tight">{pillar.label} Pillar</h1>
          <p className="text-white/75 text-[13px] mt-2">{data.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {data.badges.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/15 px-3 py-1.5 text-[11.5px] font-medium text-white/90"
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
        <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase">Readiness</p>
        <p className="text-[13px] text-espresso-500 mt-1 mb-5 capitalize">{pillar.label} pillar</p>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="font-serif text-5xl font-semibold" style={{ color: pillar.color }}>
            {data.readiness}
          </span>
          <span className="font-serif text-xl" style={{ color: pillar.color }}>%</span>
        </div>

        <div className="h-1.5 rounded-full bg-cream-300 overflow-hidden mb-2">
          <div
            className="h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${data.readiness}%`, background: pillar.color }}
          />
        </div>
        <p className="text-[11.5px] text-espresso-500 mb-5">{data.essentials}</p>

        <Button
          variant="primary"
          className="self-start inline-flex items-center gap-1.5 text-[12.5px] font-medium px-4 py-2.5 rounded-full mt-auto"
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
                : 'bg-white border-espresso-200 text-espresso-700 hover:bg-cream-100'
            }`}
            style={isActive ? { background: pillar.banner } : undefined}
          >
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                isActive ? 'bg-white/15' : 'bg-cream-150 border border-espresso-200'
              }`}
            >
              <Icon size={15} strokeWidth={1.9} className={isActive ? 'text-white' : 'text-espresso-500'} />
            </span>
            <span className="font-serif text-lg flex-1">{label}</span>
            {isActive ? (
              <ChevronDown size={16} strokeWidth={2} className="text-white/80" />
            ) : (
              <ArrowRight size={15} strokeWidth={2} className="text-espresso-400" />
            )}
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
        <p className={`text-[13.5px] font-medium ${done ? 'text-espresso-400 line-through' : 'text-espresso-900'}`}>
          {task.title}
        </p>
        <div className="flex items-center flex-wrap gap-2 mt-1">
          <span className="text-[11.5px] text-espresso-400">
            Due {task.due} · {task.duration}
          </span>
          {task.vault && (
            <span className="inline-flex items-center gap-1 text-[11px] text-espresso-500 bg-cream-200 border border-espresso-200 rounded-md px-1.5 py-0.5">
              <FileText size={11} strokeWidth={1.8} />
              Upload to Vault
            </span>
          )}
        </div>
      </div>
      <span
        className={`text-[10.5px] font-semibold tracking-wide rounded-full border px-2.5 py-0.5 shrink-0 ${PRIORITY_STYLES[task.priority]}`}
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
        <div>
          <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase mb-1">Your checklist</p>
          <h2 className="font-serif text-xl text-espresso-900">{data.checklistTitle}</h2>
        </div>
        <Button
          variant="outline"
          onClick={onAddTask}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium px-3.5 py-2 rounded-full shrink-0"
        >
          <Plus size={13} strokeWidth={2} />
          Add task
        </Button>
      </div>

      <div className="divide-y divide-black/6 border-t border-black/6">
        {active.length === 0 ? (
          <p className="px-6 py-8 text-[13px] text-espresso-400 italic">All action items are complete. Nicely done.</p>
        ) : (
          active.map((task) => (
            <TaskRow key={task.id} task={task} done={false} onToggle={() => onToggle(task.id)} />
          ))
        )}
      </div>

      {/* Completed */}
      <div className="px-6 py-3 bg-cream-100 border-t border-black/6">
        <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase">
          Completed ({doneCount})
        </p>
      </div>
      <div className="divide-y divide-black/6 border-t border-black/6">
        {data.completed.map((item) => (
          <div key={item.id} className="flex items-center gap-3.5 py-4 px-6">
            <span className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center shrink-0">
              <Check size={12} className="text-white" strokeWidth={2.5} />
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px] font-medium text-espresso-500 line-through truncate">{item.title}</p>
              <p className="text-[11.5px] text-espresso-400 mt-0.5">{item.when}</p>
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
    <div className="rounded-xl border border-espresso-200 bg-white overflow-hidden flex flex-col">
      <div className="p-4 flex items-center gap-3">
        <span
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] font-semibold"
          style={{ background: pillar.banner }}
        >
          {initials(contact.name)}
        </span>
        <div className="min-w-0">
          <p className="text-[13.5px] font-semibold text-espresso-900 truncate">{contact.name}</p>
          <p className="text-[12px] font-medium truncate" style={{ color: pillar.color }}>
            {contact.role}
          </p>
          {contact.org && <p className="text-[12px] text-espresso-400 truncate">{contact.org}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-espresso-200 divide-x divide-espresso-200 mt-auto">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-medium text-espresso-600 hover:bg-cream-100 transition-colors cursor-pointer"
        >
          <Phone size={12} strokeWidth={1.8} />
          Call
        </button>
        {contact.email ? (
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-medium text-espresso-600 hover:bg-cream-100 transition-colors cursor-pointer"
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
      <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase mb-1">Contacts</p>
      <h2 className="font-serif text-xl text-espresso-900 mb-5">{data.contactsTitle}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} pillar={pillar} />
        ))}
        <button
          type="button"
          className="rounded-xl border-2 border-dashed border-espresso-250 bg-cream-50 min-h-30 flex flex-col items-center justify-center gap-2 text-espresso-500 hover:bg-cream-100 transition-colors cursor-pointer"
        >
          <span className="w-9 h-9 rounded-full border border-espresso-300 flex items-center justify-center">
            <Plus size={16} strokeWidth={1.8} />
          </span>
          <span className="text-[12.5px] font-medium">Add contact</span>
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
        highlight ? 'border-espresso-300 bg-cream-50' : 'border-espresso-200 bg-white hover:bg-cream-50'
      }`}
    >
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={highlight ? { background: pillar.banner } : { background: 'var(--color-cream-200)' }}
      >
        {highlight ? (
          <ShieldCheck size={14} className="text-white" strokeWidth={1.8} />
        ) : (
          <PenLine size={13} className="text-espresso-500" strokeWidth={1.8} />
        )}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-serif text-lg text-espresso-900 leading-tight">{note.title}</p>
        <p className="text-[12.5px] text-espresso-500 mt-1.5 leading-relaxed">{note.body}</p>
        <p className="text-[11px] text-espresso-400 mt-2">{note.updated}</p>
      </div>
      <ArrowRight
        size={15}
        strokeWidth={2}
        className="text-espresso-300 group-hover:text-espresso-500 transition-colors shrink-0 mt-1"
      />
    </button>
  )
}

function NotesPanel({ data, pillar }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase mb-1">Notes &amp; Will</p>
          <h2 className="font-serif text-xl text-espresso-900">{data.notesTitle}</h2>
        </div>
        <Button
          variant="outline"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium px-3.5 py-2 rounded-full shrink-0"
        >
          <PenLine size={13} strokeWidth={1.9} />
          New note
        </Button>
      </div>

      <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase mb-3 flex items-center gap-2">
        <span className="w-4 h-0.5 rounded-full bg-espresso-800 inline-block" />
        Will &amp; Directives
      </p>
      <div className="space-y-3 mb-6">
        {data.notes.will.map((note) => (
          <NoteRow key={note.id} note={note} highlight pillar={pillar} />
        ))}
      </div>

      <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase mb-3 flex items-center gap-2">
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

  const [section, setSection] = useState('tasks')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [addedTasks, setAddedTasks] = useState([])
  const [completedIds, setCompletedIds] = useState(() => new Set())

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
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-espresso-500 hover:text-espresso-700 transition-colors no-underline"
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

  const toggleTask = (id) =>
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const handleAddTask = (task) => {
    // Only surface the new task on the pillar it was filed under.
    if (task.pillar === pillarKey) {
      setAddedTasks((prev) => [task, ...prev])
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
    </AppLayout>
  )
}
