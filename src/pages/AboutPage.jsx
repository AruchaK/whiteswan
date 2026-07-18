import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
    >
      {children}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundImage: 'url(/about-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto">

        {/* ── HEADER ── */}
        <FadeIn className="text-center mb-6">
          <h1
            className="text-xl uppercase font-medium text-espresso-800"
          >
            About Whiteswan
          </h1>
        </FadeIn>

        {/* ── INTRO BLOCK ── */}
        <FadeIn delay={100} className="text-center mb-6">
          <p className="text-[1.1rem] leading-relaxed text-espresso-800 font-medium">
            We believe thoughtful preparation is one of the greatest gifts<br />
            we can leave to the people we love.
          </p>
        </FadeIn>

        <FadeIn delay={200} className="text-center mb-5">
          <p className="text-[0.9rem] leading-relaxed text-espresso-700">
            We spend years building meaningful lives.
          </p>
        </FadeIn>

        <FadeIn delay={300} className="mb-4  text-center">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            We invest in our health, nurture relationships, pursue careers, create homes, raise families, and collect <br />
            experiences that shape who we are. We plan for milestones, opportunities, and the future we hope to create.
          </p>
        </FadeIn>

        <FadeIn delay={400} className="mb-4  text-center">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            Yet many of life&apos;s most important decisions, wishes, and conversations remain unspoken until a crisis arrives.
          </p>
        </FadeIn>

        <FadeIn delay={500} className="mb-10 text-center">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            WhiteSwan was created to help individuals and families bring clarity to what matters most — so that when <br />
            life changes, those we care about are not left carrying uncertainty alone.
          </p>
        </FadeIn>

        {/* ── DIVIDER ── */}
        <FadeIn delay={550}>
          <hr className="border-t border-espresso-300/60 mb-12" />
        </FadeIn>

        {/* ── THE PROBLEM WE SEE ── */}
        <FadeIn delay={600} className="mb-4">
          <p
            className="uppercase text-[#493225] font-medium text-md"
          >
            The Problem We See
          </p>
        </FadeIn>

        <FadeIn delay={700} className="mb-5">
          <h2 className="text-[1.6rem] leading-snug font-medium text-espresso-900">
            Too many families are forced to make important decisions without guidance.
          </h2>
        </FadeIn>

        <FadeIn delay={800} className="mb-4">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            Some of life&apos;s most significant moments arrive without warning.
          </p>
        </FadeIn>

        <FadeIn delay={850} className="mb-4">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            An unexpected illness. A medical emergency. A difficult diagnosis. The loss of someone we love.
          </p>
        </FadeIn>

        <FadeIn delay={900} className="mb-4">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            In these moments, families are often asked to make important decisions while carrying immense
            emotional weight. Wishes may be unclear. Documents may be difficult to find. Responsibilities may
            be uncertain. Conversations that mattered simply never happened.
          </p>
        </FadeIn>

        <FadeIn delay={950} className="mb-2">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            The burden of these moments is unavoidable.
          </p>
        </FadeIn>

        <FadeIn delay={1000} className="mb-12">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            The confusion surrounding them does not have to be.
          </p>
        </FadeIn>

        {/* ── DIVIDER before OUR APPROACH ── */}
        <FadeIn delay={1050}>
          <hr className="border-t border-espresso-300/60 mb-12" />
        </FadeIn>

        {/* ── OUR APPROACH ── */}
        <FadeIn delay={1100} className="mb-4">
          <p className="uppercase text-[#493225] font-medium text-md">
            Our Approach
          </p>
        </FadeIn>

        <FadeIn delay={1150} className="mb-6">
          <h2 className="text-[1.6rem] leading-snug font-medium text-espresso-900">
            We are not just planning for death. We are planning for life.
          </h2>
        </FadeIn>

        {/* Comparison rows */}
        {[
          { italic: 'Most services focus on documents.', bold: 'We help clarify decisions.' },
          { italic: 'Most services focus on assets.', bold: 'We help preserve stories, values, and wishes.' },
          { italic: 'Most services start during a crisis.', bold: 'We help families prepare beforehand.' },
        ].map(({ italic, bold }, i) => (
          <FadeIn key={i} delay={1200 + i * 50} className="mb-4">
            <p className="text-[0.88rem] leading-relaxed text-espresso-600 italic">{italic}</p>
            <p className="text-[0.88rem] leading-relaxed text-espresso-800 font-semibold">{bold}</p>
          </FadeIn>
        ))}

        {/* Life Readiness subsection */}
        <FadeIn delay={1360} className="mt-8 mb-4">
          <h3 className="text-[1.25rem] leading-snug font-medium text-espresso-900">
            What we mean by Life Readiness.
          </h3>
        </FadeIn>

        <FadeIn delay={1410} className="mb-4">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            We believe true preparation extends beyond any single document or decision.
            It is the confidence that the people, information, and conversations that matter
            most have been thoughtfully considered.
          </p>
        </FadeIn>

        <FadeIn delay={1450} className="mb-6">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            Our approach is built around five dimensions of life readiness:
          </p>
        </FadeIn>

        {[
          { label: 'Medical', desc: 'Preparing healthcare preferences, care wishes, and trusted decision-makers.' },
          { label: 'Legal', desc: 'Clarifying important documents, instructions, and responsibilities.' },
          { label: 'Financial', desc: 'Organizing financial information, assets, and practical matters.' },
          { label: 'Personal', desc: 'Capturing values, reflections, stories, and what gives life meaning.' },
          { label: 'Family & Social', desc: 'Strengthening communication, roles, and shared understanding among loved ones.' },
        ].map(({ label, desc }, i) => (
          <FadeIn key={label} delay={1490 + i * 50} className="mb-3">
            <p className="text-[0.88rem] font-semibold text-espresso-800">{label}</p>
            <p className="text-[0.88rem] leading-relaxed text-espresso-700">{desc}</p>
          </FadeIn>
        ))}

        {/* ── DIVIDER before WHY WE EXIST ── */}
        <FadeIn delay={1750}>
          <hr className="border-t border-espresso-300/60 my-12" />
        </FadeIn>

        {/* ── WHY WE EXIST ── */}
        <FadeIn delay={1800} className="mb-4">
          <p className="uppercase text-[#493225] font-medium text-md">
            Why We Exist
          </p>
        </FadeIn>

        <FadeIn delay={1850} className="mb-5">
          <h2 className="text-[1.6rem] leading-snug font-medium text-espresso-900">
            Because love alone is not always enough.
          </h2>
        </FadeIn>

        <FadeIn delay={1900} className="mb-4">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            When difficult moments arrive, families often need more than good intentions. They need
            clarity. They need guidance. They need conversations that were started before they became
            urgent.
          </p>
        </FadeIn>

        <FadeIn delay={1950} className="mb-10">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            WhiteSwan exists to help make those conversations possible.
          </p>
        </FadeIn>

        <FadeIn delay={2000} className="mb-5">
          <h3 className="text-[1.25rem] leading-snug font-medium text-espresso-900">
            The future we hope for.
          </h3>
        </FadeIn>

        <FadeIn delay={2050} className="mb-4">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            A future where preparation is seen not as a response to crisis, but as a natural part of living well.
          </p>
        </FadeIn>

        <FadeIn delay={2100} className="mb-4">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700">
            Where families inherit not only assets, but stories, values, and understanding.
          </p>
        </FadeIn>

        <FadeIn delay={2150} className="mb-12">
          <p className="text-[0.88rem] leading-relaxed text-espresso-700 font-medium">
            Where important wishes are known, loved ones feel supported, and no family is left navigating
            uncertainty alone.
          </p>
        </FadeIn>

      </main>

      <Footer />
    </div>
  )
}

