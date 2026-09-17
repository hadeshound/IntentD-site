import clsx, { type ClassValue } from 'clsx';

/** Joins conditional class names. Kept as a single helper so components never
 *  hand-roll template-literal class strings. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
