export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="bg-[#222428] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top — Logo and tagline */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <div>
            <img className="w-36" src="/logo-white.svg" alt="logo" />
            <p className="text-cream-400/50 italic text-xs mt-2 tracking-wider">A Life & Legacy Planning Experience</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-espresso-800/60 mb-8" />

        {/* Bottom — Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-400/40 text-xs">
            © {currentYear} WhiteSwan. All rights reserved.
          </p>
          <p className="text-cream-400/30 text-xs">
            Privacy Policy • Terms
          </p>
        </div>
      </div>
    </footer>
  )
}
