import { TriangleAlert, Pencil, Clock, ChevronRight, AlertTriangle } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import './DashboardPage.css'

/* ── Mock data ── */
const user = {
  firstName: 'Somchai',
  fullName: 'Somchai Jaidee',
  avatar: '/avatar-somchai.png',
  lastUpdated: '2 hours ago',
  preparedness: 44,
  born: 'March 14, 1986 · Bangkok',
  age: '39 years',
  spouse: 'Pim Siriwong',
  residence: 'Bangkok, Thailand',
  children: 'Nara, Ploy',
  bloodType: 'A+',
}

const pillars = [
  { key: 'legal', label: 'Legal', pct: 62, done: 4, total: 6, color: '#7A5E3F' },
  { key: 'medical', label: 'Medical', pct: 38, done: 3, total: 8, color: '#C67A5C' },
  { key: 'financial', label: 'Financial', pct: 71, done: 5, total: 7, color: '#5E8C6A' },
  { key: 'personal', label: 'Personal', pct: 22, done: 2, total: 9, color: '#B8944F' },
  { key: 'family', label: 'Family', pct: 22, done: 5, total: 9, color: '#e73d5b' },
]

const todayTasks = [
  { title: 'Sign your Power of Attorney', category: 'Legal', time: '~30 min', tag: 'Priority', tagColor: 'bg-red-50 text-red-700 border-red-200' },
  { title: 'Write a letter to Nara', category: 'Personal', time: '~30 min', tag: 'Reflection', tagColor: 'bg-espresso-50 text-espresso-700 border-espresso-200' },
  { title: 'Invite Pim as spouse Trustee', category: 'Family', time: '~2 min', tag: 'Quick', tagColor: 'bg-espresso-50 text-espresso-600 border-espresso-200' },
]

const vaultItems = [
  { label: 'Vault encrypted · AES-256', ok: true },
  { label: 'Last sync 2 hours ago', ok: true },
  { label: '3 family members added', ok: true },
  { label: '3 critical items missing', ok: false },
]

const quote = {
  text: 'What we carry quietly is often the most precious thing we leave behind.',
  attribution: 'A note from your last reflection',
}

/* ── Pentagon chart helpers ── */
function polarToCart(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function pentagonPoints(cx, cy, r) {
  return Array.from({ length: 5 }, (_, i) => {
    const { x, y } = polarToCart(cx, cy, r, i * 72)
    return `${x},${y}`
  }).join(' ')
}

const radarDimensions = [
  { label: 'Legal', pct: 62, posClass: 'top' },
  { label: 'Medical', pct: 38, posClass: 'top-right' },
  { label: 'Family', pct: 45, posClass: 'bot-right' },
  { label: 'Financial', pct: 71, posClass: 'bot-left' },
  { label: 'Personal', pct: 22, posClass: 'top-left' },
]

function PentagonChart() {
  const cx = 110, cy = 110, maxR = 80
  const dataPoints = radarDimensions.map((d, i) => {
    const r = (d.pct / 100) * maxR
    return polarToCart(cx, cy, r, i * 72)
  })
  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div className="pentagon-chart mx-auto">
      <svg viewBox="0 0 220 220" className="w-full h-full">
        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map(scale => (
          <polygon
            key={scale}
            points={pentagonPoints(cx, cy, maxR * scale)}
            fill="none"
            stroke="#E8D9C8"
            strokeWidth={scale === 1 ? 1.2 : 0.6}
            opacity={0.7}
          />
        ))}
        {/* Axis lines */}
        {Array.from({ length: 5 }, (_, i) => {
          const p = polarToCart(cx, cy, maxR, i * 72)
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={p.x} y2={p.y}
              stroke="#E8D9C8"
              strokeWidth={0.6}
              opacity={0.7}
            />
          )
        })}
        {/* Data polygon */}
        <polygon
          points={dataPolygon}
          fill="rgba(184,148,79,0.12)"
          stroke="#B8944F"
          strokeWidth={1.8}
          strokeLinejoin="round"
        />
        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#B8944F" />
        ))}
      </svg>

      {/* Labels */}
      {radarDimensions.map(d => (
        <div key={d.label} className={`pentagon-label ${d.posClass}`}>
          {d.label}
          <span className="pct">{d.pct}%</span>
        </div>
      ))}
    </div>
  )
}

