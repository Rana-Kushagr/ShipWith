import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'success' | 'warning' | 'info' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  icon
}) => {
  const variantStyles = {
    neutral: 'bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
    success: 'bg-[var(--color-success-subtle)] text-[var(--color-success)] border-[var(--color-success)]/20',
    warning: 'bg-[var(--color-warning-subtle)] text-[var(--color-warning)] border-[var(--color-warning)]/20',
    info: 'bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] border-[var(--color-brand-accent)]/20',
    accent: 'bg-[var(--color-surface-strong)] text-[var(--color-text-primary)] border-[var(--color-border-strong)]'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-mono',
    md: 'text-xs px-2.5 py-1 gap-1.5'
  };

  return (
    <span
      className={`inline-flex items-center font-medium border rounded-[var(--radius-sm)] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
