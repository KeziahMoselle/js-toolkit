/**
 * Smooth step from currentValue to targetValue
 *
 * @param  {Int} targetValue we want to reech
 * @param  {Int} currentValue
 * @param  {Int} speed to reech target value
 * @return {Int}
 */
export default function damp(
  targetValue: number,
  currentValue: number,
  speed: number = 0.5,
): number {
  const value = currentValue + (targetValue - currentValue) * speed;
  return Math.abs(targetValue - currentValue) < 0.001 ? targetValue : value;
}
