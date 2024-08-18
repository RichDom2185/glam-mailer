import { throttle } from "es-toolkit";

/**
 * Throttles a function and caches its return value based on the
 * function arguments. If the function is called with the same
 * arguments before the delay has passed, the cached value is
 * returned. If the function is called with different arguments
 * before the delay has passed, either a fallback value, or the
 * previous value is returned.
 *
 * @param fn          The function to be throttled.
 * @param delay       The throttle delay in milliseconds.
 * @param fallback    The fallback value to return if the function is called
 *                    with different arguments before the delay has passed.
 * @param getCacheKey A function that generates a cache key based on
 *                    the function arguments.
 * @returns           The throttled function.
 */
export const throttleWithMemoize = <
  F extends (...args: any[]) => any,
  T extends ReturnType<F> = ReturnType<F>
>(
  fn: F,
  delay: number,
  fallback?: T,
  getCacheKey?: (...args: Parameters<F>) => string
) => {
  const cache: Record<string, ReturnType<F>> = {};

  const throttled = throttle((...args: Parameters<F>) => {
    const key = getCacheKey?.(...args) ?? args.join(",");
    cache[key] = fn(...args);
    return cache[key];
  }, delay);

  return (...args: Parameters<F>): ReturnType<F> => {
    const key = getCacheKey?.(...args) ?? args.join(",");
    if (key in cache) {
      return cache[key];
    }
    throttled(...args);
    return cache[key] ?? (fallback as ReturnType<F>);
  };
};
