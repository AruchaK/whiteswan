import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    number: '1',
    title: 'Clarify wishes',
    subtitle: 'Make important decisions before they become urgent.',
    paragraphs: [
      'A thoughtful, guided conversation to understand where you are in life and to surface what matters most to you.',
    ],
  },
  {
    number: '2',
    title: 'Thoughtfully plan',
    subtitle: 'Keep everything securely stored and accessible.',
    paragraphs: [
      'The documents. The wishes. The intentions you want the people you love to inherit — clearly expressed, before the moment arrives.',
      'Where deeper expertise is needed (legal, financial, medical, etc.), we bring the right people to you.',
    ],
  },
  {
    number: '3',
    title: 'Preserve stories',
    subtitle: 'Pass on more than assets. Leave clarity, not confusion.',
    paragraphs: [
      'Everything you have built — your plan, your wishes, your story — lives in one secure, beautifully organized digital home. Ready for you. Ready for your loved ones. There when it matters most.',
    ],
  },
]

export default function Features() {
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
    <section ref={ref} id="features" className="relative py-24 sm:py-32 lg:py-40 px-6 overflow-hidden">
      {/* Blurred background image */}
      <img
        src="/aboutimg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'blur(12px)', transform: 'scale(1.05)' }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-espresso-950"
        style={{ opacity: 0.78 }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
          <p className="text-[16px] tracking-[0.3em] uppercase text-mist-100 mb-5 font-medium">
            WHAT WE HELP YOU DO
          </p>
          <h2 className="font-poppins text-3xl sm:text-3xl lg:text-4xl text-cream-100 font-light leading-snug">
            A private planning experience for life, legacy,
            <br className="hidden sm:block" />
            and family peace of mind.
          </h2>
          <p className="mt-6 font-poppins text-cream-300/60 text-[16px] max-w-3xl mx-auto leading-relaxed">
            WhiteSwan brings structure to conversations that are often difficult to begin. Through
            a thoughtful guided process, we help you reflect, organize, document, and prepare.
          </p>
        </div>

        {/* Three step cards with arrows */}
        <div className="flex fonts-poppins gap-4 flex-col lg:flex-row items-stretch justify-center gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-stretch">
              {/* Card */}
              <div
                className={`flex-1 text-center px-8 py-10 lg:px-10 lg:py-12 border rounded-xl border-cream-400/10 transition-all duration-700 ${visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                  }`}
                style={{
                  transitionDelay: visible ? `${(i + 1) * 200}ms` : '0ms',
                  backgroundColor: 'rgba(26, 17, 12, 0.45)',
                  backdropFilter: 'blur(8px)',
                  minWidth: '280px',
                  maxWidth: '500px'
                }}
              >
                {/* Step number */}
                <p className="text-gold-400 font-serif text-lg mb-3">{step.number}</p>

                {/* Title */}
                <h3 className=" text-2xl sm:text-3xl text-cream-100 mb-4">
                  {step.title}
                </h3>

                {/* Subtitle */}
                <p className="text-gold-400 italic text-md mb-5 font-medium">
                  {step.subtitle}
                </p>

                {/* Description paragraphs */}
                <div className="space-y-4">
                  {step.paragraphs.map((p, j) => (
                    <p key={j} className="text-cream-300/60 text-sm leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Arrow between cards */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center px-5">
                  <span className="text-cream-400/40 text-2xl">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
