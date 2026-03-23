import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// === SECTION A: PITCH NARRATIVE ===
import Slide01Title from '../components/slides/Slide01Title';
import Slide02Problem from '../components/slides/Slide02Problem';
import SlideWhyNow from '../components/slides/SlideWhyNow';
import Slide03Solution from '../components/slides/Slide03Solution';
import SlideTraction from '../components/slides/SlideTraction';
import Slide04Intelligence from '../components/slides/Slide04Intelligence';
import Slide06Prediction from '../components/slides/Slide06Prediction';
import Slide07Product from '../components/slides/Slide07Product';
import SlideDemo from '../components/slides/SlideDemo';
import Slide23Products from '../components/slides/Slide23Products';

// === SECTION B: BUSINESS CASE ===
import Slide08Market from '../components/slides/Slide08Market';
import SlideCompetition from '../components/slides/SlideCompetition';
import Slide09Business from '../components/slides/Slide09Business';
import Slide10Impact from '../components/slides/Slide10Impact';
import SlideAWSCost from '../components/slides/SlideAWSCost';
import Slide11Roadmap from '../components/slides/Slide11Roadmap';
import Slide12Team from '../components/slides/Slide12Team';
import Slide13Expansion from '../components/slides/Slide13Expansion';
import Slide25Evolution from '../components/slides/Slide25Evolution';

// === SECTION C: TECHNICAL APPENDIX ===
import Slide14Architecture from '../components/slides/Slide14Architecture';
import SlideTechStack from '../components/slides/SlideTechStack';
import Slide15DataSources from '../components/slides/Slide15DataSources';
import Slide16Processing from '../components/slides/Slide16Processing';
import Slide17FloodDetection from '../components/slides/Slide17FloodDetection';
import SlideLLMEngine from '../components/slides/SlideLLMEngine';
import SlideAgentDeepDive from '../components/slides/SlideAgentDeepDive';
import SlidePredictionDeepDive from '../components/slides/SlidePredictionDeepDive';
import SlideSimulationDeepDive from '../components/slides/SlideSimulationDeepDive';
import Slide18Routing from '../components/slides/Slide18Routing';
import Slide22Reporting from '../components/slides/Slide22Reporting';
import Slide24Infrastructure from '../components/slides/Slide24Infrastructure';
import SlideThankYou from '../components/slides/SlideThankYou';

const slides = [
  // --- A: PITCH NARRATIVE (presented ~5 min) ---
  Slide01Title,         // 1. Title
  Slide02Problem,       // 2. Problem
  SlideWhyNow,          // 3. Why Now?
  Slide03Solution,      // 4. Solution
  SlideTraction,        // 5. Traction
  Slide04Intelligence,  // 6. AI Systems
  Slide07Product,       // 7. Product
  SlideDemo,            // 8. Live Demo (videos)
  Slide06Prediction,    // 9. Prediction

  // --- B: BUSINESS CASE ---
  Slide08Market,        // 9. Market
  SlideCompetition,     // 10. Competition
  Slide09Business,      // 11. Business Model
  Slide10Impact,        // 12. Impact
  Slide11Roadmap,       // 13. Roadmap
  Slide12Team,          // 14. Team + Ask
  Slide25Evolution,     // 15. Vision

  // --- CLOSING ---
  SlideThankYou,        // 16. Thank You

  // --- D: TECHNICAL APPENDIX (judge Q&A, ordered by system flow) ---
  Slide14Architecture,     // System Architecture overview
  SlideTechStack,          // Full Tech Stack
  Slide15DataSources,      // Data Sources & Ingestion
  Slide16Processing,       // Data Processing & Fusion
  Slide17FloodDetection,   // Flood Detection (CV + multi-source)
  SlideLLMEngine,          // LLM Evaluation Engine (deep dive)
  Slide18Routing,          // Routing Intelligence
  SlideAgentDeepDive,      // Agent + Feedback Learning (deep dive)
  SlidePredictionDeepDive, // Prediction Engine (deep dive)
  SlideSimulationDeepDive, // Simulation Engine (deep dive)
  Slide22Reporting,        // Reporting & Analytics
  Slide23Products,         // Products Portfolio
  SlideAWSCost,            // Unit Economics
  Slide24Infrastructure,   // Cloud Infrastructure
  Slide13Expansion,        // Expansion Plan
];

const TOTAL = slides.length;

export default function PitchDeck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const scrollToSlide = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, TOTAL - 1));
    const container = containerRef.current;
    if (!container) return;
    const target = container.children[clamped] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Array.from(container.children).indexOf(
              entry.target as HTMLElement,
            );
            if (index >= 0) setCurrent(index);
          }
        }
      },
      { root: container, threshold: 0.5 },
    );

    Array.from(container.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToSlide(current + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToSlide(current - 1);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, scrollToSlide]);

  const progress = ((current + 1) / TOTAL) * 100;

  return (
    <div className="pitch-deck relative h-screen w-screen overflow-hidden bg-abyss">
      {/* Progress bar with glow */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-neutral-900">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #2563EB, #06B6D4, #10B981)',
            boxShadow: '0 0 12px rgba(6,182,212,0.4), 0 0 4px rgba(37,99,235,0.6)',
          }}
        />
      </div>

      {/* Slide container */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto"
        style={{
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {slides.map((SlideComponent, i) => (
          <SlideComponent key={i} />
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => scrollToSlide(current - 1)}
        disabled={current === 0}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-slate-dark/80 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-slate-dark transition-all disabled:opacity-20 disabled:cursor-not-allowed backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scrollToSlide(current + 1)}
        disabled={current === TOTAL - 1}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-slate-dark/80 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-slate-dark transition-all disabled:opacity-20 disabled:cursor-not-allowed backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Nav dots */}
      <div className="fixed right-1.5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-flood-cyan scale-150 shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                : 'bg-neutral-600/30 hover:bg-flood-cyan/50 hover:scale-125'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-4 right-4 z-40 px-3 py-1.5 rounded-md bg-slate-dark/90 border border-flood-cyan/20 backdrop-blur-sm shadow-lg">
        <span className="font-mono text-sm text-neutral-400">
          <span className="text-white font-semibold">{current + 1}</span>
          {' / '}
          {TOTAL}
        </span>
      </div>
    </div>
  );
}
