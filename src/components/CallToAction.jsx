import { useEffect, useRef, useState } from 'react'

export default function   CallToAction() {
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
        <div className="w-full">
          <h2
            className="text-[16px] tracking-[0.25em] uppercase font-medium mb-4 text-mist-100"
          >
            BEGIN GENTLY
          </h2>
          <h2 className=" text-[32px] sm:text-[36px] text-cream-100 font-light leading-snug tracking-wide mb-4">
            The best time to prepare <br />
            is <em>before</em> you need to.
          </h2>

          <p className="text-mist-200 text-[20px] leading-relaxed mb-16">
           A thoughtful plan today can <br /> bring clarity and peace of mind <br />tomorrow.
          </p>

        <div className="flex flex-col gap-4">
          <a
            href=""
            id="cta-book"
            className="w-fit inline-flex items-center justify-center px-8 py-3 bg-white text-espresso-900 text-[15px] font-medium rounded-full transition-all duration-500 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 no-underline"
          >
            Start your life readiness compass
          </a>
          <a
            href=""
            id="cta-book"
            className="w-fit inline-flex items-center justify-center px-8 py-3 bg-sand-400 text-espresso-900 text-[15px] font-medium rounded-full transition-all duration-500 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 no-underline"
          >
            Speak to a WhiteSwan advisor
          </a>
            
        </div>
        </div>
      </div>
    </section>
  )
}
