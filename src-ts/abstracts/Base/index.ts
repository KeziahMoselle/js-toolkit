import nanoid from 'nanoid/non-secure';
import autoBind from '../../utils/object/autoBind';
import EventManager from '../EventManager';
import { callMethod, debug } from './utils';
import { getChildren, getComponentElements } from './children';
import { getOptions, setOptions } from './options';
import { getRefs } from './refs';
import { mountComponents, destroyComponents } from './components';
import bindServices from './services';
import bindEvents from './events';

import {
  Base as BaseInterface,
  BaseElement,
  Refs as RefsInterface,
  Children as ChildrenInterface,
  Options as OptionsInterface,
  Config as ConfigInterface,
} from './types';

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
  public $el: BaseElement;

  public $id: string;

  public $isMounted = false;

  public $parent: BaseInterface | null = null;

  public __isChild__ = false;

  static __isBase__ = true;

  /**
   * Get the component's refs.
   * @return {Object}
   */
  get $refs(): RefsInterface {
    return getRefs(this, this.$el);
  }

  /**
   * Get the component's children components.
   * @return {Object}
   */
  get $children(): ChildrenInterface {
    return getChildren(this, this.$el, this.config.components || {});
  }

  /**
   * Get the component's merged config and options.
   * @return {Object}
   */
  get $options(): Record<string, unknown> {
    return getOptions(this, this.$el, this.config);
  }

  /**
   * Set the components option.
   * @param  {Object} value The new options values to merge with the old ones.
   */
  set $options(newOptions: OptionsInterface) {
    setOptions(this, this.$el, newOptions);
  }

  /**
   * Get the Base config.
   * @return {ConfigInterface}
   */
  get config(): ConfigInterface {
    return { name: 'Base' };
  }

  /**
   * Get extra methods to exclude from the autoBind function.
   */
  get _excludeFromAutoBind(): string[] {
    return [];
  }

  /**
   * Class constructor where all the magic takes place.
   *
   * @param  {HTMLElement} element The component's root element.
   * @return {Base}                A Base instance.
   */
  constructor(element: BaseElement) {
    super();

    if (!this.config) {
      throw new Error('The `config` getter must be defined.');
    }

    if (!this.config.name) {
      throw new Error('The `config.name` property is required.');
    }

    if (!element) {
      throw new Error('The root element must be defined.');
    }

    this.$el = element;
    this.$id = `${this.config.name}-${nanoid()}`;

    if (!this.$el.__base__) {
      Object.defineProperty(this.$el, '__base__', {
        get: () => this,
        configurable: true,
      });
    }

    // Autobind all methods to the instance
    autoBind(this, {
      exclude: [
        '$mount',
        '$destroy',
        '$log',
        '$on',
        '$once',
        '$off',
        '$emit',
        'mounted',
        'loaded',
        'ticked',
        'resized',
        'moved',
        'keyed',
        'scrolled',
        'destroyed',
        ...(this._excludeFromAutoBind || []),
      ],
    });

    let unbindMethods: Function[] = [];
    this.$on('mounted', () => {
      mountComponents(this);
      unbindMethods = [...bindServices(this), ...bindEvents(this)];
      this.$isMounted = true;
    });

    this.$on('destroyed', () => {
      this.$isMounted = false;
      unbindMethods.forEach((method) => method());
      destroyComponents(this);
    });

    // Mount class which are not used as another component's child.
    if (!this.__isChild__) {
      this.$mount();
      Object.defineProperty(this, '$parent', { get: () => null });
    }

    debug(this, 'constructor', this);
    return this;
  }

  /**
   * Small helper to log stuff.
   *
   * @param  {...any} args The arguments passed to the method
   * @return {void}
   */
  $log(...args: unknown[]): false | void {
    return this.$options.log
      ? window.console.log.apply(window, [this.config.name, ...args])
      : false;
  }

  /**
   * Trigger the `mounted` callback.
   */
  $mount(): BaseInterface {
    debug(this, '$mount');
    callMethod(this, 'mounted');
    return this;
  }

  /**
   * Trigger the `destroyed` callback.
   */
  $destroy(): BaseInterface {
    debug(this, '$destroy');
    callMethod(this, 'destroyed');
    return this;
  }

  /**
   * Terminate a child instance when it is not needed anymore.
   * @return {void}
   */
  $terminate(): void {
    debug(this, '$terminate');

    // First, destroy the component.
    this.$destroy();

    // Execute the `terminated` hook if it exists
    callMethod(this, 'terminated');

    // Delete the reference to the instance
    delete this.$el.__base__;

    // And update its status to prevent re-instantiation when accessing the
    // parent's `$children` property
    Object.defineProperty(this.$el, '__base__', {
      value: 'terminated',
      configurable: false,
      writable: false,
    });
  }

  /**
   * Factory method to generate multiple instance of the class.
   *
   * @param  {String}      selector The selector on which to mount each instance.
   * @return {Array<Base>}          A list of the created instance.
   */
  static $factory(nameOrSelector: string): Base[] {
    if (!nameOrSelector) {
      throw new Error(
        'The $factory method requires a component’s name or selector to be specified.'
      );
    }

    return getComponentElements(nameOrSelector).map((el) => new this(<BaseElement>el));
  }
}
