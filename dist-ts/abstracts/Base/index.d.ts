import EventManager from '../EventManager';
import { Base as BaseInterface, BaseElement, Refs as RefsInterface, Children as ChildrenInterface, Options as OptionsInterface, Config as ConfigInterface } from './types';
/**
 * Page lifecycle class
 *
 * @method mounted   Fired when the class is instantiated
 * @method loaded    Fired on the window's load event
 * @method ticked    Fired each frame with `requestAnimationFrame`
 * @method resized   Fired when the window is resized (`resize` event)
 * @method moved     Fired when the pointer has moved (`touchmove` and `mousemove` events)
 * @method scrolled  Fired with debounce when the document is scrolled (`scroll` event)
 * @method destroyed Fired when the window is being unloaded (`unload` event)
 */
export default class Base extends EventManager implements BaseInterface {
    $el: BaseElement;
    $id: string;
    $isMounted: boolean;
    $parent: BaseInterface | null;
    __isChild__: boolean;
    static __isBase__: boolean;
    /**
     * Get the component's refs.
     * @return {Object}
     */
    get $refs(): RefsInterface;
    /**
     * Get the component's children components.
     * @return {Object}
     */
    get $children(): ChildrenInterface;
    /**
     * Get the component's merged config and options.
     * @return {Object}
     */
    get $options(): OptionsInterface;
    /**
     * Set the components option.
     * @param  {Object} value The new options values to merge with the old ones.
     */
    set $options(newOptions: OptionsInterface);
    /**
     * Get the Base config.
     * @return {ConfigInterface}
     */
    get config(): ConfigInterface;
    /**
     * Get extra methods to exclude from the autoBind function.
     */
    get _excludeFromAutoBind(): string[];
    /**
     * Class constructor where all the magic takes place.
     *
     * @param  {HTMLElement} element The component's root element.
     * @return {Base}                A Base instance.
     */
    constructor(element: BaseElement);
    /**
     * Small helper to log stuff.
     *
     * @param  {...any} args The arguments passed to the method
     * @return {void}
     */
    $log(...args: unknown[]): false | void;
    /**
     * Trigger the `mounted` callback.
     */
    $mount(): BaseInterface;
    /**
     * Trigger the `destroyed` callback.
     */
    $destroy(): BaseInterface;
    /**
     * Terminate a child instance when it is not needed anymore.
     * @return {void}
     */
    $terminate(): void;
    /**
     * Factory method to generate multiple instance of the class.
     *
     * @param  {String}      selector The selector on which to mount each instance.
     * @return {Array<Base>}          A list of the created instance.
     */
    static $factory(nameOrSelector: string): Base[];
}
