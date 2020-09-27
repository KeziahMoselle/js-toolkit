/**
 * Simple throttling helper that limits a
 * function to only run once every {delay}ms
 *
 * @param {Function} fn    The function to throttle
 * @param {Number}   delay The delay in ms
 */
export default function throttle(
  fn: (...args: unknown[]) => unknown,
  delay = 16,
): (...args: unknown[]) => unknown {
  let lastCall = 0;
  return (...args: unknown[]): unknown => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return false;
    }
    lastCall = now;
    return fn(...args);
  };
}
