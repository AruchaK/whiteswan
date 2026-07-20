import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'

const RELATIONSHIPS = ['Spouse', 'Child', 'Parent', 'Sibling', 'Grandparent', 'Grandchild', 'Other']

const ACCESS_LEVELS = [
  { key: 'viewer', label: 'Viewer', desc: 'Can see shared documents only' },
  { key: 'editor', label: 'Editor', desc: 'Can update vault contents' },
  { key: 'trustee', label: 'Trustee', desc: 'Gets posthumous access' },
]

const MAX_PHOTO_BYTES = 5 * 1024 * 1024

const initialForm = {
  firstName: '',
  surname: '',
  relationship: '',
  dob: '',
  phone: '',
  email: '',
  notes: '',
}

export default function FamilyAddPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [form, setForm] = useState(initialForm)
  const [accessLevel, setAccessLevel] = useState('viewer')
  const [photoPreview, setPhotoPreview] = useState(null)
  const [photoError, setPhotoError] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setPhotoError('Please upload a JPG or PNG file.')
      return
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError('File must be 5 MB or smaller.')
      return
    }

    setPhotoError('')
    const reader = new FileReader()
    reader.onload = () => setPhotoPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const validate = () => {
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'First name is required.'
    if (!form.surname.trim()) next.surname = 'Surname is required.'
    if (!form.relationship) next.relationship = 'Select a relationship.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // No backend is wired up yet — this is a mock save (see CLAUDE.md).
    navigate('/dashboard/family')
  }

  const inputClass = (field) =>
    `text-[13px] text-espresso-800 bg-white border rounded-lg px-3.5 py-2.25 transition-colors duration-150 outline-none w-full box-border focus:border-espresso-400 ${
      errors[field] ? 'border-red-400' : 'border-espresso-250'
    }`

  return (
    <AppLayout>
      <div className="max-w-300 mx-auto space-y-6 animate-fade-in">
        <PageHeader
          back={{ to: '/dashboard/family', label: 'Back to family' }}
          title="Add a family member."
          subtitle="Invite someone to your trusted circle and assign their role."
        />

        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} noValidate>
            {/* Photo upload */}
            <div className="flex items-center gap-4 mb-7">
              <div className="w-16 h-16 rounded-full bg-cream-300 shrink-0 overflow-hidden">
                {photoPreview && (
                  <img src={photoPreview} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-espresso-800 bg-transparent border-none p-0 cursor-pointer hover:text-espresso-600 transition-colors"
                >
                  <ArrowUp size={14} strokeWidth={2} />
                  Upload photo
                </button>
                <p className="text-[12px] text-espresso-600 mt-1">JPG or PNG · max 5 MB</p>
                {photoError && <p className="text-[12px] text-red-600 mt-1">{photoError}</p>}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-espresso-800">First name</label>
                <input
                  type="text"
                  className={inputClass('firstName')}
                  value={form.firstName}
                  onChange={handleChange('firstName')}
                />
                {errors.firstName && <p className="text-[12px] text-red-600">{errors.firstName}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-espresso-800">Surname</label>
                <input
                  type="text"
                  className={inputClass('surname')}
                  value={form.surname}
                  onChange={handleChange('surname')}
                />
                {errors.surname && <p className="text-[12px] text-red-600">{errors.surname}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-espresso-800">Relationship</label>
                <select
                  className={`${inputClass('relationship')} cursor-pointer`}
                  value={form.relationship}
                  onChange={handleChange('relationship')}
                >
                  <option value="">Select...</option>
                  {RELATIONSHIPS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errors.relationship && <p className="text-[12px] text-red-600">{errors.relationship}</p>}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-espresso-800">Date of birth</label>
                <input
                  type="date"
                  className={inputClass('dob')}
                  value={form.dob}
                  onChange={handleChange('dob')}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-espresso-800">Phone</label>
                <input
                  type="tel"
                  className={inputClass('phone')}
                  value={form.phone}
                  onChange={handleChange('phone')}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-espresso-800">Email</label>
                <input
                  type="email"
                  className={inputClass('email')}
                  value={form.email}
                  onChange={handleChange('email')}
                />
                {errors.email && <p className="text-[12px] text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="border-t border-espresso-250 pt-6 mb-6">
              <h3 className="text-[14px] font-semibold text-espresso-800 mb-4">Access level</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ACCESS_LEVELS.map((level) => {
                  const isSelected = accessLevel === level.key
                  return (
                    <button
                      key={level.key}
                      type="button"
                      onClick={() => setAccessLevel(level.key)}
                      className={`text-left rounded-xl border px-4 py-3.5 cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? 'bg-espresso-900 border-espresso-900 text-cream-50'
                          : 'bg-white border-espresso-250 text-espresso-800 hover:border-espresso-400'
                      }`}
                    >
                      <p className="text-[14px] font-semibold mb-0.5">{level.label}</p>
                      <p className={`text-[12px] leading-snug ${isSelected ? 'text-cream-200' : 'text-espresso-600'}`}>
                        {level.desc}
                      </p>
                    </button>
                  )
                })}
              </div>
              <p className="text-[12px] text-espresso-600 mt-3">
                Viewer can see shared documents only. Editor can update. Trustee gets posthumous access.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 mb-7">
              <label className="text-[13px] font-semibold text-espresso-800">Notes</label>
              <textarea
                rows={4}
                placeholder="Any private context about this person..."
                className="text-[13px] text-espresso-800 bg-white border border-espresso-250 rounded-lg px-3.5 py-2.5 transition-colors duration-150 outline-none w-full box-border resize-none focus:border-espresso-400 placeholder:text-espresso-600"
                value={form.notes}
                onChange={handleChange('notes')}
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button as={Link} to="/dashboard/family" variant="outline" className="text-[13px] font-medium rounded-full px-5 py-2.25 no-underline">
                Cancel
              </Button>
              <Button type="submit" variant="dark" className="text-[13px] font-semibold rounded-full px-5 py-2.25">
                Save member
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
