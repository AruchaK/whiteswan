export default function Hero() {
  return (
    <section className="relative min-h-screen  flex items-center overflow-hidden bg-[#c9b8a2]">


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
          <p className="text-[11px] lg:text-lg tracking-[0.28em] uppercase text-[#5c4530] font-medium mb-5">
            A Life &amp; Legacy Planning Experience
          </p>

          {/* Main headline */}
          <h1
            className="font-serif text-[44px] sm:text-[50px] lg:text-[54px] font-medium leading-[1.13] text-[#1a1208] mb-9"
          >
            For the life you've lived,<br />
            And the love you'll leave behind.
          </h1>

          {/* CTA buttons */}
          <div className="flex font-poppins flex-col sm:flex-row gap-4">
            <a
              href="#begin"
              className="inline-flex items-center justify-center bg-[#1a1208] text-[#f5f0eb] text-[14px] font-normal px-7 py-[13px] rounded-full no-underline hover:bg-[#2e2010] transition-colors whitespace-nowrap"
            >
              Begin a conversation
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center border border-[#1a1208]/40 text-[#1a1208] text-[14px] font-normal px-7 py-[12px] rounded-full no-underline hover:bg-[#1a1208]/5 hover:border-[#1a1208]/60 transition-all whitespace-nowrap"
            >
              Explore services
            </a>
          </div>

        </div>
      </div>

    </section>
  )
}