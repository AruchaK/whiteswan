import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-200 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/">
          <img className="w-48" src="/logo.svg" alt="logo" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex font-poppins items-center gap-8">
          <Link
            to="/about"
            className="text-md text-espresso-900 no-underline hover:opacity-70 transition-opacity"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-md text-espresso-900 no-underline hover:opacity-70 transition-opacity"
          >
            Contact us
          </Link>
          <button className="flex items-center gap-1 text-md text-espresso-900 hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer p-0">
            English
            <ChevronDown size={13} strokeWidth={1.8} />
          </button>
          <Link
            to="/login"
            className="text-md bg-espresso-950 text-cream-200 px-[22px] py-[9px] rounded-md no-underline hover:bg-espresso-900 transition-colors"
          >
            Log in
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-espresso-950 bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-cream-200 border-t border-black/[0.06] ${menuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          <Link
            to="/about"
            className="text-sm text-espresso-900 py-2 no-underline"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <a
            href="#contact"
            className="text-sm text-espresso-900 py-2 no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Contact us
          </a>
          <Link
            to="/login"
            className="text-sm bg-espresso-950 text-cream-200 text-center py-2.5 rounded-md no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Log in
          </Link>
        </div>
      </div>
    </nav>
  )
}