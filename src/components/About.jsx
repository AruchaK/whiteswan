import { useEffect, useRef, useState } from 'react'

export default function About() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
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
        <div className={`flex flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 lg:py-20 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
          {/* Section title */}
          <h2
            className="text-[13px] tracking-[0.25em] uppercase font-medium mb-8"
            style={{ color: '#7a5e3f' }}
          >
            An Honest Beginning
          </h2>

          {/* First paragraph */}
          <div className="space-y-1 mb-8 text-[15px] leading-relaxed text-espresso-800">
            <p>
              There's a particular kind of discomfort that visits at quiet
              moments. Not urgent. Not demanding.
            </p>
            <p>
              Just there — a soft reminder that there are things left undone.
            </p>
          </div>

          {/* Italic block */}
          <div className="mb-8 text-[15px] leading-relaxed italic text-espresso-600/80">
            <p>Conversations left unspoken.</p>
            <p>For the people you love.</p>
            <p>For when it matters.</p>
          </div>

          {/* Second paragraph */}
          <div className="mb-8 text-[15px] leading-relaxed text-espresso-800">
            <p>
              We keep putting it off. Because living always feels more urgent
              than preparing for what comes after. And because this kind of
              planning — honest, complete, and deeply personal — is not
              something life easily makes room for.
            </p>
          </div>

          {/* Italic emphasis */}
          <p className="mb-10 text-[15px] italic font-medium text-espresso-800">
            It doesn't have to feel this way.
          </p>

          {/* CTA button */}
          <a
            href="#begin"
            id="about-cta"
            className="inline-flex items-center gap-3 self-start border border-espresso-600/30 rounded-full px-7 py-3 text-[14px] text-espresso-800 no-underline transition-all hover:bg-espresso-800 hover:text-cream-100 hover:border-espresso-800"
          >
            Welcome to the journey of living and leaving with meaning
            <span className="text-[16px]">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