/* ── Greeting helpers ── */
function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatDate() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).toUpperCase()
}

/* ── Page ── */
export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-in">

        {/* ─ Greeting ─ */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-[12px] font-bold tracking-[0.16em] text-[#6b6259] uppercase mb-1">
              {formatDate()}
            </p>
            <h1 className="text-[28px] sm:text-[42px] font-serif font-semibold text-espresso-900 leading-tight">
              {getGreeting()}, {user.firstName}.
            </h1>
          </div>

          <button className="attention-badge flex items-center gap-2 bg-[#f5e4ce] border border-espresso-200 text-espresso-700 text-[13px] font-medium px-4 py-2 rounded-xl cursor-pointer hover:bg-espresso-50 transition-colors self-end">
            <TriangleAlert size={14} strokeWidth={1.8} className="text-gold-500" />
            3 items need attention
          </button>
        </section>

        <section>
          <div className="bg-white rounded-xl border border-[#e2d5c3] shadow-[0_1px_3px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-[1fr_340px] overflow-hidden">
            {/* Profile section */}
            <div className="p-5 sm:p-6 xl:p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-18 h-18 rounded-full object-cover ring-4 ring-espresso-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-3xl font-semibold font-serif text-espresso-900 leading-tight">{user.fullName}</h2>
                    <button className="flex items-center gap-1 text-[11.5px] text-espresso-500 bg-espresso-50 border border-espresso-200 rounded-full px-2.5 py-[2px] hover:bg-espresso-100 transition-colors cursor-pointer">
                      <Pencil size={10} strokeWidth={2} />
                      Edit profile
                    </button>
                  </div>
                  <p className="text-[12px] text-espresso-400 mt-0.5">
                    Your life, organised with care · Last updated {user.lastUpdated}
                  </p>
                </div>
              </div>

              {/* Preparedness bar */}
              <div className="flex flex-col max-w-[60%] gap-3 mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-espresso-600 shrink-0">Overall preparedness</span>
                  <span className="text-[14px] font-semibold text-espresso-800 tabular-nums">{user.preparedness}%</span>
                </div>
                <div className="preparedness-bar w-full">
                  <div className="preparedness-bar-fill" style={{ width: `${user.preparedness}%` }} />
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 pt-4 border-t border-black/[0.06]">
                {[
                  ['BORN', user.born],
                  ['AGE', user.age],
                  ['SPOUSE', user.spouse],
                  ['RESIDENCE', user.residence],
                  ['CHILDREN', user.children],
                  ['BLOOD TYPE', user.bloodType],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-espresso-400 uppercase mb-1">{label}</p>
                    <p className="text-[13.5px] font-medium text-espresso-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote section — cream tinted, with left border */}
            <div className="bg-[#faf7f2] border-t lg:border-t-0 lg:border-l border-black/[0.06] p-6 xl:p-8 flex flex-col justify-center">
              <span className="quote-mark select-none">&ldquo;</span>
              <blockquote className="font-serif text-[17px] sm:text-[18px] italic text-espresso-700 leading-relaxed -mt-4 mb-4">
                {quote.text}
              </blockquote>
              <p className="text-[11px] tracking-[0.06em] text-espresso-400 italic">
                {quote.attribution}
              </p>
            </div>
          </div>
        </section>

        {/* ─ Pentagon + Pillar row ─ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Pentagon */}
          <div className="bg-white rounded-xl border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border-[#e2d5c3]">
            <h3 className="text-[15px] font-semibold text-espresso-900 mb-0.5">Pentagon view</h3>
            <p className="text-[12px] text-[#6b6259] mb-6">Five dimensions of readiness</p>
            <PentagonChart />
          </div>

          {/* By pillar */}
          <div className="bg-white rounded-xl border border-[#e2d5c3] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <h3 className="text-[15px] font-semibold text-espresso-900 mb-0.5">By pillar</h3>
            <p className="text-[12px] text-[#6b6259] mb-5">Progress across all five</p>

            <div className="space-y-10">
              {pillars.map(p => (
                <div key={p.key} className="flex items-center gap-3">
                  <div className={`pillar-icon ${p.key}`}>
                    {p.label[0]}
                  </div>

                  <div className='w-full'>
                    <div className='flex flex-row justify-between w-full'>
                      <span className="text-[13.5px] font-medium text-espresso-800 w-[72px] shrink-0">{p.label}</span>
                      <div className='space-x-4'>
                        <span className="text-[12px] text-espresso-500 tabular-nums w-[32px] text-right">{p.pct}%</span>
                        <span className="text-[12px] text-espresso-400 tabular-nums w-[28px] text-right">{p.done}/{p.total}</span>
                      </div>
                    </div>
                    <div className="pillar-bar">
                      <div
                        className={`pillar-bar-fill ${p.key}`}
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─ Today's focus + Vault status row ─ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Today's focus */}
          <div className="bg-white rounded-xl border border-[#e2d5c3] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="text-[15px] font-semibold text-espresso-900 mb-0.5">Today's focus</h3>
                <p className="text-[12px] text-espresso-400">3 tasks · take what you can</p>
              </div>
              <span className="flex items-center gap-1.5 text-[12px] text-espresso-500 border border-espresso-200 rounded-full px-3 py-1">
                <Clock size={13} strokeWidth={1.8} />
                ~1 hr
              </span>
            </div>

            <div className="mt-5 space-y-0 divide-y divide-black/[0.06]">
              {todayTasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3 py-3.5 first:pt-0 group cursor-pointer">
                  <span className="w-[7px] h-[7px] rounded-full bg-espresso-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-medium text-espresso-800 group-hover:text-espresso-900 transition-colors">{task.title}</p>
                    <p className="text-[11px] text-espresso-400 mt-0.5">{task.category} · {task.time}</p>
                  </div>
                  <span className={`text-[11px] font-medium border rounded-full px-2.5 py-[2px] shrink-0 ${task.tagColor}`}>
                    {task.tag}
                  </span>
                  <ChevronRight size={14} className="text-espresso-300 shrink-0" strokeWidth={1.6} />
                </div>
              ))}
            </div>
          </div>

          {/* Vault status */}
          <div className="bg-white rounded-xl border border-[#e2d5c3] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <h3 className="text-[15px] font-semibold text-espresso-900 mb-0.5">Vault status</h3>
            <p className="text-[12px] text-espresso-400 mb-5">Security overview</p>

            <div className="space-y-3.5">
              {vaultItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  {item.ok ? (
                    <span className="w-[22px] h-[22px] rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 4" stroke="#3d8b5e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  ) : (
                    <span className="w-[22px] h-[22px] rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                      <AlertTriangle size={12} className="text-amber-500" strokeWidth={2} />
                    </span>
                  )}
                  <span className={`text-[13px] ${item.ok ? 'text-espresso-700' : 'text-amber-700 font-medium'}`}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Action required */}
            <div className="mt-5 pt-4 border-t border-black/[0.06]">
              <p className="text-[10px] font-bold tracking-[0.14em] text-espresso-500 uppercase mb-2.5">Action required</p>
              <a href="/dashboard/vault" className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-amber-700 hover:text-amber-600 transition-colors no-underline">
                <AlertTriangle size={13} strokeWidth={2} />
                3 critical items missing
                <span className="text-amber-500">›</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ─ Floating widget ─ */}
      <div className="floating-widget hidden lg:block">
        <p className="text-[9px] font-bold tracking-[0.18em] text-espresso-500 uppercase mb-2">Preparedness</p>
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-[28px] font-serif font-semibold text-espresso-900 leading-none">{user.preparedness}%</span>
          <span className="text-[11px] text-espresso-400">overall</span>
        </div>
        <a
          href="/dashboard/planning"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-gold-600 hover:text-gold-500 transition-colors no-underline mt-1"
        >
          Continue planning <span aria-hidden>→</span>
        </a>
        <p className="text-[10px] italic text-espresso-400 leading-snug mt-4 border-t border-black/[0.06] pt-3">
          &ldquo;The most loving decisions are often the ones made before they are needed.&rdquo;
        </p>
      </div>
    </DashboardLayout>
  )
}
