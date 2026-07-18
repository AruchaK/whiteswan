import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import Card from '../components/ui/Card'

export default function FamilyTreePage() {
  return (
    <AppLayout>
      <div className="max-w-300 mx-auto space-y-6 animate-fade-in">
        <section>
          <Link
            to="/dashboard/family"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-espresso-500 hover:text-espresso-700 transition-colors no-underline mb-4"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to family
          </Link>
          <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase mb-2">
            Family Tree
          </p>
          <h1 className="text-[28px] sm:text-[36px] font-serif font-semibold text-espresso-900 leading-tight mb-2">
            See everyone connected to your legacy.
          </h1>
          <p className="text-[14px] text-espresso-500 leading-relaxed">
            A visual map of your trusted circle and how everyone is connected.
          </p>
        </section>

        <Card className="p-8">
          <p className="text-[13px] text-espresso-400 italic">
            Coming soon — the interactive family tree will appear here.
          </p>
        </Card>
      </div>
    </AppLayout>
  )
}
