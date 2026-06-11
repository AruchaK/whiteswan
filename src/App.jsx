import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Tagline from './components/Tagline'
import About from './components/About'
import Features from './components/Features'
import Plan from './components/Plan'
import Quote from './components/Quote'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-cream-50 text-espresso-800 font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Tagline />
        <About />
        <Features />
        <Plan />
        <Quote />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default App
