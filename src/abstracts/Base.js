import nanoid from 'nanoid';
import EventManager from './EventManager';
import { useScroll, useResize, useRaf, usePointer } from '../services';
import { hasMethod } from '../utils';

/**
 * Verbose debug for the component.
 * @param  {...any} args The arguments passed to the method
 * @return {void}
 */
function debug(instance, ...args) {
  return instance.$options.debug
    ? window.console.log.apply(window, [instance.config.name, ...args])
    : () => {};
}

/**
 * Get all refs of a component.
 *
 * @param {HTMLElement}  element The component's root element
 * @param {String}       name    The component's name
 * @return {null|Object}         Returns `null` if no refs were found or an object of references
 */
function getRefs(element, name) {
  const elements = Array.from(element.querySelectorAll(`[data-ref^="${name}."]`));

  if (elements.length === 0) {
    return null;
  }

  return elements.reduce(($refs, $ref) => {
    const refName = $ref.dataset.ref.replace(`${name}.`, '');
    if ($refs[refName]) {
      if (Array.isArray($refs[refName])) {
        $refs[refName].push($ref);
      } else {
        $refs[refName] = [$refs[refName], $ref];
      }
    } else {
      $refs[refName] = $ref;
    }

    return $refs;
  }, {});
}

/**
 *
 * @param  {HTMLElement} element    The component's root element
 * @param  {Object}      components The children components' classes
 * @return {null|Object}            Returns `null` if no child components are defined or an object of all child component instances
 */
function getChildren(element, components) {
  if (!components) {
    return null;
  }

  return Object.entries(components).reduce((acc, [name, ComponentClass]) => {
    const { config } = ComponentClass.prototype || {};
    const selector = config.el || `[data-component="${name}"]`;
    const elements = Array.from(element.querySelectorAll(selector));

    if (elements.length === 0) {
      return acc;
    }

    acc[name] = elements.map(el => {
      const { options } = el.dataset;
      return new ComponentClass(el, options);
    });

    return acc;
  }, {});
}

/**
 * Call the given method while applying the given arguments.
 *
 * @param {String} method The method to call
 * @param {...any} args   The arguments to pass to the method
 */
function call(instance, method, ...args) {
  debug(instance, 'call', method, ...args);

  if (!hasMethod(instance, method)) {
    return instance;
  }

  // Prevent duplicate call of `created` and `destroyed`
  // methods based on the component status
  if (
    (method === 'destroyed' && !instance.$isMounted) ||
    (method === 'created' && instance.$isMounted)
  ) {
    return instance;
  }

  instance.$emit(method, ...args);
  instance[method].call(instance, ...args);
  debug(instance, method, instance, ...args);

  return instance;
}

/**
 * Tie the components' `created` method to the instance
 */
function mountComponents(instance) {
  if (!instance.$children) {
    return;
  }
  debug(instance, 'mountComponents', instance.$children);

  Object.values(instance.$children).forEach($child => {
    if (Array.isArray($child)) {
      $child.forEach(c => {
        c.$mount();
      });
    } else {
      $child.$mount();
    }
  });
}

/**
 * Tie the components' `destroyed` method to the instance.
 *
 * @param  {Base} instance The base instance.
 * @return {void}
 */
function destroyComponents(instance) {
  if (!instance.$children) {
    return;
  }
  debug(instance, 'destroyComponents', instance.$children);

  Object.values(instance.$children).forEach($child => {
    $child.destroy();
  });
}

/**
 * Page lifecycle class
 *
 * @method created   Fired when the class is instantiated
 * @method loaded    Fired on the window's load event
 * @method ticked    Fired each frame with `requestAnimationFrame`
 * @method resized   Fired when the window is resized (`resize` event)
 * @method moved     Fired when the pointer has moved (`touchmove` and `mousemove` events)
 * @method scrolled  Fired with debounce when the document is scrolled (`scroll` event)
 * @method destroyed Fired when the window is being unloaded (`unload` event)
 */
export default class Base extends EventManager {
  /**
   * Class constructor where all the magic takes place
   * @param  {Object}    options An option object
   * @return {Base}         The created instance
   */
  constructor(element) {
    super();

    if (!this.config) {
      throw new Error('The `config` getter must be defined.');
    }

    if (!this.config.name) {
      throw new Error('The `config.name` property is required.');
    }

    this.$isMounted = false;
    this.$id = `${this.config.name}-${nanoid()}`;
    this.$el = element || document.querySelector(this.config.el);

    if (!this.$el) {
      throw new Error('Unable to find the root element.');
    }

    this.$options = { ...this.config, ...(element.dataset.options || {}) };

    debug(this, 'constructor', this);

    const $refs = getRefs(this.$el, this.config.name);
    if ($refs) {
      this.$refs = $refs;
    }

    const $children = getChildren(this.$el, this.config.components);
    if ($children) {
      this.$children = $children;
    }

    // Fire the `loaded` method on window load
    if (hasMethod(this, 'loaded')) {
      window.addEventListener('load', event => {
        call(this, 'loaded', { event });
      });
    }

    // Fire the `scrolled` method on window/document scroll
    if (hasMethod(this, 'scrolled')) {
      const { add } = useScroll();
      add(this.$id, (...args) => {
        call(this, 'scrolled', ...args);
      });
    }

    // Fire the `resized` method on window resize
    if (hasMethod(this, 'resized')) {
      const { add } = useResize();
      add(this.$id, (...args) => {
        call(this, 'resized', ...args);
      });
    }

    // Fire the `ticked` method on each frame
    if (hasMethod(this, 'ticked')) {
      const { add } = useRaf();
      add(this.$id, (...args) => {
        call(this, 'ticked', ...args);
      });
    }

    // Fire the `ticked` method on each frame
    if (hasMethod(this, 'moved')) {
      const { add } = usePointer();
      add(this.$id, (...args) => {
        call(this, 'moved', ...args);
      });
    }

    // Fire the `destroyed` method on window unload
    if (hasMethod(this, 'destroyed')) {
      window.addEventListener('beforeunload', () => {
        call(this, 'destroyed', this.options);
      });
    }

    this.$on('created', () => {
      mountComponents(this);
      this.$isMounted = true;
    });

    // Fire the `created` method on the next frame so the class
    // properties are correctly loaded
    requestAnimationFrame(() => {
      this.$mount();
    });

    this.$on('destroyed', () => {
      this.$isMounted = false;
      destroyComponents(this);
    });

    return this;
  }

  /**
   * Small helper to log stuff.
   *
   * @param  {...any} args The arguments passed to the method
   * @return {void}
   */
  $log(...args) {
    return this.$options.log
      ? window.console.log.apply(window, [this.config.name, ...args])
      : () => {};
  }

  /**
   * Trigger the `created` callback.
   */
  $mount() {
    debug(this, '$mount');
    call(this, 'mounted');
  }

  /**
   * Trigger the `destroyed` callback.
   */
  $destroy() {
    debug(this, '$destroy');
    call(this, 'destroyed');
  }
}
