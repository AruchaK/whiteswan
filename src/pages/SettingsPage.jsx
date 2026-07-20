import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import Button from '../components/ui/Button'
import ToggleSwitch from '../components/ui/ToggleSwitch'
import PageHeader from '../components/ui/PageHeader'

/* ── Section definitions ── */
const sections = ['Account', 'Notifications', 'Privacy & Sharing', 'Language & Region']

/* ── Mock user data ── */
const initialForm = {
  fullName: 'Somchai Jaidee',
  email: 'somchai.jaidee@gmail.com',
  phone: '+66 90 123 4567',
  twoFactor: false,
}

const initialNotifications = {
  email: { label: 'Email', desc: 'Weekly check-in + alerts', enabled: true },
  sms: { label: 'SMS', desc: 'Critical alerts only', enabled: false },
  push: { label: 'Push', desc: 'On this device', enabled: true },
  weeklyNudge: { label: 'Weekly reflection nudge', desc: 'Sunday mornings', enabled: true },
}

const sharedAccess = [
  { name: 'Pim Siriwong', role: 'Trustee' },
  { name: 'Pisan Jaidee', role: 'Trustee' },
  { name: 'Somsri Jaidee', role: 'Editor' },
]

const LANGUAGES = [
  { code: 'th', label: 'ไทย' },
  { code: 'en', label: 'English' },
]

const CURRENCIES = ['THB', 'USD', 'EUR', 'SGD']

