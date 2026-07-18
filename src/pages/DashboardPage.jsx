import { TriangleAlert, Pencil, Clock, ChevronRight, AlertTriangle } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import Card from '../components/ui/Card'
import { PILLARS_BY_KEY } from '../lib/pillars'
import { currentUser } from '../lib/currentUser'

/* ── Mock data ── */
const pillarProgress = [
  { key: 'legal', pct: 62, done: 4, total: 6 },
  { key: 'medical', pct: 38, done: 3, total: 8 },
  { key: 'financial', pct: 71, done: 5, total: 7 },
  { key: 'personal', pct: 22, done: 2, total: 9 },
  { key: 'family', pct: 45, done: 4, total: 9 },
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

/* Each entry's index fixes its angle (0°, 72°, 144°, 216°, 288° clockwise from top).
   `anchor` is the SVG text-anchor for that angle: labels to the right of center grow
   rightward (start), labels to the left grow leftward (end), the top one is centered. */
const radarDimensions = [
  { label: 'Legal', pct: 62, anchor: 'middle' },
  { label: 'Medical', pct: 38, anchor: 'start' },
  { label: 'Financial', pct: 71, anchor: 'start' },
  { label: 'Personal', pct: 22, anchor: 'end' },
  { label: 'Family', pct: 45, anchor: 'end' },
]

function PentagonChart() {
  // Everything — grid, data shape, and labels — lives in one coordinate space
  // (the SVG viewBox), so it all scales together and can never spill past its box.
  // maxR is deliberately close to labelR (just enough gap for the label text) so
  // the pentagon fills most of the box instead of floating in a sea of margin.
  const cx = 190, cy = 190, maxR = 136, labelR = 152

  const dataPoints = radarDimensions.map((d, i) => {
    const r = (d.pct / 100) * maxR
    return polarToCart(cx, cy, r, i * 72)
  })
  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ')

  return (
    // No max-width cap: the chart fills exactly whatever width its card gives it,
    // at any breakpoint, and the viewBox math above keeps it safe from overflow.
    <div className="w-full mx-auto">
      <svg viewBox="0 0 380 380" className="w-full md:w-[80%] h-auto mx-auto overflow-hidden">
        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map(scale => (
          <polygon
            key={scale}
            points={pentagonPoints(cx, cy, maxR * scale)}
            fill="none"
            stroke="var(--color-espresso-200)"
            strokeWidth={scale === 1 ? 2 : 1}
            opacity={0.7}
          />
        ))}
        {/* Axis lines */}
        {radarDimensions.map((_, i) => {
          const p = polarToCart(cx, cy, maxR, i * 72)
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={p.x} y2={p.y}
              stroke="var(--color-espresso-200)"
              strokeWidth={1}
              opacity={0.7}
            />
          )
        })}
        {/* Data polygon */}
        <polygon
          points={dataPolygon}
          fill="rgba(26,17,12,0.08)"
          stroke="var(--color-espresso-900)"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={6} fill="var(--color-espresso-900)" />
        ))}
        {/* Labels */}
        {radarDimensions.map((d, i) => {
          const p = polarToCart(cx, cy, labelR, i * 72)
          return (
            <text
              key={d.label}
              x={p.x}
              y={p.y - 10}
              textAnchor={d.anchor}
              fontSize="10"
              fontWeight="500"
              fill="var(--color-espresso-700)"
            >
              {d.label}
              <tspan x={p.x} dy="15" fontSize="9" fontWeight="400" fill="var(--color-espresso-600)">
                {d.pct}%
              </tspan>
            </text>
          )
        })}
      </svg>
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
    <AppLayout>
      <div className="max-w-300 mx-auto space-y-6 animate-fade-in">

        {/* ─ Greeting ─ */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-[12px] font-bold tracking-[0.16em] text-espresso-550 uppercase mb-1">
              {formatDate()}
            </p>
            <h1 className="text-[28px] sm:text-[42px] font-serif font-semibold text-espresso-900 leading-tight">
              {getGreeting()}, {currentUser.firstName}.
            </h1>
          </div>

          <button className="animate-gentle-pulse flex items-center gap-2 bg-gold-100 border border-espresso-200 text-espresso-700 text-[13px] font-medium px-4 py-2 rounded-xl cursor-pointer hover:bg-espresso-50 transition-colors self-end">
            <TriangleAlert size={14} strokeWidth={1.8} className="text-gold-500" />
            3 items need attention
          </button>
        </section>

        <section>
          <div className="rounded-xl border border-espresso-250 shadow-[0_1px_3px_rgba(0,0,0,0.04)] bg-linear-to-r from-mist-50 via-white to-gold-100 grid grid-cols-1 lg:grid-cols-[1fr_340px] overflow-hidden">
            {/* Profile section */}
            <div className="p-5 sm:p-6 xl:p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  className="w-18 h-18 rounded-full object-cover ring-4 ring-espresso-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-3xl font-semibold font-serif text-espresso-900 leading-tight">{currentUser.fullName}</h2>
                    <button className="flex items-center gap-1 text-[11.5px] text-espresso-500 bg-espresso-50 border border-espresso-200 rounded-full px-2.5 py-0.5 hover:bg-espresso-100 transition-colors cursor-pointer">
                      <Pencil size={10} strokeWidth={2} />
                      Edit profile
                    </button>
                  </div>
                  <p className="text-[12px] text-espresso-400 mt-0.5">
                    Your life, organised with care · Last updated {currentUser.lastUpdated}
                  </p>
                </div>
              </div>

              {/* Preparedness bar */}
              <div className="flex flex-col max-w-[60%] gap-3 mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-espresso-600 shrink-0">Overall preparedness</span>
                  <span className="text-[14px] font-semibold text-espresso-800 tabular-nums">{currentUser.preparedness}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-cream-300 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-espresso-900 transition-[width] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ width: `${currentUser.preparedness}%` }}
                  />
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 pt-4 border-t border-black/6">
                {[
                  ['BORN', currentUser.born],
                  ['AGE', currentUser.age],
                  ['SPOUSE', currentUser.spouse],
                  ['RESIDENCE', currentUser.residence],
                  ['CHILDREN', currentUser.children],
                  ['BLOOD TYPE', currentUser.bloodType],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-espresso-400 uppercase mb-1">{label}</p>
                    <p className="text-[13.5px] font-medium text-espresso-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote section — shares the outer gradient, with left border */}
            <div className="border-t lg:border-t-0 lg:border-l border-black/6 p-6 xl:p-8 flex flex-col justify-center">
              <span className="font-serif text-5xl leading-none text-espresso-400 opacity-60 select-none">&ldquo;</span>
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
          <Card className="p-6">
            <h3 className="text-[15px] font-semibold text-espresso-900 mb-0.5">Pentagon view</h3>
            <p className="text-[12px] text-espresso-550 mb-6">Five dimensions of readiness</p>
            <PentagonChart />
          </Card>

          {/* By pillar */}
          <Card className="p-6">
            <h3 className="text-[15px] font-semibold text-espresso-900 mb-0.5">By pillar</h3>
            <p className="text-[12px] text-espresso-550 mb-5">Progress across all five</p>

            <div className="space-y-10">
              {pillarProgress.map(p => {
                const pillar = PILLARS_BY_KEY[p.key]
                const PillarIcon = pillar.icon
                return (
                <div key={p.key} className="flex items-center gap-3">
                  <div
                    className="w-10.5 h-10.5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: pillar.banner }}
                  >
                    <PillarIcon size={17} className="text-white" strokeWidth={1.8} />
                  </div>

                  <div className='w-full'>
                    <div className='flex flex-row justify-between w-full'>
                      <span className="text-[13.5px] font-medium text-espresso-800 w-18 shrink-0">{pillar.label}</span>
                      <div className='space-x-4'>
                        <span className="text-[12px] text-espresso-500 tabular-nums w-8 text-right">{p.pct}%</span>
                        <span className="text-[12px] text-espresso-400 tabular-nums w-7 text-right">{p.done}/{p.total}</span>
                      </div>
                    </div>
                    <div className="flex-1 h-1.25 rounded-full bg-cream-200 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-[width] duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{ width: `${p.pct}%`, background: pillar.banner }}
                      />
                    </div>
                  </div>
                </div>
                )
              })}
            </div>
          </Card>
        </section>

        {/* ─ Today's focus + Vault status row ─ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Today's focus */}
          <Card className="p-6">
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

            <div className="mt-5 space-y-0 divide-y divide-black/6">
              {todayTasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3 py-3.5 first:pt-0 group cursor-pointer">
                  <span
                    className="w-1.75 h-1.75 rounded-full shrink-0"
                    style={{ background: PILLARS_BY_KEY[task.category.toLowerCase()]?.banner }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-semibold text-espresso-800 group-hover:text-espresso-900 transition-colors">{task.title}</p>
                    <p className="text-[11px] text-espresso-400 mt-0.5">{task.category} · {task.time}</p>
                  </div>
                  <span className={`text-[11px] font-medium border rounded-full px-2.5 py-0.5 shrink-0 ${task.tagColor}`}>
                    {task.tag}
                  </span>
                  <ChevronRight size={14} className="text-espresso-300 shrink-0" strokeWidth={1.6} />
                </div>
              ))}
            </div>
          </Card>

          {/* Vault status */}
          <Card className="p-6">
            <h3 className="text-[15px] font-semibold text-espresso-900 mb-0.5">Vault status</h3>
            <p className="text-[12px] text-espresso-400 mb-5">Security overview</p>

            <div className="space-y-3.5">
              {vaultItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  {item.ok ? (
                    <span className="w-5.5 h-5.5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 4" stroke="#3d8b5e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  ) : (
                    <span className="w-5.5 h-5.5 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                      <AlertTriangle size={12} className="text-amber-500" strokeWidth={2} />
                    </span>
                  )}
                  <span className={`text-[13px] ${item.ok ? 'text-espresso-700' : 'text-amber-700 font-medium'}`}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Action required */}
            <div className="mt-5 pt-4 border-t border-black/6">
              <p className="text-[10px] font-bold tracking-[0.14em] text-espresso-500 uppercase mb-2.5">Action required</p>
              <a
                href="/dashboard/vault"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-espresso-700 bg-gold-100 border border-espresso-200 rounded-full px-3 py-1.5 hover:bg-gold-100/70 transition-colors no-underline"
              >
                <AlertTriangle size={13} strokeWidth={2} className="text-gold-600" />
                3 critical items missing
                <span aria-hidden>›</span>
              </a>
            </div>
          </Card>
        </section>
      </div>
    </AppLayout>
  )
}
