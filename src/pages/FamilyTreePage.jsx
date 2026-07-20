import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import StatusBadge from '../components/ui/StatusBadge'
import { initials } from '../lib/initials'

/* ── Mock data — three generations of the trusted circle ── */
const members = [
  {
    id: 'pisan',
    name: 'Pisan Jaidee',
    relation: 'Father',
    bornYear: 1958,
    bornFull: 'January 12, 1958',
    age: '67 years',
    location: 'Bangkok',
    generation: 1,
    spouse: 'Somsri Jaidee',
    children: '—',
    email: 'pisan.jaidee@gmail.com',
    phone: '+66 81 234 5678',
    badge: null,
    reflection: 'You have full authorization to make any changes without prior approval.',
    documents: [{ title: 'Last Will & Testament', status: 'verified', date: '1 month ago' }],
  },
  {
    id: 'somsri',
    name: 'Somsri Jaidee',
    relation: 'Mother',
    bornYear: 1960,
    bornFull: 'May 3, 1960',
    age: '65 years',
    location: 'Chiang Mai',
    generation: 1,
    spouse: 'Pisan Jaidee',
    children: '—',
    email: 'somsri.jaidee@gmail.com',
    phone: '+66 81 345 6789',
    badge: null,
    reflection: 'Please feel free to make any adjustments as you see fit.',
    documents: [{ title: 'Healthcare Directive', status: 'draft', date: '2 weeks ago' }],
  },
  {
    id: 'somchai',
    name: 'Somchai Jaidee',
    relation: 'You',
    bornYear: 1986,
    bornFull: 'March 14, 1986',
    age: '39 years',
    location: 'Bangkok',
    generation: 2,
    spouse: 'Pim Siriwong',
    children: 'Nara · Ploy',
    email: 'somchai.jaidee@gmail.com',
    phone: '+66 90 123 4567',
    avatar: '/avatar-somchai.png',
    badge: 'Primary Executor',
    reflection: 'I want my family to live boldly, hold each other with care, and remember the love that built this home.',
    documents: [
      { title: 'Last Will & Testament', status: 'verified', date: '12 days ago' },
      { title: 'Power of Attorney', status: 'draft', date: '3 weeks ago' },
    ],
  },
  {
    id: 'pim',
    name: 'Pim Siriwong',
    relation: 'Spouse',
    bornYear: 1989,
    bornFull: 'August 22, 1989',
    age: '36 years',
    location: 'Bangkok',
    generation: 2,
    spouse: 'Somchai Jaidee',
    children: 'Nara · Ploy',
    email: 'pim.siriwong@gmail.com',
    phone: '+66 89 456 7890',
    badge: null,
    reflection: 'We share everything together. Decide as one.',
    documents: [{ title: 'Medical Power of Attorney', status: 'verified', date: '2 hours ago' }],
  },
  {
    id: 'nara',
    name: 'Nara Jaidee',
    relation: 'Daughter',
    bornYear: 2017,
    bornFull: 'June 9, 2017',
    age: '8 years',
    location: 'Bangkok',
    generation: 3,
    spouse: '—',
    children: '—',
    email: '—',
    phone: '—',
    badge: null,
    reflection: 'Too young for an account yet — added so she’s remembered in the plan.',
    documents: [],
  },
  {
    id: 'ploy',
    name: 'Ploy Jaidee',
    relation: 'Son',
    bornYear: 2020,
    bornFull: 'November 2, 2020',
    age: '5 years',
    location: 'Bangkok',
    generation: 3,
    spouse: '—',
    children: '—',
    email: '—',
    phone: '—',
    badge: null,
    reflection: 'Too young for an account yet — added so he’s remembered in the plan.',
    documents: [],
  },
]

/* ── Exact design tokens (mirrored from the reference template) ── */
const C = {
  cardBorder: '#E7DCCD',
  name: '#1F1612',
  role: '#704C35',
  born: '#545656',
  ring: '#C9A96E', // gold avatar ring
  ringGap: '#FFFFFF',
  line: '#C8B7A2', // connectors
  dot: '#3D2B1F',
  selBg: '#464B54', // slate "you" card
  selName: '#FFFFFF',
  selRole: '#D8C7B6',
  selBorn: '#D6CABC',
  selRing: '#8A9099',
}

