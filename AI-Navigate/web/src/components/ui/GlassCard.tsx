import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  delay?: number;
}

const paddingMap = { sm: 'p-4', md: 'p-6', lg: 'p-8' };

export default function GlassCard({ children, className = '', padding = 'lg', hoverable = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      className={`rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 ${paddingMap[padding]} ${
        hoverable ? 'transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20' : ''
      } ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' as const }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
