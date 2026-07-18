import { useEffect, useRef, useState } from 'react'

const dimensions = [
    {
        numeral: 'I',
        title: 'Legal',
        description:
            'Organize wills, directives, powers of attorney, family records, and key legal information — with the right professional support when needed.',
    },
    {
        numeral: 'II',
        title: 'Medical',
        description:
            'Clarify preferences for care, decision-making, comfort, and the people you trust to speak on your behalf — so the people who love you never have to guess.',
    },
    {
        numeral: 'III',
        title: 'Financial',
        description:
            'Create a clear overview of your accounts, insurance policies, obligations, assets, and the information your family may one day need.',
    },
    {
        numeral: 'IV',
        title: 'Personal',
        description:
            'Capture the values you hold and the memories that shaped you — a living inheritance, in your own words, far more lasting than any possession.',
    },
    {
        numeral: 'V',
        title: 'Family',
        description:
            'Prepare thoughtful guidance around family roles, communication, rituals, and what should happen when the time comes. Lovingly recorded, there when needed.',
    },
]

export default function Plan() {
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
            id="plan"
            className="bg-slate-800 py-20 sm:py-28 lg:py-32 overflow-hidden"
        >
            <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                {/* Header */}
                <div className={`mb-14 transition-all flex flex-col items-center duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}>
                    <p className="text:xl lg:text-[18px] tracking-[0.25em] uppercase text-mist-200 mb-4 font-medium">
                        A COMPLETE FRAMEWORK FOR A LIFE’S PREPARATION
                    </p>
                    <h2 className="font-poppins text-2xl lg:text-4xl text-cream-100 font-light leading-snug mt-4 mb-8">
                        Life readiness is knowing that the important things are in place.
                    </h2>
                    <p className="text-white font-poppins text-lg sm:text-2xl font-light">
                        Five dimensions of a life thoughtfully prepared for.
                    </p>
                </div>

                {/* Scrollable cards row */}
                <div
                    className="flex gap-5 overflow-x-auto pb-6 font-poppins"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {dimensions.map((dim, i) => (
                        <div
                            key={dim.numeral}
                            className={`flex-shrink-0 w-[280px] sm:w-[300px] rounded-2xl p-7 sm:p-8 flex flex-col bg-white/80 transition-all duration-700 ${visible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                            style={{
                                transitionDelay: visible ? `${(i + 1) * 150}ms` : '0ms',
                            }}
                        >
                            {/* Numeral badge */}
                            <div
                                className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-8 text-espresso-800 text-sm font-medium shadow-sm"
                                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
                            >
                                {dim.numeral}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl sm:text-3xl text-espresso-900 mb-4 font-medium">
                                {dim.title}
                            </h3>

                            {/* Description */}
                            <p className="text-espresso-700 text-[14px] font-medium  leading-relaxed">
                                {dim.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hide scrollbar */}
            <style>{`
        #plan .flex::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    )
}
