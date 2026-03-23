import type { ReactNode } from 'react';

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  color?: string;
  className?: string;
}

export default function StatCard({ value, label, icon, color = 'text-flood-cyan', className = '' }: StatCardProps) {
  return (
    <div className={`bg-deep-navy rounded-xl p-6 border border-neutral-700/50 ${className}`}>
      {icon && <div className="mb-3">{icon}</div>}
      <div className={`font-mono text-3xl font-bold ${color}`}>{value}</div>
      <div className="mt-1 text-sm text-neutral-400">{label}</div>
    </div>
  );
}
