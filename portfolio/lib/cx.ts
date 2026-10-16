import { clsx, type ClassValue } from 'clsx'

/**
 * Joins class names without tailwind-merge, for client components that load with every page:
 * tailwind-merge and its class map are about 9 KB of gzip that the first render does not need.
 * Use it only where no two classes set the same property (no overrides through `className`);
 * where one class must win over another, pick it explicitly or use `cn` from lib/utils.
 */
export function cx(...inputs: ClassValue[]): string {
  return clsx(inputs)
}
