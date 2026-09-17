'use client';

import type { CSSProperties, ElementType, ReactNode } from 'react';

import { useReveal } from '@/lib/hooks/useReveal';
import { cn } from '@/lib/utils/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger inside a group of siblings, in milliseconds. */
  delay?: number;
  as?: ElementType;
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag
      ref={ref}
      style={style}
      className={cn('reveal', isVisible && 'reveal-visible', className)}
    >
      {children}
    </Tag>
  );
}
