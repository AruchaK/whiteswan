import { useEffect, useRef, useState } from 'react'

export default function Tagline() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="tagline"
      className="relative py-32 sm:py-40 lg:py-48 bg-white px-6 overflow-hidden flex items-center justify-center min-h-[50vh]"
    >
      {/* Background Watermark Text */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-serif uppercase tracking-widest font-medium text-black/10"
          style={{ fontSize: 'clamp(5rem, 15vw, 6rem)', lineHeight: 1 }}
        >
          WhiteSwan
        </span>
      </div>

      {/* Foreground Content */}
      <div
        className={`relative font-poppins z-10 flex flex-col items-center text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
      >
        {/* Top Divider */}
        <div className="w-24 h-px bg-espresso-800 mb-8" />

        {/* Main tagline */}
        <h2 className="text-[28px] sm:text-[36px] lg:text-[52px] text-espresso-900 font-light leading-snug tracking-wide">
          You've spent a lifetime building what matters.
        </h2>

        {/* Sub text */}
        <p className="text-[20px] sm:text-[24px] lg:text-[32px] text-espresso-800 font-normal italic leading-snug tracking-wide mt-4">
          WhiteSwan helps you make sure it's not lost.
        </p>

        {/* Bottom Divider */}
        <div className="w-24 h-px bg-espresso-800 mt-8" />
      </div>
    </section>
  )
}
