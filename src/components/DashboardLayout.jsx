import { Link, useLocation } from 'react-router-dom'
import {
  Search,
  LayoutGrid,
  List,
  Plus,
  Bell,
  LayoutDashboard,
  Lock,
  Users,
  CalendarRange,
  Settings,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Vault', icon: Lock, path: '/dashboard/vault' },
  { label: 'Family', icon: Users, path: '/dashboard/family' },
  { label: 'Planning', icon: CalendarRange, path: '/dashboard/planning' },
  { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
]

export default function DashboardLayout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Top Navbar ── */}
      <header className="h-[60px] xl:h-[64px] border-b border-black/[0.08] bg-white flex items-center px-5 xl:px-8 gap-4 xl:gap-5 shrink-0 z-30">
        {/* Logo */}
        <Link to="/" className="shrink-0 mr-2">
          <img src="/logo.svg" alt="WhiteSwan" className="h-5 xl:h-6" />
        </Link>

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#f6f3ef] rounded-lg px-3 xl:px-4 py-[6px] xl:py-[8px] w-full max-w-[260px] xl:max-w-[320px]">
          <Search size={15} className="text-espresso-400 shrink-0" strokeWidth={1.8} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-espresso-700 placeholder:text-espresso-400 w-full font-sans"
          />
          <div className="flex items-center gap-[3px] shrink-0">
            <kbd className="text-[10px] bg-white border border-black/[0.12] rounded px-[5px] py-[1px] text-espresso-500 font-sans leading-tight">⌘</kbd>
            <kbd className="text-[10px] bg-white border border-black/[0.12] rounded px-[5px] py-[1px] text-espresso-500 font-sans leading-tight">K</kbd>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* View toggles */}
        <div className="hidden sm:flex items-center gap-1 border border-black/[0.1] rounded-lg p-[3px]">
          <button className="p-[5px] rounded bg-espresso-800 text-white" aria-label="Grid view">
            <LayoutGrid size={14} strokeWidth={1.8} />
          </button>
          <button className="p-[5px] rounded text-espresso-400 hover:text-espresso-600 transition-colors" aria-label="List view">
            <List size={14} strokeWidth={1.8} />
          </button>
        </div>

        {/* Add button */}
        <button className="flex items-center gap-1.5 bg-espresso-800 text-cream-50 text-sm font-medium px-4 py-[7px] rounded-lg hover:bg-espresso-700 transition-colors cursor-pointer border-none">
          <Plus size={15} strokeWidth={2} />
          Add
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-espresso-600 hover:text-espresso-800 transition-colors bg-transparent border-none cursor-pointer" aria-label="Notifications">
          <Bell size={18} strokeWidth={1.6} />
          <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-amber-500 rounded-full border-2 border-white" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-black/[0.08]">
          <img
            src="/avatar-somchai.png"
            alt="Somchai"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-espresso-100"
          />
          <span className="hidden sm:block text-sm font-medium text-espresso-700">Somchai</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        <aside className="w-[200px] xl:w-[240px] shrink-0 border-r border-black/[0.08] bg-white pt-6 xl:pt-8 pb-4 px-4 xl:px-5 hidden md:flex flex-col">
          <p className="text-[10px] xl:text-[11px] font-semibold tracking-[0.14em] text-espresso-400 uppercase mb-3 xl:mb-4 px-2">
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
        <main className="flex-1 overflow-y-auto bg-[#faf8f5] p-6 lg:p-8 xl:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