/* ── Avatar: thin gold ring + gap around a photo (or serif initials) ── */
function Avatar({ member, size = 60, selected = false }) {
  const gap = 2
  const inner = size - 4 * gap
  return (
    <div
      className="rounded-full shrink-0"
      style={{ width: size, height: size, padding: gap, background: selected ? C.selRing : C.ring }}
    >
      <div
        className="rounded-full w-full h-full"
        style={{ padding: gap, background: selected ? C.selBg : C.ringGap }}
      >
        <div
          className="rounded-full overflow-hidden flex items-center justify-center bg-cream-300"
          style={{ width: inner, height: inner }}
        >
          {member.avatar ? (
            <img src={member.avatar} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="font-serif font-semibold text-espresso-700" style={{ fontSize: size * 0.3 }}>
              {initials(member.name)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Genogram layout ──
   A real family tree isn't three centered pairs on one spine: a person's
   parents connect straight down into *that person's* box, while a couple's
   children fork from the couple's own connector. The parents' row therefore
   sits centered over the "You" card, and every connector is a plain
   horizontal / vertical segment (no diagonals). */
const NODE_W = 210
const NODE_H = 164
const COL_GAP = 60
const ROW_GAP = 56
const PAD = 8 // breathing room inside the canvas

const X_LEFT = 140 // Somchai / Nara column
const X_RIGHT = X_LEFT + NODE_W + COL_GAP // Pim / Ploy column
const X_PISAN = X_LEFT + NODE_W / 2 - (NODE_W * 2 + COL_GAP) / 2 // parents centered over Somchai
const X_SOMSRI = X_PISAN + NODE_W + COL_GAP

const Y1 = PAD
const Y2 = Y1 + NODE_H + ROW_GAP
const Y3 = Y2 + NODE_H + ROW_GAP
const FORK_Y = Y2 + NODE_H + ROW_GAP / 2

const CANVAS_W = X_RIGHT + NODE_W + PAD
const CANVAS_H = Y3 + NODE_H + PAD

const NODE_POSITIONS = {
  pisan: { x: X_PISAN, y: Y1 },
  somsri: { x: X_SOMSRI, y: Y1 },
  somchai: { x: X_LEFT, y: Y2 },
  pim: { x: X_RIGHT, y: Y2 },
  nara: { x: X_LEFT, y: Y3 },
  ploy: { x: X_RIGHT, y: Y3 },
}

function TreeNode({ member, isSelected, onSelect }) {
  const pos = NODE_POSITIONS[member.id]
  return (
    <button
      type="button"
      onClick={() => onSelect(member.id)}
      aria-pressed={isSelected}
      style={{
        left: pos.x,
        top: pos.y,
        width: NODE_W,
        height: NODE_H,
        background: isSelected ? C.selBg : '#FFFFFF',
        borderColor: isSelected ? C.selBg : C.cardBorder,
        boxShadow: isSelected
          ? '0 10px 28px rgba(70,75,84,0.24)'
          : '0 1px 3px rgba(0,0,0,0.04)',
      }}
      className="absolute z-10 flex flex-col items-center justify-center text-center rounded-[22px] border px-4 py-4 cursor-pointer transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-0.5"
    >
      <Avatar member={member} size={60} selected={isSelected} />
      <p
        className="font-serif font-medium leading-tight mt-3 truncate w-full"
        style={{ fontSize: 18, color: isSelected ? C.selName : C.name }}
      >
        {member.name}
      </p>
      <p
        className="font-bold uppercase mt-2 truncate w-full"
        style={{ fontSize: 10, letterSpacing: '0.18em', color: isSelected ? C.selRole : C.role }}
      >
        {member.relation} · {member.bornYear}
      </p>
      <p className="mt-1.5 truncate w-full" style={{ fontSize: 11, color: isSelected ? C.selBorn : C.born }}>
        {member.location}
      </p>
    </button>
  )
}

/* ── Connectors: one crisp SVG overlay behind the nodes ── */
function TreeConnectors() {
  const somchaiCX = X_LEFT + NODE_W / 2
  const pimCX = X_RIGHT + NODE_W / 2
  const ployCX = pimCX
  const naraCX = somchaiCX

  const row1CY = Y1 + NODE_H / 2
  const row2CY = Y2 + NODE_H / 2
  const coupleCX = (X_LEFT + NODE_W + X_RIGHT) / 2

  const stroke = C.line
  const sw = 1.5

  return (
    <svg
      width={CANVAS_W}
      height={CANVAS_H}
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* Parents: horizontal link + drop into Somchai */}
      <line x1={X_PISAN + NODE_W} y1={row1CY} x2={X_SOMSRI} y2={row1CY} stroke={stroke} strokeWidth={sw} />
      <line x1={somchaiCX} y1={row1CY} x2={somchaiCX} y2={Y2} stroke={stroke} strokeWidth={sw} />

      {/* Couple: horizontal link */}
      <line x1={X_LEFT + NODE_W} y1={row2CY} x2={X_RIGHT} y2={row2CY} stroke={stroke} strokeWidth={sw} />

      {/* Fork down to the children */}
      <line x1={coupleCX} y1={row2CY} x2={coupleCX} y2={FORK_Y} stroke={stroke} strokeWidth={sw} />
      <line x1={naraCX} y1={FORK_Y} x2={ployCX} y2={FORK_Y} stroke={stroke} strokeWidth={sw} />
      <line x1={naraCX} y1={FORK_Y} x2={naraCX} y2={Y3} stroke={stroke} strokeWidth={sw} />
      <line x1={ployCX} y1={FORK_Y} x2={ployCX} y2={Y3} stroke={stroke} strokeWidth={sw} />

      {/* Junction dots */}
      <circle cx={somchaiCX} cy={row1CY} r={4.5} fill={C.dot} stroke="#FBF8F3" strokeWidth={1.5} />
      <circle cx={coupleCX} cy={row2CY} r={4.5} fill={C.dot} stroke="#FBF8F3" strokeWidth={1.5} />
    </svg>
  )
}

/* ── Page ── */
export default function FamilyTreePage() {
  const [selectedId, setSelectedId] = useState('somchai')
  const selected = members.find((m) => m.id === selectedId) ?? members[2]

  return (
    <AppLayout>
      <div className="max-w-300 mx-auto space-y-6 animate-fade-in">

        {/* ─ Header ─ */}
        <section>
          <Link
            to="/dashboard/family"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-espresso-600 hover:text-espresso-700 transition-colors no-underline mb-4"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Family
          </Link>
          <h1 className="text-[28px] sm:text-[36px] font-serif font-semibold text-espresso-900 leading-tight mb-2">
            Family Tree.
          </h1>
          <p className="text-[14px] text-espresso-600 leading-relaxed">
            Three generations · {members.length} members preserved in your legacy
          </p>
        </section>

        {/* ─ Tree + Selected member ─ */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 items-start">

          {/* Tree — single clean frame */}
          <div className="rounded-3xl border border-espresso-250 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-10 overflow-x-auto">
            <div className="relative mx-auto" style={{ width: CANVAS_W, height: CANVAS_H }}>
              <TreeConnectors />
              {members.map((member) => (
                <TreeNode
                  key={member.id}
                  member={member}
                  isSelected={selectedId === member.id}
                  onSelect={setSelectedId}
                />
              ))}
            </div>
          </div>

          {/* Selected member */}
          <Card className="p-6">
            <p className="text-[10px] font-bold tracking-[0.14em] text-espresso-600 uppercase mb-4">
              Selected Member
            </p>

            <div className="flex items-center gap-3 mb-4">
              <Avatar member={selected} size={52} />
              <div className="min-w-0">
                <p className="text-[16px] font-serif font-semibold text-espresso-900 leading-tight truncate">
                  {selected.name}
                </p>
                <p className="text-[12px] text-espresso-600 mt-0.5">
                  Generation {selected.generation} · {selected.relation} · Born {selected.bornYear}
                </p>
              </div>
            </div>

            {selected.badge && (
              <span className="inline-flex items-center text-[11px] font-semibold text-espresso-700 border border-espresso-250 rounded-full px-3 py-1 mb-4">
                {selected.badge.toUpperCase()}
              </span>
            )}

            <div className="border-t border-espresso-250 pt-4 mb-4">
              <p className="text-[10px] font-bold tracking-[0.14em] text-espresso-600 uppercase mb-3">Personal</p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-3">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] text-espresso-600 uppercase mb-0.5">Born</p>
                  <p className="text-[13px] text-espresso-800">{selected.bornFull} · {selected.location}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] text-espresso-600 uppercase mb-0.5">Age</p>
                  <p className="text-[13px] text-espresso-800">{selected.age}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] text-espresso-600 uppercase mb-0.5">Spouse</p>
                  <p className="text-[13px] text-espresso-800 truncate">{selected.spouse}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] text-espresso-600 uppercase mb-0.5">Children</p>
                  <p className="text-[13px] text-espresso-800 truncate">{selected.children}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold tracking-[0.1em] text-espresso-600 uppercase mb-0.5">Email</p>
                  <p className="text-[13px] text-espresso-800 truncate">{selected.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold tracking-[0.1em] text-espresso-600 uppercase mb-0.5">Phone</p>
                  <p className="text-[13px] text-espresso-800">{selected.phone}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-espresso-250 pt-4 mb-4">
              <p className="text-[10px] font-bold tracking-[0.14em] text-espresso-600 uppercase mb-2">Reflection</p>
              <p className="text-[13px] text-espresso-700 italic leading-relaxed">"{selected.reflection}"</p>
            </div>

            <div className="border-t border-espresso-250 pt-4 mb-5">
              <p className="text-[10px] font-bold tracking-[0.14em] text-espresso-600 uppercase mb-3">Shared Documents</p>
              {selected.documents.length > 0 ? (
                <div className="flex flex-col gap-2.5">
                  {selected.documents.map((doc) => (
                    <div key={doc.title} className="flex items-center justify-between gap-3">
                      <span className="text-[13px] text-espresso-800 truncate">{doc.title}</span>
                      <StatusBadge status={doc.status} size="sm" className="shrink-0">{` · ${doc.date}`}</StatusBadge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-espresso-600 italic">No documents shared yet.</p>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <Button variant="dark" className="flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-full">
                View profile
                <ArrowRight size={13} strokeWidth={2} />
              </Button>
              <Button variant="outline" className="flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-full">
                <Share2 size={13} strokeWidth={1.8} />
                Send message
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </AppLayout>
  )
}
