import { Link } from 'react-router-dom'
import { Plus, Share2, ArrowRight } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

/* ── Mock data ── */
const members = [
  {
    name: 'Pisan Jaidee',
    relation: 'Father',
    born: 1958,
    location: 'Bangkok',
    role: 'Trustee',
    note: 'You have full authorization to make any changes without prior approval.',
  },
  {
    name: 'Somsri Jaidee',
    relation: 'Mother',
    born: 1960,
    location: 'Chiang Mai',
    role: 'Editor',
    note: 'Please feel free to make any adjustments as you see fit.',
  },
  {
    name: 'Pim Siriwong',
    relation: 'Spouse',
    born: 1989,
    location: 'Bangkok',
    role: 'Trustee',
    note: 'We share everything together. Decide as one.',
  },
]

const activity = [
  { name: 'Pim Siriwong', action: 'updated medical PoA', time: '2 hours ago' },
  { name: 'Somsri Jaidee', action: 'shared a memory letter', time: 'Yesterday, 18:42' },
  { name: 'Pisan Jaidee', action: 'acknowledged the will draft', time: '3 days ago' },
]

function initials(name) {
  return name.split(' ').map((part) => part[0]).join('')
}

/* ── Page ── */
export default function FamilyPage() {
  return (
    <AppLayout>
      <div className="max-w-300 mx-auto space-y-6 animate-fade-in">

        {/* ─ Header ─ */}
        <section className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase mb-2">
              Trusted Circle
            </p>
            <h1 className="text-[28px] sm:text-[36px] font-serif font-semibold text-espresso-900 leading-tight">
              Your family.
            </h1>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Button as={Link} to="/family/add" variant="outline" className="flex items-center gap-1.5 text-[13.5px] font-medium px-4 py-2 rounded-full no-underline">
              <Plus size={14} strokeWidth={2} />
              Add member
            </Button>
            <Button as={Link} to="/family/tree" variant="dark" className="flex items-center gap-1.5 text-[13.5px] font-medium px-4 py-2 rounded-full no-underline">
              Family tree
              <ArrowRight size={14} strokeWidth={2} />
            </Button>
          </div>
        </section>

        {/* ─ Member cards ─ */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((member) => (
            <Card key={member.name} className="p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-espresso-100 text-espresso-700 font-serif font-semibold text-base flex items-center justify-center shrink-0">
                  {initials(member.name)}
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-espresso-900 leading-tight">{member.name}</p>
                  <p className="text-[10px] font-bold tracking-[0.12em] text-espresso-400 uppercase mt-0.5">{member.relation}</p>
                </div>
              </div>

              <p className="text-[12.5px] text-espresso-500 mb-3">
                Born {member.born} · {member.location}
              </p>

              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-espresso-700 border border-espresso-200 rounded-full px-3 py-1 self-start mb-4">
                <Share2 size={12} strokeWidth={1.8} />
                {member.role}
              </span>

              <p className="text-[13px] text-espresso-600 leading-relaxed mb-4">
                {member.note}
              </p>

              <Link
                to="/family/tree"
                className="mt-auto inline-flex items-center gap-1 text-[12.5px] font-medium text-espresso-600 hover:text-espresso-800 transition-colors no-underline"
              >
                View on family tree <span aria-hidden>→</span>
              </Link>
            </Card>
          ))}
        </section>

        {/* ─ Latest Activity + Family Tree promo row ─ */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          {/* Latest Activity */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-[10px] font-bold tracking-[0.14em] text-espresso-400 uppercase mb-1">Latest Activity</p>
                <h3 className="text-[15px] font-semibold text-espresso-900">Recent updates</h3>
              </div>
              <span className="flex items-center gap-1.5 text-[12px] text-espresso-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Live
              </span>
            </div>

            <div className="mt-5 space-y-0 divide-y divide-black/6">
              {activity.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-3 py-3.5 first:pt-0">
                  <p className="text-[13px] text-espresso-700">
                    <span className="font-semibold text-espresso-900">{item.name}</span> {item.action}
                  </p>
                  <span className="text-[11.5px] text-espresso-400 shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Family Tree promo */}
          <div className="relative overflow-hidden rounded-xl bg-espresso-950 p-6 flex flex-col justify-between min-h-55">
            <div
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gold-500/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <p className="text-[10px] font-bold tracking-[0.16em] text-mist-100 uppercase mb-3">Family Tree</p>
              <h3 className="font-serif text-xl text-cream-50 leading-snug">
                See everyone connected to your legacy.
              </h3>
            </div>
            <Button
              as={Link}
              to="/family/tree"
              variant="light"
              className="relative z-10 self-start flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-full no-underline mt-6"
            >
              View tree
              <ArrowRight size={14} strokeWidth={2} />
            </Button>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
