/* eslint-disable require-jsdoc */
import Service from '../abstracts/Service';
import { throttle, debounce } from '../utils';
import useRaf from './raf';

/**
 * Pointer service
 *
 * ```
 * import scroll from '@studiometa/js/services/pointer';
 * scroll.add(key, callback);
 * scroll.remove(key);
 * scroll.props;
 * ```
 */
class Pointer extends Service {
  /** @type {Boolean} State of the pointer. */
  isDown = false;

  /** @type {Number} The y pointer position. */
  y = window.innerHeight / 2;

  /** @type {Number} The y previous pointer position. */
  yLast = window.innerHeight / 2;

  /** @type {Number} The x pointer position. */
  x = window.innerWidth / 2;

  /** @type {Number} The x previous pointer position. */
  xLast = window.innerWidth / 2;

  /**
   * Bind the handler to the mousemove and touchmove events.
   * Bind the up and down handler to the mousedown, mouseup, touchstart and touchend events.
   *
   * @return {void}
   */
  init() {
    const { add, remove } = useRaf();
    this.hasRaf = false;

    const debounced = debounce(event => {
      this.updateValues(event);
      remove('usePointer');
      this.hasRaf = false;
    }, 50);

    this.handler = throttle(event => {
      this.updateValues(event);
      if (!this.hasRaf) {
        add('usePointer', () => {
          this.trigger(this.props);
        });
        this.hasRaf = true;
      }
      // Reset changed flags at the end of the scroll event
      debounced(event);
    }, 32).bind(this);

    this.downHandler = this.downHandler.bind(this);
    this.upHandler = this.upHandler.bind(this);

    document.addEventListener('mouseenter', this.handler, { once: true });
    document.addEventListener('mousemove', this.handler, { passive: true });
    document.addEventListener('touchmove', this.handler, { passive: true });
    document.addEventListener('mousedown', this.downHandler, {
      passive: true,
    });
    document.addEventListener('touchstart', this.downHandler, {
      passive: true,
    });
    document.addEventListener('mouseup', this.upHandler, {
      passive: true,
    });
    document.addEventListener('touchend', this.upHandler, {
      passive: true,
    });
  }

  /**
   * Unbind all handlers from their bounded event.
   *
   * @return {void}
   */
  kill() {
    document.removeEventListener('mousemove', this.handler);
    document.removeEventListener('touchmove', this.handler);
    document.removeEventListener('mousedown', this.downHandler);
    document.removeEventListener('touchstart', this.downHandler);
    document.removeEventListener('mouseup', this.upHandler);
    document.removeEventListener('touchend', this.upHandler);
  }

  /**
   * Handler for the pointer's down action.
   *
   * @return {void}
   */
  downHandler() {
    this.isDown = true;
    this.trigger(this.props);
  }

  /**
   * Handler for the pointer's up action.
   *
   * @return {void}
   */
  upHandler() {
    this.isDown = false;
    this.trigger(this.props);
  }

  /**
   * Update the pointer positions.
   *
   * @param  {Event} event The event object.
   * @return {void}
   */
  updateValues(event) {
    this.yLast = this.y;
    this.xLast = this.x;

    // Check scroll Y
    if (((event.touches || [])[0] || event || {}).clientY !== this.y) {
      this.y = ((event.touches || [])[0] || event || {}).clientY;
    }

    // Check scroll x
    if (((event.touches || [])[0] || event || {}).clientX !== this.x) {
      this.x = ((event.touches || [])[0] || event || {}).clientX;
    }
  }

  /**
   * Get the pointer props.
   *
   * @type {Object}
   */
  get props() {
    return {
      isDown: this.isDown,
      x: this.x,
      y: this.y,
      changed: {
        x: this.x !== this.xLast,
        y: this.y !== this.yLast,
      },
      last: {
        x: this.xLast,
        y: this.yLast,
      },
      delta: {
        x: this.x - this.xLast,
        y: this.y - this.yLast,
      },
      progress: {
        x: this.x / window.innerWidth,
        y: this.y / window.innerHeight,
      },
      max: {
        x: window.innerWidth,
        y: window.innerHeight,
      },
    };
  }
}

const pointer = new Pointer();
const add = pointer.add.bind(pointer);
const remove = pointer.remove.bind(pointer);
const props = () => pointer.props;

/**
 * Use the pointer.
 *
 * ```js
 * import usePointer from '@studiometa/js-toolkit/services';
 * const { add, remove, props } = usePointer();
 * add('id', () => {});
 * remove('id');
 * props();
 * ```
 */
export default () => ({
  add,
  remove,
  props,
});
