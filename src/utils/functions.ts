import { throttle } from "es-toolkit";

/**
 * Debounce function with memoization. Returns the last cached value if
 * the function is called again before the delay.
 * @param fn The function to be debounced and memoized.
 * @param delay The delay in milliseconds for debouncing.
 * @returns A debounced function with memoization.
 */
export const throttleWithMemoize = <F extends (...args: any[]) => any>(
  fn: F,
  delay: number
) => {
  let cached: ReturnType<F>;
  const throttled = throttle((...args: Parameters<F>) => {
    cached = fn(...args);
    return cached;
  }, delay);

  return (...args: Parameters<F>): ReturnType<F> => {
    throttled(...args);
    return cached;
  };
};
