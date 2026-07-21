import { useEffect, useRef, useState } from 'react'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="about"
      className="bg-cream-50"
    >
      <div className="grid lg:grid-cols-2 min-h-screen w-full">
        {/* Left — Image */}
        <div className={`relative overflow-hidden transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
          <img
            src="/aboutimg.png"
            alt="A couple sitting together on a couch, sharing a quiet, warm moment"
            className="w-full h-full object-cover"
            style={{ minHeight: '480px' }}
          />
        </div>

        {/* Right — Content */}
        <div className={`flex flex-col font-sans justify-center px-8 py-16 sm:px-12 lg:px-16 lg:py-20 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
          {/* Section title */}
          <h2
            className="text-[20px] font-sans tracking-[0.25em] uppercase font-medium mb-3 text-espresso-750"
          >
            The Quite Truth
          </h2>

          {/* First paragraph */}
          <div className="mb-8 text-[45px] lg:text-[54px] text-espresso-800">
            Most families are unprepared <br /> for life’s difficult moments.
          </div>


          {/* Second paragraph */}
          <div className="space-y-4 mb-8 text-[20px] leading-relaxed text-espresso-800">
            <p>
              When illness, incapacity, or loss happens <br /> unexpectedly, important wishes, documents, <br /> and responsibilities are often unclear.
            </p>
            <p>
              Families are left making difficult decisions <br /> without guidance.
            </p>
          </div>

          {/* Italic emphasis */}
          <p className="mb-10 text-[20px] font-medium text-espresso-800">
            WhiteSwan helps you prepare before that <br /> day comes.
          </p>

        </div>
      </div>
    </section>
  )
}
