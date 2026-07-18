import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Tagline from './components/Tagline'
import About from './components/About'
import Features from './components/Features'
import Plan from './components/Plan'
// import Quote from './components/Quote'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import AboutPage from './pages/AboutPage'
import DashboardPage from './pages/DashboardPage'
import VaultPage from './pages/VaultPage'
import SettingsPage from './pages/SettingsPage'
import FamilyPage from './pages/FamilyPage'
import FamilyAddPage from './pages/FamilyAddPage'
import FamilyTreePage from './pages/FamilyTreePage'
import PlanningPage from './pages/PlanningPage'
import PillarPlanningPage from './pages/PillarPlanningPage'

function LandingPage() {
  return (
    <div className="min-h-screen bg-cream-50 text-espresso-800 font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Plan />
        <Tagline />
        <Features />
        {/* <Quote /> */}
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/vault" element={<VaultPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/dashboard/family" element={<FamilyPage />} />
        <Route path="/family/add" element={<FamilyAddPage />} />
        <Route path="/family/tree" element={<FamilyTreePage />} />
        <Route path="/dashboard/planning" element={<PlanningPage />} />
        <Route path="/dashboard/planning/:pillar" element={<PillarPlanningPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
