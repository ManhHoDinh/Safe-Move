import type { ReactNode } from 'react';

interface SlideLayoutProps {
  children: ReactNode;
  background?: 'default' | 'accent' | 'map';
  className?: string;
  slideNumber?: number;
}

export default function SlideLayout({
  children,
  background = 'default',
  className = '',
  slideNumber,
}: SlideLayoutProps) {
  return (
    <section className="relative h-screen w-full flex-shrink-0 snap-start overflow-hidden flex items-center justify-center">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-abyss to-deep-navy" />

      {/* Subtle noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Accent radial glow */}
      {(background === 'accent' || background === 'map') && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Map grid overlay */}
      {background === 'map' && (
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      )}

      {/* Content container — fills viewport naturally */}
      <div
        className={`relative z-10 w-full max-w-[1400px] h-full mx-auto px-10 py-12 lg:px-16 lg:py-16 flex flex-col ${className}`}
      >
        {children}
      </div>

      {/* Slide number indicator */}
      {slideNumber !== undefined && (
        <div className="absolute bottom-6 right-8 z-20">
          <span className="font-mono text-xs text-neutral-600 tracking-wider">
            {String(slideNumber).padStart(2, '0')}
          </span>
        </div>
      )}
    </section>
  );
}
