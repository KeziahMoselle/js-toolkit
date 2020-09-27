import Service, {
  PropsInterface,
  ServiceInterface,
  ServiceConstructor,
  PublicServiceInterface,
} from '../abstracts/Service';
import keyCodes from '../utils/keyCodes';
import autoBind from '../utils/object/autoBind';

// eslint-disable-next-line no-shadow
enum KeyServiceDirection {
  Up = 'up',
  Down = 'down',
  None = 'none',
}

export interface KeyPropsInterface extends PropsInterface {
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
  readonly props: KeyPropsInterface;
}

export interface PublicKeyServiceInterface extends PublicServiceInterface {
  props(): KeyPropsInterface;
}

export interface KeyServiceConstructor extends ServiceConstructor {
  new(): KeyServiceInterface;
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
    this.handler = (event: KeyboardEvent): void => {
      this.event = event;
      this.trigger(this.props);
    };
    autoBind(this, { include: ['handler'] });
    document.addEventListener('keydown', this.handler as EventListener, { passive: false });
    document.addEventListener('keyup', this.handler as EventListener, { passive: false });
  }

  /**
   * Unbind the handler from the keyboard event.
   *
   * @return {void}
   */
  kill() {
    document.removeEventListener('keydown', this.handler as EventListener);
    document.removeEventListener('keyup', this.handler as EventListener);
  }

  /**
   * Get keyboard props.
   *
   * @type {Object}
   */
  get props(): KeyPropsInterface {
    if (!this.event) {
      const props: KeyPropsInterface = {
        event: this.event,
        triggered: this.triggered,
        direction: KeyServiceDirection.None,
        isUp: false,
        isDown: false,
      };

      return props;
    }

    const keys = Object.entries(keyCodes).reduce((acc, [name, code]) => {
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
