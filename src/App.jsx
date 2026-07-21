import { Suspense, lazy } from 'react'
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
import AboutPage from './pages/AboutPage'
import DashboardPage from './pages/DashboardPage'
import VaultPage from './pages/VaultPage'
import SettingsPage from './pages/SettingsPage'
import FamilyPage from './pages/FamilyPage'
import FamilyAddPage from './pages/FamilyAddPage'
import FamilyTreePage from './pages/FamilyTreePage'
import PlanningPage from './pages/PlanningPage'
import PillarPlanningPage from './pages/PillarPlanningPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'

/* Lazy: pulls in the calendar/geo-picker libraries (react-day-picker,
   country-state-city) only when someone actually visits /signup, instead of
   shipping that weight on every route. */
const SignUpPage = lazy(() => import('./pages/SignUpPage'))

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
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<div className="min-h-screen bg-white" aria-hidden="true" />}>
              <SignUpPage />
            </Suspense>
          }
        />
        <Route path="/about" element={<AboutPage />} />

        {/* Authenticated surfaces — guarded by the auth seam (lib/auth.js) */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/dashboard/vault" element={<ProtectedRoute><VaultPage /></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/dashboard/family" element={<ProtectedRoute><FamilyPage /></ProtectedRoute>} />
        <Route path="/family/add" element={<ProtectedRoute><FamilyAddPage /></ProtectedRoute>} />
        <Route path="/family/tree" element={<ProtectedRoute><FamilyTreePage /></ProtectedRoute>} />
        <Route path="/dashboard/planning" element={<ProtectedRoute><PlanningPage /></ProtectedRoute>} />
        <Route path="/dashboard/planning/:pillar" element={<ProtectedRoute><PillarPlanningPage /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
