import { getRaf, getCancelRaf } from '../nextFrame';

/**
 * @typedef {Object} SpringOptions
 * @property {number} [mass]
 * @property {number} [tension] or stiffness
 * @property {number} [friction]
 * @property {number} [precision]
 * @property {number} [initialValue]
 * @property {number} [initialVelocity]
 */

/**
 * @typedef {Object} SpringCallbacks
 * @property {(currentValue:number) => void} step
 * @property {(currentValue:number) => void} [cancel]
 * @property {() => void} [done]
 */

/**
 * Preset by @posva.
 * @see https://github.com/posva/vue-use-spring/blob/v1/src/presets.ts
 * @license MIT
 * @type {SpringOptions}
 */
export const noWobble = {
  mass: 1,
  tension: 170,
  friction: 26,
  precision: 0.01,
};

/**
 * Preset by @posva.
 * @see https://github.com/posva/vue-use-spring/blob/v1/src/presets.ts
 * @license MIT
 * @type {SpringOptions}
 */
export const gentle = {
  mass: 1,
  tension: 120,
  friction: 14,
  precision: 0.01,
};

/**
 * Preset by @posva.
 * @see https://github.com/posva/vue-use-spring/blob/v1/src/presets.ts
 * @license MIT
 * @type {SpringOptions}
 */
export const wobbly = {
  mass: 1,
  tension: 180,
  friction: 12,
  precision: 0.01,
};

/**
 * Preset by @posva.
 * @see https://github.com/posva/vue-use-spring/blob/v1/src/presets.ts
 * @license MIT
 * @type {SpringOptions}
 */
export const stiff = {
  mass: 1,
  tension: 210,
  friction: 20,
  precision: 0.01,
};

/**
 * Simple spring function from 0 to 1.
 *
 * Inspired by @bluecateng/nano-spring.
 * @see https://github.com/bluecatengineering/nano-spring
 * @license ISC
 *
 * @param {SpringCallbacks} callbacks Callback functions triggered during the animation.
 * @param {SpringOptions} options
 *
 * @return {() => void} A function to cancel the spring.
 */
export default function spring(callbacks, options = {}) {
  const { step, done, cancel } = callbacks;
  const { tension, friction, mass } = { ...noWobble, ...options };
  let frameId;
  let velocity = options.initialVelocity ?? 0;
  let currentValue = options.initialValue ?? 0;
  let timestamp = performance.now();
  const precision = options.precision ?? 0.01;
  const raf = getRaf();
  const cancelRaf = getCancelRaf();

  // eslint-disable-next-line require-jsdoc
  function nextStep() {
    const newTimestamp = performance.now();
    const deltaTime = (newTimestamp - timestamp) / 1000;
    timestamp = newTimestamp;

    const springer = tension * (1 - currentValue);
    const damper = friction * velocity;
    const acceleration = (springer - damper) / (mass ?? 1); // mass defaults to 1
    velocity += acceleration * deltaTime;
    currentValue += velocity * deltaTime;

    if (Math.abs(1 - currentValue) < precision) {
      step(1);
      if (typeof done === 'function') {
        done();
      }
    } else {
      step(currentValue);
      frameId = raf(nextStep);
    }
  }

  frameId = raf(nextStep);
  return () => {
    cancelRaf(frameId);
    if (typeof cancel === 'function') {
      cancel(currentValue);
    }
  };
}
