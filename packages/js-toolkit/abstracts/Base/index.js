import autoBind from '../../utils/object/autoBind.js';
import { callMethod, debug, getConfig, getComponentElements } from './utils.js';
import ChildrenManager from './managers/ChildrenManager.js';
import RefsManager from './managers/RefsManager.js';
import ServicesManager from './managers/ServicesManager.js';
import EventsManager from './managers/EventsManager.js';
import OptionsManager from './managers/OptionsManager.js';

// Define the __DEV__ constant if not defined
if (typeof __DEV__ === 'undefined') {
  if (typeof globalThis !== 'undefined') {
    globalThis.__DEV__ = false;
  } else if (typeof window !== 'undefined') {
    window.__DEV__ = false;
  }
}

let id = 0;

/**
 * @typedef {typeof Base} BaseComponent
 * @typedef {(Base) => Promise<BaseComponent | { default: BaseComponent }>} BaseAsyncComponent
 * @typedef {{ name: string, debug: boolean, log: boolean, [name:string]: any }} BaseOptions
 * @typedef {{ [name:string]: HTMLElement | HTMLElement[] }} BaseRefs
 * @typedef {{ [nameOrSelector:string]: Base[] | Promise<Base>[] }} BaseChildren
 * @typedef {{ [nameOrSelector:string]: BaseComponent | BaseAsyncComponent }} BaseConfigComponents
 * @typedef {import('./managers/OptionsManager').OptionsSchema} BaseConfigOptions
 * @typedef {import('./managers/ServicesManager.js').ServiceName} ServiceName
 */

/**
 * @typedef {Object} BaseConfig
 * @property {String} name
 * @property {Boolean} [debug]
 * @property {Boolean} [log]
 * @property {String[]} [refs]
 * @property {BaseConfigComponents} [components]
 * @property {BaseConfigOptions} [options]
 */

/**
 * Base class to easily create components.
 *
 * @example
 * ```js
 * class Component extends Base {
 *   static config = {
 *     name: 'Component',
 *     log: true,
 *   };
 *
 *   mounted() {
 *     this.$log('Component is mounted!');
 *   }
 * }
 *
 * class App extends Base {
 *   static config = {
 *     name: 'App',
 *     components: {
 *       Component,
 *     },
 *   };
 * }
 *
 * new App(document.body).$mount();
 * ```
 */
export default class Base {
  /**
   * The instance parent.
   * @type {Base}
   */
  $parent = null;

  /**
   * The instance id.
   * @type {string}
   */
  $id;

  /**
   * The root element.
   * @type {HTMLElement}
   */
  $el;

  /**
   * The instance services.
   * @type {ServicesManager}
   */
  $services;

  /**
   * The state of the component.
   * @type {Boolean}
   */
  $isMounted = false;

  /**
   * This is a Base instance.
   * @type {Boolean}
   */
  static $isBase = true;

  /**
   * Get properties to exclude from the autobind call.
   * @return {Array<String|RegExp>}
   */
  get _excludeFromAutoBind() {
    return [
      '$mount',
      '$update',
      '$destroy',
      '$terminate',
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
      'terminated',
    ];
  }

  /**
   * @deprecated Use the static `config` property instead.
   * @return {BaseConfig}
   */
  get config() {
    return null;
  }

  /** @type {BaseConfig} */
  static config;

  /**
   * @type {RefsManager}
   */
  #refs;

  /**
   * @return {RefsManager}
   */
  get $refs() {
    const refs = this.#refs;
    this.$emit('get:refs', refs);
    return refs;
  }

  /**
   * @type {OptionsManager}
   */
  #options;

  /**
   * @return {OptionsManager}
   */
  get $options() {
    const options = this.#options;
    this.$emit('get:options', options);
    return options;
  }

  /**
   * @type {ChildrenManager}
   */
  #children;

  /**
   * @return {ChildrenManager}
   */
  get $children() {
    if (__DEV__) {
      debug(this, 'before:getChildren', this.$el, getConfig(this).components);
    }

    const children = this.#children;
    this.$emit('get:children', children);

    if (__DEV__) {
      debug(this, 'after:getChildren', children);
    }

    return children;
  }

