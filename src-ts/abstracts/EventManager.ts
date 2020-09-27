export interface EventManagerListener {
  (...args: unknown[]): void;
}

export interface EventManagerInterface {
  _events: { [eventName:string]: EventManagerListener[] };
  $on(event: string, listener: EventManagerListener): EventManagerListener;
  $off(event: string, listener: EventManagerListener): EventManagerInterface;
  $emit(event: string, ...args: unknown[]): EventManagerInterface;
  $once(event: string, listener: EventManagerListener): EventManagerInterface;
}

/**
 * Event management class.
 *
 * @method $on    Bind a given function to the given event.
 * @method $off   Unbind the given function from the given event.
 * @method $once  Bind a given function to the given event once.
 * @method $emit  Emit an event with custom props.
 */
export default class EventManager implements EventManagerInterface {
  /** @type {Object} An object to store the events */
  _events = {};

  /**
   * Bind a listener function to an event.
   *
   * @param  {String}   event    Name of the event.
   * @param  {String}   listener Function to be called.
   * @return {Function}          A function to unbind the listener.
   */
  $on(event: string, listener: EventManagerListener): EventManagerListener {
    if (!Array.isArray(this._events[event])) {
      this._events[event] = [];
    }
    this._events[event].push(listener);

    return () => this.$off(event, listener);
  }

  /**
   * Unbind a listener function from an event.
   *
   * @param  {String}       event    Name of the event.
   * @param  {String}       listener Function to be removed.
   * @return {EventManager}          The current instance.
   */
  $off(event: string, listener: EventManagerListener): EventManager {
    // If no event specified, we remove them all.
    if (!event) {
      this._events = {};
      return this;
    }
    // If no listener have been specified, we remove all
    // the listeners for the given event.
    if (!listener) {
      this._events[event] = [];
      return this;
    }

    const index = this._events[event].indexOf(listener);

    if (index > -1) {
      this._events[event].splice(index, 1);
    }

    return this;
  }

  /**
   * Emits an event.
   *
   * @param  {String}       event Name of the event.
   * @param  {Array}        args  The arguments to apply to the functions bound to this event.
   * @return {EventManager}       The current instance.
   */
  $emit(event: string, ...args: unknown[]): EventManager {
    if (!Array.isArray(this._events[event])) {
      return this;
    }

    this._events[event].forEach((listener) => {
      listener.apply(this, args);
    });
    return this;
  }

  /**
   * Bind a listener function to an event for one execution only.
   *
   * @param  {String}       event    Name of the event.
   * @param  {String}       listener Function to be called.
   * @return {EventManager}          The current instance.
   */
  $once(event: string, listener: EventManagerListener): EventManager {
    const handler: EventManagerListener = (...args: unknown[]): void => {
      this.$off(event, handler);
      listener.apply(this, args);
    };
    this.$on(event, (...args: unknown[]) => handler(...args));
    return this;
  }
}
