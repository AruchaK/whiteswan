import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Search,
  Plus,
  Bell,
  LayoutDashboard,
  Lock,
  Users,
  CalendarRange,
  Settings,
  Menu,
  X,
} from 'lucide-react'
import Button from './ui/Button'
import FloatingPreparednessWidget from './ui/FloatingPreparednessWidget'
import Toast from './ui/Toast'
import NewTaskDialog from './NewTaskDialog'
import { currentUser } from '../lib/currentUser'
import { overallPreparedness } from '../lib/readiness'
import { addTask } from '../lib/addedTasksStore'
import { PILLARS_BY_KEY } from '../lib/pillars'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Vault', icon: Lock, path: '/dashboard/vault' },
  { label: 'Family', icon: Users, path: '/dashboard/family' },
  { label: 'Planning', icon: CalendarRange, path: '/dashboard/planning' },
  { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
]

export default function AppLayout({ children }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const searchRef = useRef(null)

  // ⌘K / Ctrl+K focuses search, so the keyboard hint in the field is truthful.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Global "Add" files a task into the shared store and confirms where it went.
  const handleAddTask = (task) => {
    addTask(task)
    const pillar = PILLARS_BY_KEY[task.pillar]
    setToast({
      message: `Task added to ${pillar.label} planning`,
      action: { label: 'View', to: `/dashboard/planning/${task.pillar}` },
    })
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* ── Top Navbar ── */}
      <header className="h-15 xl:h-20 border-b border-espresso-250 bg-white flex items-center px-5 xl:px-8 gap-2 md:gap-4 xl:gap-5 shrink-0 z-30">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 -ml-2 text-espresso-700 bg-transparent border-none cursor-pointer shrink-0"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <Link to="/" className="shrink-0 mr-2">
          <img src="/logo.svg" alt="WhiteSwan" className="h-5 xl:h-10" />
        </Link>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-cream-150 rounded-lg px-3 xl:px-4 py-1.5 xl:py-3 w-full max-w-65 xl:max-w-80">
          <Search size={15} className="text-espresso-600 shrink-0" strokeWidth={1.8} />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-espresso-700 placeholder:text-espresso-600 w-full font-sans"
          />
          <div className="flex items-center gap-0.75 shrink-0">
            <kbd className="text-[10px] bg-white border border-black/12 rounded px-1.25 py-px text-espresso-600 font-sans leading-tight">⌘</kbd>
            <kbd className="text-[10px] bg-white border border-black/12 rounded px-1.25 py-px text-espresso-600 font-sans leading-tight">K</kbd>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Add button — opens the task dialog */}
        <Button
          type="button"
          variant="dark"
          onClick={() => setTaskDialogOpen(true)}
          className="flex items-center gap-1.5 text-sm font-medium px-2 lg:px-4 py-2 lg:py-3 rounded-lg border-none"
        >
          <Plus size={15} strokeWidth={2} />
          <span className="hidden sm:inline">Add</span>
        </Button>

        {/* Notifications — disabled until there's a backend to surface them */}
        <button
          type="button"
          disabled
          title="Notifications are coming soon"
          className="relative p-2 text-espresso-400 bg-transparent border-none cursor-not-allowed"
          aria-label="Notifications (coming soon)"
        >
          <Bell size={20} strokeWidth={1.6} />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-2 border-espresso-250">
          <img
            src={currentUser.avatar}
            alt={currentUser.firstName}
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover ring-2 ring-espresso-100"
          />
          <span className="hidden sm:block text-md font-medium text-espresso-700">{currentUser.firstName}</span>
        </div>
      </header>

      {/* ── Mobile nav drawer ── */}
      {menuOpen && (
        <nav className="md:hidden border-b border-espresso-250 bg-white px-4 py-3 flex flex-col gap-0.5 z-20">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[14.5px] font-medium no-underline transition-all duration-150 ${
                  isActive
                    ? 'bg-espresso-800 text-cream-50 shadow-sm'
                    : 'text-espresso-600 hover:bg-espresso-50 hover:text-espresso-800'
                }`}
              >
                <Icon size={17} strokeWidth={isActive ? 2 : 1.6} />
                {label}
              </Link>
            )
          })}
        </nav>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar (desktop) ── */}
        <aside className="w-50 xl:w-60 shrink-0 border-r border-espresso-250 bg-white pt-6 xl:pt-8 pb-4 px-4 xl:px-5 hidden md:flex flex-col overflow-y-auto">
          <p className="text-[10px] xl:text-[11px] font-semibold tracking-[0.14em] text-espresso-600 uppercase mb-3 xl:mb-4 px-2">
            Navigation
          </p>
          <nav className="flex flex-col gap-0.5 xl:gap-1">
            {navItems.map(({ label, icon: Icon, path }) => {
              const isActive = location.pathname === path
              return (
                <Link
                  key={path}
                  to={path}
                  className={`
                    flex items-center gap-2.5 xl:gap-3 px-3 xl:px-4 py-2 xl:py-2.5 rounded-lg text-[13.5px] xl:text-[14.5px] font-medium no-underline transition-all duration-150
                    ${isActive
                      ? 'bg-espresso-800 text-cream-50 shadow-sm'
                      : 'text-espresso-600 hover:bg-espresso-50 hover:text-espresso-800'
                    }
                  `}
                >
                  <Icon size={17} strokeWidth={isActive ? 2 : 1.6} />
                  {label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto bg-cream-50 p-6 lg:p-8 xl:p-10">
          {children}
        </main>
      </div>

      <FloatingPreparednessWidget preparedness={overallPreparedness} />

      {taskDialogOpen && (
        <NewTaskDialog onClose={() => setTaskDialogOpen(false)} onSave={handleAddTask} />
      )}
      {toast && (
        <Toast message={toast.message} action={toast.action} onDismiss={() => setToast(null)} />
      )}
    </div>
  )
}