/* ── Page ── */
export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('Account')
  const [form, setForm] = useState(initialForm)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [language, setLanguage] = useState('th')
  const [currency, setCurrency] = useState('THB')

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled },
    }))
  }

  return (
    <AppLayout>
      <div className="max-w-300 mx-auto space-y-6 animate-fade-in">

        {/* ─ Header ─ */}
        <PageHeader
          title="Settings."
          subtitle="Manage your account, notifications, privacy and regional preferences."
        />

        {/* ─ Settings card ─ */}
        <div className="bg-white border border-espresso-250 rounded-xl flex flex-col md:flex-row overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] min-h-120">
          {/* Sections nav */}
          <div className="w-full md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-espresso-250 px-5 pt-5 pb-4 md:px-6 md:py-7">
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-espresso-600 mb-4">Sections</p>
            <nav className="flex flex-row flex-wrap gap-1.5 md:flex-col md:gap-0.5 space-y-2">
              {sections.map((section) => {
                const isActive = activeSection === section
                return (
                  <button
                    key={section}
                    className={`block w-auto md:w-full text-[13px] font-medium px-3.5 py-2 rounded-lg border cursor-pointer transition-all duration-150 no-underline text-left bg-transparent ${
                      isActive
                        ? 'bg-white text-espresso-800 font-semibold border-espresso-250'
                        : 'text-espresso-600 border-transparent hover:bg-espresso-50 hover:text-espresso-800'
                    }`}
                    onClick={() => setActiveSection(section)}
                  >
                    {section}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content area */}
          <div className="flex-1 px-5 py-6 md:px-9 md:py-7">
            {activeSection === 'Account' && (
              <>
                <h2 className="text-base font-semibold text-espresso-800 mb-1">Account</h2>
                <p className="text-[13px] text-espresso-600 mb-6">Update your personal details and security.</p>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-7">
                  <img
                    src="/avatar-somchai.png"
                    alt="Somchai Jaidee"
                    className="w-14 h-14 rounded-full object-cover shadow-[0_0_0_3px_var(--color-espresso-100)]"
                  />
                  <button className="text-[13px] font-medium text-espresso-700 bg-white border border-espresso-250 rounded-lg px-4 py-1.75 cursor-pointer transition-all duration-150 hover:bg-espresso-50 hover:border-espresso-300">
                    Change avatar
                  </button>
                </div>

                {/* Form fields — 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-espresso-800">Full Name</label>
                    <input
                      type="text"
                      className="text-[13px] text-espresso-800 bg-white border border-espresso-250 rounded-lg px-3.5 py-2.25 transition-colors duration-150 outline-none w-full box-border focus:border-espresso-400"
                      value={form.fullName}
                      onChange={handleChange('fullName')}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-espresso-800">Email Address</label>
                    <input
                      type="email"
                      className="text-[13px] text-espresso-800 bg-white border border-espresso-250 rounded-lg px-3.5 py-2.25 transition-colors duration-150 outline-none w-full box-border focus:border-espresso-400"
                      value={form.email}
                      onChange={handleChange('email')}
                    />
                  </div>
                </div>

                {/* Phone — single column */}
                <div className="flex flex-col gap-1.5 max-w-[calc(50%-10px)]">
                  <label className="text-[13px] font-semibold text-espresso-800">Phone Number</label>
                  <input
                    type="tel"
                    className="text-[13px] text-espresso-800 bg-white border border-espresso-250 rounded-lg px-3.5 py-2.25 transition-colors duration-150 outline-none w-full box-border focus:border-espresso-400"
                    value={form.phone}
                    onChange={handleChange('phone')}
                  />
                </div>

                {/* Security */}
                <div className="border-t border-espresso-250 pt-6 mt-2">
                  <h3 className="text-[14px] font-semibold text-espresso-800 mb-4">Security</h3>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[13px] font-medium text-espresso-800 mb-0.5">Two-factor authentication</p>
                      <p className="text-xs text-espresso-600">Adds a one-time code on every new sign-in.</p>
                    </div>
                    <ToggleSwitch
                      checked={form.twoFactor}
                      onChange={(e) => setForm((prev) => ({ ...prev, twoFactor: e.target.checked }))}
                      activeClassName="peer-checked:bg-[#5E8C6A]"
                    />
                  </div>
                </div>

                {/* Save */}
                <Button variant="dark" className="mt-7 text-[13px] font-semibold rounded-lg px-6 py-2.5">Save changes</Button>
              </>
            )}

            {activeSection === 'Notifications' && (
              <>
                <h2 className="text-base font-semibold text-espresso-800 mb-1">Notifications</h2>
                <p className="text-[13px] text-espresso-600 mb-6">Choose what we update you about.</p>

                <div className="border-t border-espresso-250 divide-y divide-espresso-250">
                  {Object.entries(notifications).map(([key, { label, desc, enabled }]) => (
                    <div key={key} className="flex items-center justify-between gap-4 py-4 first:pt-5">
                      <div>
                        <p className="text-[13px] font-medium text-espresso-800 mb-0.5">{label}</p>
                        <p className="text-xs text-espresso-600">{desc}</p>
                      </div>
                      <ToggleSwitch checked={enabled} onChange={() => toggleNotification(key)} ariaLabel={`Toggle ${label} notifications`} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeSection === 'Privacy & Sharing' && (
              <>
                <h2 className="text-base font-semibold text-espresso-800 mb-1">Privacy & Sharing</h2>
                <p className="text-[13px] text-espresso-600 mb-6">Manage who can see your vault data.</p>

                <div className="border-t border-espresso-250 pt-5">
                  <h3 className="text-[14px] font-semibold text-espresso-800 mb-0.5">Shared Access</h3>
                  <p className="text-xs text-espresso-600 mb-4">
                    {sharedAccess.length} people currently hold access to parts of your vault.
                  </p>

                  <div className="flex flex-col gap-2.5 mb-4">
                    {sharedAccess.map((person) => (
                      <div
                        key={person.name}
                        className="flex items-center justify-between gap-4 border border-espresso-250 rounded-lg px-4 py-3"
                      >
                        <span className="text-[13px] font-medium text-espresso-800">{person.name}</span>
                        <span className="text-[12px] font-medium text-espresso-600 bg-cream-150 border border-espresso-250 rounded-full px-3 py-1">
                          {person.role}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="text-[13px] font-medium rounded-lg px-4 py-2">
                    Manage shared access
                  </Button>
                </div>

                <div className="border-t border-espresso-250 mt-6 pt-6">
                  <h3 className="text-[14px] font-semibold text-red-700 mb-0.5">Danger Zone</h3>
                  <p className="text-xs text-espresso-600 mb-4">Irreversible actions regarding your data.</p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="text-[13px] font-medium rounded-lg px-4 py-2">
                      Export data
                    </Button>
                    <Button variant="danger" className="text-[13px] font-medium rounded-lg px-4 py-2">
                      Delete account
                    </Button>
                  </div>
                </div>
              </>
            )}

            {activeSection === 'Language & Region' && (
              <>
                <h2 className="text-base font-semibold text-espresso-800 mb-1">Language & Region</h2>
                <p className="text-[13px] text-espresso-600 mb-6">Set your preferred language and regional formats.</p>

                <div className="border-t border-espresso-250 pt-5">
                  <h3 className="text-[13px] font-semibold text-espresso-800 mb-3">Language</h3>
                  <div className="flex flex-wrap gap-2.5 mb-6">
                    {LANGUAGES.map((lang) => (
                      <Button
                        key={lang.code}
                        variant={language === lang.code ? 'dark' : 'outline'}
                        className="text-[13px] font-medium rounded-full px-4 py-2"
                        onClick={() => setLanguage(lang.code)}
                      >
                        {lang.label}
                      </Button>
                    ))}
                  </div>

                  <h3 className="text-[13px] font-semibold text-espresso-800 mb-3">Currency</h3>
                  <div className="flex flex-wrap gap-2.5 mb-3">
                    {CURRENCIES.map((code) => (
                      <Button
                        key={code}
                        variant={currency === code ? 'dark' : 'outline'}
                        className="text-[13px] font-medium rounded-full px-4 py-2"
                        onClick={() => setCurrency(code)}
                      >
                        {code}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-espresso-600">Times always shown in Asia/Bangkok.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
