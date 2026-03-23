import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage'

const PitchDeck = lazy(() => import('./pages/PitchDeck'))
const Technology = lazy(() => import('./pages/Technology'))
const TechDetail = lazy(() => import('./pages/TechDetail'))

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-abyss flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-storm-blue border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-neutral-500 font-medium">Loading...</span>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-abyss flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white font-mono mb-4">404</h1>
        <p className="text-neutral-400 mb-8">Page not found.</p>
        <a href="/" className="text-storm-blue hover:underline font-medium">Back to Home</a>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/slides" element={<PitchDeck />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/technology/detail" element={<TechDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
