import { Search, Upload, Lock, ChevronDown, FileText } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import CategoryIcon from '../components/ui/CategoryIcon'
import StatusBadge from '../components/ui/StatusBadge'
import type { DocumentStatus } from '../components/ui/StatusBadge'
import PageHeader from '../components/ui/PageHeader'
import { LoadingSkeleton, ErrorState, EmptyState } from '../components/ui/StateViews'
import { useResource } from '../lib/useResource'
import type { PillarKey } from '../lib/pillars'

interface VaultDocument {
  id: number
  title: string
  type: string
  size: string
  status: DocumentStatus
  date: string
  tags: string[]
  category: PillarKey
}

/* ── Mock data ── */
const DOCUMENTS = [
  {
    id: 1,
    title: 'Will & Testament',
    type: 'PDF',
    size: '2.4 MB',
    status: 'verified',
    date: '12 days ago',
    tags: ['Legal', 'Important'],
    category: 'legal',
  },
  {
    id: 2,
    title: 'Power of Attorney',
    type: 'PDF',
    size: '0.9 MB',
    status: 'draft',
    date: '3 weeks ago',
    tags: ['Legal'],
    category: 'legal',
  },
  {
    id: 3,
    title: 'Healthcare Directive',
    type: 'PDF',
    size: '1.1 MB',
    status: 'draft',
    date: '1 week ago',
    tags: ['Medical'],
    category: 'medical',
  },
  {
    id: 4,
    title: 'AIA Insurance Policy',
    type: 'PDF',
    size: '3.6 MB',
    status: 'verified',
    date: '1 month ago',
    tags: ['Financial'],
    category: 'financial',
  },
  {
    id: 5,
    title: 'Family Trust Agreement',
    type: 'PDF',
    size: '2.1 MB',
    status: 'verified',
    date: '2 months ago',
    tags: ['Legal', 'Family'],
    category: 'family',
  },
  {
    id: 6,
    title: 'Letter to Pim Siriwong',
    type: 'DOCX',
    size: '0.2 MB',
    status: 'draft',
    date: '2 days ago',
    tags: ['Personal', 'Letters'],
    category: 'personal',
  },
] satisfies VaultDocument[]

/* Single document card — the success-state unit. */
function DocumentCard({ doc }: { doc: VaultDocument }) {
  return (
    <div className="bg-white border border-espresso-250 rounded-xl px-6 py-5 flex flex-col gap-3.5 transition-[box-shadow,border-color] duration-200 cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-espresso-300">
      {/* Icon + title */}
      <div className="flex items-center gap-3">
        <CategoryIcon category={doc.category} size={40} />
        <div>
          <p className="text-[15px] font-semibold text-espresso-800 leading-[1.3]">{doc.title}</p>
          <p className="text-[13px] text-espresso-600">{doc.type} · {doc.size}</p>
        </div>
      </div>

      {/* Status + date */}
      <div className="flex items-center gap-2">
        <StatusBadge status={doc.status} />
        <span className="text-[13px] text-espresso-600">{doc.date}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {doc.tags.map((tag) => (
          <span
            key={tag}
            className="text-[12px] font-medium text-espresso-700 bg-cream-200 border border-espresso-250 rounded-full py-1 px-3 leading-normal"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Page ── */
export default function VaultPage() {
  // Reference wiring for the data-fetch seam (lib/useResource.ts): the page is
  // written against the full loading / error / empty / success lifecycle even
  // though the mock resolves synchronously today.
  const { status, data: documents, error, retry } = useResource(DOCUMENTS)
  const count = documents?.length ?? 0

  return (
    <AppLayout>
      <div className="max-w-300 mx-auto space-y-7 animate-fade-in">

        {/* ─ Header ─ */}
        <PageHeader
          size="lg"
          title="Your encrypted archive."
          subtitle="Documents, letters and records — sealed, searchable, sharable on your terms."
          actions={
            <div className="flex items-center gap-2 bg-white border border-espresso-250 rounded-full px-5 py-2.5">
              <Lock size={14} strokeWidth={2} className="text-espresso-600" />
              <span className="text-[13px] font-medium text-espresso-700">AES-256 · {count} {count === 1 ? 'file' : 'files'}</span>
            </div>
          }
        />

        {/* ─ Upload Dropzone ─ */}
        <section className="border-2 border-dashed border-espresso-300 rounded-2xl py-12 px-8 flex flex-col items-center justify-center text-center transition-colors duration-200 bg-cream-50 hover:border-espresso-400 hover:bg-cream-100">
          <div className="w-14 h-14 rounded-xl bg-cream-200 flex items-center justify-center mb-4">
            <Upload size={22} strokeWidth={1.8} className="text-espresso-600" />
          </div>
          <p className="text-[16px] font-medium text-espresso-800 mb-1">Drop a file to upload</p>
          <p className="text-[13px] text-espresso-600 mb-4">
            PDF, DOCX, JPG up to 25 MB. All files are<br />encrypted on upload.
          </p>
          <button className="text-[14px] font-medium text-espresso-700 cursor-pointer underline underline-offset-2 bg-transparent border-none p-0 transition-colors hover:text-espresso-800">Choose file</button>
        </section>

        {/* ─ Search & Filter ─ */}
        <section className="flex items-center gap-3.5">
          <div className="flex-1 flex items-center gap-2.5 bg-cream-150 border border-espresso-250 rounded-lg px-4 py-2.5">
            <Search size={16} strokeWidth={1.8} className="text-espresso-600 shrink-0" />
            <input
              type="text"
              placeholder="Search documents..."
              className="flex-1 bg-transparent border-none outline-none text-[14px] text-espresso-800 placeholder:text-espresso-600"
            />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-[13px] text-espresso-700 bg-cream-150 border border-espresso-250 rounded-lg px-3.5 py-2 cursor-pointer flex items-center gap-1">
              All tags
              <ChevronDown size={13} strokeWidth={2} className="text-espresso-600" />
            </div>
            <span className="text-[13px] text-espresso-600 whitespace-nowrap">{count} of {count}</span>
          </div>
        </section>

        {/* ─ Documents: full loading / error / empty / success lifecycle ─ */}
        {status === 'loading' && <LoadingSkeleton count={6} />}

        {status === 'error' && (
          <ErrorState
            title="Couldn’t open your vault"
            message={error?.message ?? 'Your documents didn’t load. Please try again.'}
            onRetry={retry}
          />
        )}

        {status === 'success' && count === 0 && (
          <EmptyState
            icon={FileText}
            title="Your vault is empty"
            message="Upload a document to seal it here — encrypted, searchable, and shared only on your terms."
          />
        )}

        {status === 'success' && count > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {documents.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </section>
        )}
      </div>
    </AppLayout>
  )
}
