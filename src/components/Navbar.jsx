import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0eb] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">

        {/* Logo */}
        <a
          href="#"
          className="font-sans text-2xl tracking-[0.18em] font-medium text-[#1a1208] no-underline"
        >
          WHITESWAN
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#about"
            className="text-sm text-[#2c1f10] no-underline hover:opacity-70 transition-opacity"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-sm text-[#2c1f10] no-underline hover:opacity-70 transition-opacity"
          >
            Contact us
          </a>
          <button className="flex items-center gap-1 text-sm text-[#2c1f10] hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer p-0">
            English
            <ChevronDown size={13} strokeWidth={1.8} />
          </button>
          <a
            href="#login"
            className="text-sm bg-[#1a1208] text-[#f5f0eb] px-[22px] py-[9px] rounded-[6px] no-underline hover:bg-[#2e2010] transition-colors"
          >
            Log in
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-[#1a1208] bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[#f5f0eb] border-t border-black/[0.06] ${menuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          <a
            href="#about"
            className="text-sm text-[#2c1f10] py-2 no-underline"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#contact"
            className="text-sm text-[#2c1f10] py-2 no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Contact us
          </a>
          <a
            href="#login"
            className="text-sm bg-[#1a1208] text-[#f5f0eb] text-center py-2.5 rounded-[6px] no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Log in
          </a>
        </div>
      </div>
    </nav>
  )
}