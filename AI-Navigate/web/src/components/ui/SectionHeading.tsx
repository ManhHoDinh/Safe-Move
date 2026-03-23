import { type ReactNode } from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({ kicker, title, subtitle, align = 'center', className = '' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`mb-16 ${alignClass} ${className}`}>
      {kicker && (
        <span className="inline-block text-xs font-bold tracking-[0.2em] text-storm-blue uppercase mb-4">
          {kicker}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-neutral-400 max-w-3xl" style={align === 'center' ? { margin: '1rem auto 0' } : {}}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
