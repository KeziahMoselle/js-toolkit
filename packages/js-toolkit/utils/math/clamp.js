/**
 * Clamp a value in a given range.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export default function clamp(value, min, max) {
  /* eslint-disable no-nested-ternary */
  return min < max
    ? value < min
      ? min
      : value > max
      ? max
      : value
    : value < max
    ? max
    : value > min
    ? min
    : value;
  /* eslint-enable no-nested-ternary */
}
