import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import './SettingsPage.css'

/* ── Section definitions ── */
const sections = ['Account', 'Notifications', 'Privacy & Sharing', 'Language & Region']

/* ── Mock user data ── */
const initialForm = {
  fullName: 'Somchai Jaidee',
  email: 'somchai.jaidee@gmail.com',
  phone: '+66 90 123 4567',
  twoFactor: false,
}

/* ── Page ── */
export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('Account')
  const [form, setForm] = useState(initialForm)

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-in">

        {/* ─ Header ─ */}
        <section>
          <p className="text-[10px] font-bold tracking-[0.16em] text-espresso-400 uppercase mb-2">
            Preferences
          </p>
          <h1 className="text-[28px] sm:text-[36px] font-serif font-semibold text-espresso-900 leading-tight mb-2">
            Settings.
          </h1>
          <p className="text-[14px] text-espresso-500 leading-relaxed">
            Manage your account, notifications, privacy and regional preferences.
          </p>
        </section>

        {/* ─ Settings card ─ */}
        <div className="settings-card">
          {/* Sections nav */}
          <div className="settings-sections">
            <p className="settings-sections-label">Sections</p>
            <nav>
              {sections.map((section) => (
                <button
                  key={section}
                  className={`settings-section-item ${activeSection === section ? 'active' : ''}`}
                  onClick={() => setActiveSection(section)}
                >
                  {section}
                </button>
              ))}
            </nav>
          </div>

          {/* Content area */}
          <div className="settings-content">
            {activeSection === 'Account' && (
              <>
                <h2 className="settings-content-title">Account</h2>
                <p className="settings-content-subtitle">Update your personal details and security.</p>

                {/* Avatar */}
                <div className="settings-avatar-row">
                  <img
                    src="/avatar-somchai.png"
                    alt="Somchai Jaidee"
                    className="settings-avatar"
                  />
                  <button className="settings-avatar-btn">Change avatar</button>
                </div>

                {/* Form fields — 2 columns */}
                <div className="settings-form-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">Full Name</label>
                    <input
                      type="text"
                      className="settings-form-input"
                      value={form.fullName}
                      onChange={handleChange('fullName')}
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">Email Address</label>
                    <input
                      type="email"
                      className="settings-form-input"
                      value={form.email}
                      onChange={handleChange('email')}
                    />
                  </div>
                </div>

                {/* Phone — single column */}
                <div className="settings-form-group" style={{ maxWidth: 'calc(50% - 10px)' }}>
                  <label className="settings-form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="settings-form-input"
                    value={form.phone}
                    onChange={handleChange('phone')}
                  />
                </div>

                {/* Security */}
                <div className="settings-security">
                  <h3 className="settings-security-title">Security</h3>
                  <div className="settings-2fa-row">
                    <div>
                      <p className="settings-2fa-label">Two-factor authentication</p>
                      <p className="settings-2fa-desc">Adds a one-time code on every new sign-in.</p>
                    </div>
                    <label className="settings-toggle">
                      <input
                        type="checkbox"
                        checked={form.twoFactor}
                        onChange={(e) => setForm((prev) => ({ ...prev, twoFactor: e.target.checked }))}
                      />
                      <span className="settings-toggle-track" />
                      <span className="settings-toggle-thumb" />
                    </label>
                  </div>
                </div>

                {/* Save */}
                <button className="settings-save-btn">Save changes</button>
              </>
            )}

            {activeSection === 'Notifications' && (
              <>
                <h2 className="settings-content-title">Notifications</h2>
                <p className="settings-content-subtitle">Choose how and when you receive updates.</p>
                <p className="text-[13px] text-espresso-400 italic mt-8">Coming soon — notification preferences will appear here.</p>
              </>
            )}

            {activeSection === 'Privacy & Sharing' && (
              <>
                <h2 className="settings-content-title">Privacy & Sharing</h2>
                <p className="settings-content-subtitle">Control who can access your vault and documents.</p>
                <p className="text-[13px] text-espresso-400 italic mt-8">Coming soon — privacy settings will appear here.</p>
              </>
            )}

            {activeSection === 'Language & Region' && (
              <>
                <h2 className="settings-content-title">Language & Region</h2>
                <p className="settings-content-subtitle">Set your language, timezone and date format.</p>
                <p className="text-[13px] text-espresso-400 italic mt-8">Coming soon — regional preferences will appear here.</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─ Floating widget ─ */}
      <div className="settings-floating-widget hidden lg:block">
        <p className="text-[9px] font-bold tracking-[0.18em] text-espresso-500 uppercase mb-2">Preparedness</p>
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-[28px] font-serif font-semibold text-espresso-900 leading-none">44%</span>
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
