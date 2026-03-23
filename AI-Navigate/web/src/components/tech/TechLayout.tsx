import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Droplets, ArrowLeft, Menu, X } from 'lucide-react';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { label: 'System Overview', path: '/technology' },
    ],
  },
  {
    label: 'Data & Processing',
    items: [
      { label: 'Data Pipeline', path: '/technology/data-pipeline' },
      { label: 'Data Processing', path: '/technology/processing' },
    ],
  },
  {
    label: 'AI & Intelligence',
    items: [
      { label: 'Flood Detection & LLM', path: '/technology/flood-detection' },
      { label: 'Routing Intelligence', path: '/technology/routing' },
      { label: 'Agent System', path: '/technology/agents' },
      { label: 'Prediction Engine', path: '/technology/prediction' },
    ],
  },
  {
    label: 'Product & Infrastructure',
    items: [
      { label: 'Tech Stack', path: '/technology/stack' },
      { label: 'Infrastructure', path: '/technology/infrastructure' },
      { label: 'API Reference', path: '/technology/api' },
    ],
  },
  {
    label: 'Deep Dive',
    items: [
      { label: 'Architecture Decisions', path: '/technology/decisions' },
      { label: 'AI Detection Pipeline', path: '/technology/ai-pipeline' },
      { label: 'Performance & Latency', path: '/technology/performance' },
      { label: 'Data Flow & Consistency', path: '/technology/data-flow' },
      { label: 'Security & Observability', path: '/technology/security' },
    ],
  },
];

export default function TechLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-abyss">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-abyss/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20">
        <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 -ml-2 text-neutral-400 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="flex items-center gap-2.5 group">
              <Droplets
                size={24}
                className="text-storm-blue transition-transform duration-300 group-hover:scale-110"
                strokeWidth={2}
              />
              <span className="text-lg font-bold text-white tracking-tight">
                SafeMove<span className="text-storm-blue"> AI</span>
              </span>
            </Link>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-400 border border-white/10 rounded-lg transition-all duration-300 hover:text-white hover:border-white/20 hover:bg-white/5"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-16 z-40 lg:z-0
            w-64 h-[calc(100vh-64px)] flex-shrink-0
            bg-deep-navy border-r border-neutral-800
            overflow-y-auto overscroll-contain
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="py-6" aria-label="Technology documentation">
            {navGroups.map((group, gi) => (
              <div key={gi}>
                <p className={`text-xs font-bold text-neutral-500 uppercase tracking-wider px-4 mb-2 ${gi > 0 ? 'mt-6' : ''}`}>
                  {group.label}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.path === '/technology'}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm transition-colors duration-150 border-l-2 ${
                            isActive
                              ? 'bg-storm-blue/10 text-storm-blue border-storm-blue font-medium'
                              : 'text-neutral-400 border-transparent hover:text-white hover:bg-white/5'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12">
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="border-t border-white/5 bg-neutral-900/50">
            <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Droplets size={18} className="text-storm-blue" strokeWidth={2} />
                <span className="text-sm font-bold text-white tracking-tight">SafeMove AI</span>
                <span className="text-neutral-600 mx-2">|</span>
                <span className="text-xs text-neutral-500">Technical Documentation</span>
              </div>
              <p className="text-xs text-neutral-600">
                &copy; {new Date().getFullYear()} SafeMove AI. All rights reserved.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
