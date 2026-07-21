export default function Hero() {
  return (
    <section className="relative min-h-screen  flex items-center overflow-hidden bg-sand-600">


      <img
        src="/heroimg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[90%_-60%] md:object-[center_-60%]"
      />


      {/* Soft left-side overlay so text stays legible over any photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(205,188,168,0.55) 0%, rgba(205,188,168,0.25) 55%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content — left-aligned, sitting in the left ~half of the screen */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-24">
        <div className="max-w-[580px]">

          {/* Eyebrow label */}
          <p className="text-[14px] lg:text-lg tracking-[0.28em] uppercase text-espresso-700 font-medium mb-5">
            A Life &amp; Legacy Planning Experience
          </p>

          {/* Main headline */}
          <h1
            className="font-serif text-[44px] sm:text-[45px] lg:text-[54px] font-medium leading-[1.13] text-espresso-950 mb-2"
          >
            For the life you've lived,<br />
            And the love you'll leave behind.
          </h1>

          <p className="mb-9 text-espresso-900">
            WhiteSwan helps individuals and families organize important decisions, wishes, documents, and stories before a crisis happens.
          </p>

          {/* CTA buttons */}
          <div className="flex font-poppins flex-col sm:flex-row gap-4">
            <a
              href="#begin"
              className="inline-flex items-center justify-center bg-espresso-950 text-cream-200 text-[14px] font-normal px-7 py-3.25 rounded-full no-underline hover:bg-espresso-900 transition-colors whitespace-nowrap"
            >
              Start Your Life Readiness Compass
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center border border-none bg-white text-espresso-950 text-[14px] font-normal px-7 py-3.25 rounded-full no-underline hover:bg-espresso-950/5 hover:border-espresso-950/60 transition-all whitespace-nowrap"
            >
              Explore services
            </a>
          </div>

        </div>
      </div>

    </section>
  )
}