import Service, { ServiceInterface, PublicServiceInterface } from '../abstracts/Service';
import keyCodes from '../utils/keyCodes';
import autoBind from '../utils/object/autoBind';

// eslint-disable-next-line no-shadow
enum KeyServiceDirection {
  Up = 'up',
  Down = 'down',
  None = 'none',
}

export interface KeyServiceProps {
  event: KeyboardEvent | null;
  triggered: number;
  direction: KeyServiceDirection;
  isUp: boolean;
  isDown: boolean;
  [name: string]: unknown;
}

export interface KeyServiceInterface extends ServiceInterface {
  event: KeyboardEvent | null;
  previousEvent: KeyboardEvent | null;
  triggered: number;
  handler(event: KeyboardEvent): void;
  add(key:string, callback:Function):KeyServiceInterface|ServiceInterface;
  readonly props:KeyServiceProps;
}

export interface PublicKeyServiceInterface extends PublicServiceInterface {
  props():KeyServiceProps;
}

/**
 * Scroll service
 *
 * ```
 * import { useKey } from '@studiometa/js-toolkit/services';
 * const { add, remove, props } = useKey();
 * add(key, (props) => {});
 * remove(key);
 * props();
 * ```
 */
class Key extends Service implements KeyServiceInterface {
  /** @type {KeyboardEvent|null} The event object. */
  event: KeyboardEvent | null = null;

  /** @type {KeyboardEvent|null} The previousEvent object. */
  previousEvent: KeyboardEvent | null = null;

  /**
   * Used to accumulate the number of times the `keydown` event has been triggered.
   * @type {Number}
   */
  triggered = 0;

  /**
   * Bind the handler to the keyboard event.
   *
   * @return {void}
   */
  init() {
    autoBind(this, { include: [ 'handler' ] });
    document.addEventListener('keydown', this.handler, { passive: false });
    document.addEventListener('keyup', this.handler, { passive: false });
  }

  /**
   * Unbind the handler from the keyboard event.
   *
   * @return {void}
   */
  kill() {
    document.removeEventListener('keydown', this.handler);
    document.removeEventListener('keyup', this.handler);
  }

  /**
   * Handler for the keyboard events.
   * @param {KeyboardEvent} event The Event object.s
   */
  handler(event:KeyboardEvent):void {
    this.event = event;
    this.trigger(this.props);
  }

  /**
   * Get keyboard props.
   *
   * @type {Object}
   */
  get props():KeyServiceProps {
    if (!this.event) {
      const props: KeyServiceProps = {
        event: this.event,
        triggered: this.triggered,
        direction: KeyServiceDirection.None,
        isUp: false,
        isDown: false,
      };

      return props;
    }

    const keys = Object.entries(keyCodes).reduce((acc, [ name, code ]) => {
      acc[name] = code === (this.event || {}).keyCode;
      return acc;
    }, {});

    if (!this.previousEvent) {
      this.triggered = 0;
    }

    if (this.event.type === 'keydown' && (this.previousEvent || {}).type === 'keydown') {
      this.triggered += 1;
    } else {
      this.triggered = 1;
    }

    this.previousEvent = this.event;

    return {
      event: this.event,
      triggered: this.triggered,
      direction: this.event.type === 'keydown' ? KeyServiceDirection.Down : KeyServiceDirection.Up,
      isUp: this.event.type === 'keyup',
      isDown: this.event.type === 'keydown',
      ...keys,
    };
  }
}

let key: KeyServiceInterface;

export default (): PublicKeyServiceInterface => {
  if (!key) {
    key = new Key();
  }

  const add = key.add.bind(key);
  const remove = key.remove.bind(key);
  const has = key.has.bind(key);
  const props = () => key.props;

  return {
    add,
    remove,
    has,
    props,
  };
};
