import { useEffect, useRef, useState } from 'react'

export default function Quote() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="quote"
      className="bg-cream-50"
    >
      <div className="grid lg:grid-cols-2">
        {/* Left — Quote text */}
        <div
          className={`flex flex-col justify-center items-center text-center px-10 py-20 sm:px-16 lg:px-20 lg:py-28 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ backgroundColor: '#d5c4af' }}
        >
          {/* Top line */}
          <p className="text-[17px] sm:text-[19px] text-espresso-800 leading-relaxed mb-8 max-w-lg">
            Life's most important moments rarely announce themselves,
            <br className="hidden sm:block" />
            but you can be ready for them.
          </p>

          {/* Decorative quote mark */}
          <div
            className="font-serif text-6xl leading-none mb-6"
            style={{ color: '#9c8b78' }}
            aria-hidden="true"
          >
            "
          </div>

          {/* Main quote */}
          <p className="text-[17px] sm:text-[19px] text-espresso-800 leading-relaxed max-w-lg">
            Because planning, done well, is <strong>two gifts at once:</strong>
            <br />
            <strong><em>a quieter mind</em></strong> for you and <strong><em>a softer landing</em></strong>
            <br />
            for the people you love.
          </p>
        </div>

        {/* Right — Image */}
        <div className={`relative overflow-hidden transition-all duration-1000 delay-200 ${
          visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <img
            src="/quoteimg.png"
            alt="A serene living space with natural light and greenery"
            className="w-full h-full object-cover"
            style={{ minHeight: '360px' }}
          />
        </div>
      </div>
    </section>
  )
}
