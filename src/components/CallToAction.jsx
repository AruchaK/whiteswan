import { useEffect, useRef, useState } from 'react'

export default function CallToAction() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.25 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="cta"
      className="relative min-h-screen flex items-center overflow-hidden font-poppins"
    >
      {/* Background Image covering the entire section */}
      <img
        src="/callimg.png"
        alt="A man sitting peacefully looking out at the ocean"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Solid Semi-transparent Overlay Panel with a sharp vertical edge and backdrop blur */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[45%] backdrop-blur-md"
        style={{ backgroundColor: 'rgba(64, 58, 54, 0.82)' }}
        aria-hidden="true"
      />

      {/* Left — Text Panel */}
      <div
        className={`relative z-10 w-full lg:w-[45%] px-10 py-24 sm:px-16 lg:px-20 flex flex-col justify-center min-h-screen transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
      >
        <div className="w-full text-center">
          <h2 className="font-sans text-[32px] sm:text-[36px] text-cream-100 font-light leading-snug tracking-wide mb-10">
            There is never a perfect moment.<br />
            There is only the one you choose.
          </h2>

          <p className="text-cream-300/80 text-[15px] leading-relaxed mb-16 max-w-[420px] mx-auto">
            Life's most important transitions rarely announce themselves. The diagnosis. The sudden loss. The moment your family needs answers — and finds the gift of clarity that you have beautifully prepared.
          </p>

          <p className="text-cream-100 text-[17px] tracking-wide font-light mb-8">
            Begin your plan. Leave something beautiful.
          </p>

          <a
            href="#begin"
            id="cta-book"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#d6cdc2] text-espresso-900 text-[15px] font-medium rounded-full transition-all duration-500 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 no-underline"
          >
            Begin a conversation
          </a>
        </div>
      </div>
    </section>
  )
}
