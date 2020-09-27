export interface EventManagerListener {
    (...args: unknown[]): void;
}
export interface EventManagerInterface {
    _events: {
        [eventName: string]: EventManagerListener[];
    };
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
    _events: {};
    /**
     * Bind a listener function to an event.
     *
     * @param  {String}   event    Name of the event.
     * @param  {String}   listener Function to be called.
     * @return {Function}          A function to unbind the listener.
     */
    $on(event: string, listener: EventManagerListener): EventManagerListener;
    /**
     * Unbind a listener function from an event.
     *
     * @param  {String}       event    Name of the event.
     * @param  {String}       listener Function to be removed.
     * @return {EventManager}          The current instance.
     */
    $off(event: string, listener: EventManagerListener): EventManager;
    /**
     * Emits an event.
     *
     * @param  {String}       event Name of the event.
     * @param  {Array}        args  The arguments to apply to the functions bound to this event.
     * @return {EventManager}       The current instance.
     */
    $emit(event: string, ...args: unknown[]): EventManager;
    /**
     * Bind a listener function to an event for one execution only.
     *
     * @param  {String}       event    Name of the event.
     * @param  {String}       listener Function to be called.
     * @return {EventManager}          The current instance.
     */
    $once(event: string, listener: EventManagerListener): EventManager;
}
