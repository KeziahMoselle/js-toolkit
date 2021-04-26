import clamp from './clamp.js';

/**
 * Clamp a value in the 0–1 range.
 * @param {number} value
 * @return {number}
 */
export default function clamp01(value) {
  return clamp(value, 0, 1);
}