  /**
   * Class constructor where all the magic takes place.
   *
   * @param {HTMLElement} element The component's root element dd.
   */
  constructor(element) {
    if (!element) {
      throw new Error('The root element must be defined.');
    }

    const { config } = /** @type {BaseComponent} */ (this.constructor);

    if (!config) {
      throw new Error('The `config` static property must be defined.');
    }

    if (!config.name) {
      throw new Error('The `config.name` property is required.');
    }

    this.$id = `${config.name}-${id}`;
    id += 1;

    this.$el = element;

    if (!('__base__' in this.$el)) {
      Object.defineProperty(this.$el, '__base__', {
        get: () => this,
        configurable: true,
      });
    }

    // @todo implement getter with event get:options
    this.#options = new OptionsManager(element, config.options || {}, config);
    // @todo implement getter with event get:services
    this.$services = new ServicesManager(this);

    const eventsManager = new EventsManager(element, this);
    this.#children = new ChildrenManager(this, element, config.components || {}, eventsManager);
    this.#refs = new RefsManager(this, element, config.refs || [], eventsManager);

    // Autobind all methods to the instance
    // @todo Maybe remove for performance reason? This pattern can use a lot of memory when creating
    // a large number of instances.
    autoBind(this, {
      exclude: [...this._excludeFromAutoBind],
    });

    this.$on('mounted', () => {
      this.$children.registerAll();
      this.$refs.registerAll();
      eventsManager.bindRootElement();
      this.$services.enableAll();
      this.$children.mountAll();
      this.$isMounted = true;
    });

    this.$on('updated', () => {
      // Undo
      this.$refs.unregisterAll();
      this.$services.disableAll();

      // Redo
      this.$children.registerAll();
      this.$refs.registerAll();
      this.$services.enableAll();

      // Update
      this.$children.updateAll();
    });

    this.$on('destroyed', () => {
      this.$isMounted = false;
      eventsManager.unbindRootElement();
      this.$refs.unregisterAll();
      this.$services.disableAll();
      this.$children.destroyAll();
    });

    if (__DEV__) {
      debug(this, 'constructor', this);
    }
    return this;
  }

  /**
   * Small helper to log stuff.
   *
   * @return {(...args: any) => void} A log function if the log options is active.
   */
  get $log() {
    return this.$options.log
      ? window.console.log.bind(window, `[${this.$options.name}]`)
      : function noop() {};
  }

  /**
   * Trigger the `mounted` callback.
   */
  $mount() {
    if (__DEV__) {
      debug(this, '$mount');
    }

    callMethod(this, 'mounted');
    return this;
  }

  /**
   * Update the instance children.
   */
  $update() {
    if (__DEV__) {
      debug(this, '$update');
    }

    callMethod(this, 'updated');
    return this;
  }

  /**
   * Trigger the `destroyed` callback.
   */
  $destroy() {
    if (__DEV__) {
      debug(this, '$destroy');
    }

    callMethod(this, 'destroyed');
    return this;
  }

  /**
   * Terminate a child instance when it is not needed anymore.
   * @return {void}
   */
  $terminate() {
    if (__DEV__) {
      debug(this, '$terminate');
    }

    // First, destroy the component.
    this.$destroy();

    // Execute the `terminated` hook if it exists
    callMethod(this, 'terminated');

    // Delete the reference to the instance
    // delete this.$el.__base__;

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
   * @param  {String}      nameOrSelector The selector on which to mount each instance.
   * @return {Array<Base>}                A list of the created instance.
   */
  static $factory(nameOrSelector) {
    if (!nameOrSelector) {
      throw new Error(
        'The $factory method requires a component’s name or selector to be specified.'
      );
    }

    return getComponentElements(nameOrSelector).map((el) => new this(el).$mount());
  }

  /**
   * Bind a listener function to an event.
   *
   * @param  {string} event
   *   Name of the event.
   * @param  {EventListenerOrEventListenerObject} listener
   *   Function to be called.
   * @param {boolean|AddEventListenerOptions} [options]
   *   Options for the `removeEventListener` method.
   * @return {() => void}
   *   A function to unbind the listener.
   */
  $on(event, listener, options) {
    if (__DEV__) {
      debug(this, '$on', event, listener, options);
    }

    this.$el.addEventListener(event, listener, options);

    return () => {
      this.$off(event, listener, options);
    };
  }

  /**
   * Unbind a listener function from an event.
   *
   * @param {string} event
   *   Name of the event.
   * @param {EventListenerOrEventListenerObject} listener
   *   Function to be removed.
   * @param {boolean|EventListenerOptions} [options]
   *   Options for the `removeEventListener` method.
   *
   * @return {void}
   */
  $off(event, listener, options) {
    if (__DEV__) {
      debug(this, '$off', event, listener);
    }

    this.$el.removeEventListener(event, listener, options);
  }

  /**
   * Emits an event.
   *
   * @param  {string} event
   *   Name of the event.
   * @param  {any[]}        args  The arguments to apply to the functions bound to this event.
   * @return {void}
   */
  $emit(event, ...args) {
    this.$el.dispatchEvent(
      new CustomEvent(event, {
        detail: args,
      })
    );
  }

  /**
   * Bind a listener function to an event for one execution only.
   *
   * @param {string} event
   *   Name of the event.
   * @param {EventListenerOrEventListenerObject} listener
   *   Function to be called.
   * @param {boolean|AddEventListenerOptions} [options]
   *   Options for the `addEventListener` method.
   * @return {void}
   */
  $once(event, listener, options) {
    if (__DEV__) {
      debug(this, '$once', event, listener, options);
    }

    let normalizedOptions = {
      once: true,
    };

    if (typeof options === 'boolean') {
      normalizedOptions.capture = options;
    } else if (typeof options !== 'undefined') {
      normalizedOptions = {
        ...options,
        ...normalizedOptions,
      };
    }

    this.$on(event, listener, normalizedOptions);
  }
}
