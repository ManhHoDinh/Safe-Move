import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  maxWidth?: 'default' | 'wide' | 'narrow';
  withDivider?: boolean;
}

export default function SectionWrapper({ id, children, className = '', maxWidth = 'default', withDivider = true }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const widthClass = maxWidth === 'wide' ? 'max-w-[90rem]' : maxWidth === 'narrow' ? 'max-w-5xl' : 'max-w-7xl';

  return (
    <section id={id} ref={ref} className={`relative py-24 lg:py-32 ${className}`}>
      {withDivider && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-storm-blue/20 to-transparent" />
      )}
      <motion.div
        className={`${widthClass} mx-auto px-6`}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
}
