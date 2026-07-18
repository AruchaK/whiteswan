import { Search, Upload, Lock, ChevronDown } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import './VaultPage.css'

/* ── Mock data ── */
const documents = [
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
]

const user = {
  preparedness: 44,
}

/* ── Page ── */
export default function VaultPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-in">

        {/* ─ Header ─ */}
        <section className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase mb-2">
              Life Vault
            </p>
            <h1 className="text-[28px] sm:text-[36px] font-serif font-semibold text-espresso-900 leading-tight mb-2">
              Your encrypted archive.
            </h1>
            <p className="text-[14px] text-espresso-500 leading-relaxed">
              Documents, letters and records — sealed, searchable, sharable on your terms.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-espresso-200 rounded-full px-4 py-2 shrink-0 self-start">
            <Lock size={13} strokeWidth={2} className="text-espresso-500" />
            <span className="text-[12px] font-medium text-espresso-700">AES-256 · 6 files</span>
          </div>
        </section>

        {/* ─ Upload Dropzone ─ */}
        <section className="vault-dropzone">
          <div className="vault-dropzone-icon">
            <Upload size={20} strokeWidth={1.8} className="text-espresso-500" />
          </div>
          <p className="vault-dropzone-title">Drop a file to upload</p>
          <p className="vault-dropzone-subtitle">
            PDF, DOCX, JPG up to 25 MB. All files are<br />encrypted on upload.
          </p>
          <button className="vault-dropzone-btn">Choose file</button>
        </section>

        {/* ─ Search & Filter ─ */}
        <section className="vault-search-bar">
          <div className="vault-search-input-wrap">
            <Search size={15} strokeWidth={1.8} className="text-espresso-400 shrink-0" />
            <input type="text" placeholder="Search documents..." />
          </div>
          <div className="vault-filter-group">
            <div className="vault-tag-select flex items-center gap-1">
              All tags
              <ChevronDown size={12} strokeWidth={2} className="text-espresso-500" />
            </div>
            <span className="vault-count">6 of 6</span>
          </div>
        </section>

        {/* ─ Document Cards Grid ─ */}
        <section className="vault-cards-grid">
          {documents.map((doc) => (
            <div key={doc.id} className="vault-card">
              {/* Icon + title */}
              <div className="vault-card-header">
                <div className={`vault-card-icon ${doc.category}`}>
                  {doc.title[0]}
                </div>
                <div>
                  <p className="vault-card-title">{doc.title}</p>
                  <p className="vault-card-meta">{doc.type} · {doc.size}</p>
                </div>
              </div>

              {/* Status + date */}
              <div className="flex items-center">
                <span className={`vault-status ${doc.status}`}>
                  <span className="vault-status-dot" />
                  {doc.status === 'verified' ? 'Verified' : 'Draft'}
                </span>
                <span className="vault-card-date">{doc.date}</span>
              </div>

              {/* Tags */}
              <div className="vault-tags">
                {doc.tags.map((tag) => (
                  <span key={tag} className="vault-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* ─ Floating widget ─ */}
      <div className="vault-floating-widget hidden lg:block">
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
