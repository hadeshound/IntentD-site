'use client';

import { useEffect, useRef, useState } from 'react';

interface UseRevealOptions {
  /** Fraction of the element that must be visible before it reveals. */
  threshold?: number;
  /** Shifts the trigger line up from the viewport bottom. */
  rootMargin?: string;
}

/**
 * Scroll reveal built on IntersectionObserver rather than a motion library:
 * one observer per element, one class toggle, and only opacity/transform
 * animate, so nothing forces a layout during scrolling.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
}: UseRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    // Without the API (or with reduced motion), show the content immediately.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Reveal is one-way: re-animating on scroll-back is the jumpy
            // behaviour this design explicitly avoids.
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
