import getAllProperties from '../../../utils/object/getAllProperties.js';

/**
 * @typedef {import('../index.js').default} Base
 * @typedef {import('./RefsManager.js').default} RefsManager
 * @typedef {import('./ChildrenManager.js').default} ChildrenManager
 */

/**
 * Event management class.
 */
export default class EventsManager {
  /**
   * @type {HTMLElement}
   * @private
   */
  __rootElement;

  /**
   * @type {Base}
   * @private
   */
  __base;

  /**
   * @type {WeakMap}
   * @private
   */
  __methodsCache = new WeakMap();

  /**
   * Class constructor.
   *
   * @param {HTMLElement} rootElement
   * @param {Base} base
   */
  constructor(rootElement, base) {
    this.__rootElement = rootElement;
    this.__base = base;
  }

  /**
   * Manage a ref event methods.
   *
   * @param  {string} name
   *   The name of the ref.
   * @param  {HTMLElement[]} elements
   *   The elements of the ref.
   * @param  {'add'|'remove'} [mode]
   *   The action to perform: add or remove the event listeners.
   *
   * @return {void}
   * @private
   */
  __manageRef(name, elements, mode = 'add') {
    const action = `${mode}EventListener`;
    const methods = this.__getEventMethodsByName(name);
    methods.forEach((method) => {
      const event = this.__getEventNameByMethod(method, name);
      elements.forEach((element) => element[action](event, this.__base[method]));
    });
  }

  /**
   * Bind event methods to the given ref elements.
   *
   * @param {string} name
   *   The name of the ref.
   * @param {HTMLElement[]} elements
   *   The elements of the ref.
   *
   * @return {void}
   */
  bindRef(name, elements) {
    this.__manageRef(name, elements);
  }

  /**
   * Bind event methods to the given ref elements.
   *
   * @param {string} name
   *   The name of the ref.
   * @param {HTMLElement[]} elements
   *   The elements of the ref.
   *
   * @return {void}
   */
  unbindRef(name, elements) {
    this.__manageRef(name, elements, 'remove');
  }

  /**
   * Manage event methods to the given child instance.
   *
   * @param {string} name
   *   The name of the ref.
   * @param {Base} instance
   *   A base instance.
   * @param {'add'|'remove'} [mode]
   *   The action to perform: add or remove the event listeners.
   *
   * @return {void}
   * @private
   */
  __manageChild(name, instance, mode = 'add') {
    const action = mode === 'add' ? '$on' : '$off';
    const methods = this.__getEventMethodsByName(name);
    methods.forEach((method) => {
      const event = this.__getEventNameByMethod(method, name);
      instance[action](event, this.__base[method]);
    });
  }

  /**
   * Bind event methods to the given child instance.
   *
   * @param {string} name
   *   The name of the ref.
   * @param {Base} instance
   *   A base instance.
   *
   * @return {void}
   */
  bindChild(name, instance) {
    this.__manageChild(name, instance);
  }

  /**
   * Unbind event methods to the given child instance.
   *
   * @param {string} name
   *   The name of the ref.
   * @param {Base} instance
   *   A base instance.
   *
   * @return {void}
   */
  unbindChild(name, instance) {
    this.__manageChild(name, instance, 'remove');
  }

  /**
   * Manage event methods on the root element.
   *
   * @param {'add'|'remove'} [mode]
   *   The action to perform: add or remove the event listeners.
   *
   * @return {void}
   * @private
   */
  __manageRootElement(mode = 'add') {
    const modeMethod = `${mode}EventListener`;
    const methods = this.__getEventMethodsByName();
    methods.forEach((method) => {
      const event = this.__getEventNameByMethod(method);
      this.__rootElement[modeMethod](event, this.__base[method]);
    });
  }

  /**
   * Bind event methods on the root element.
   *
   * @return {void}
   */
  bindRootElement() {
    this.__manageRootElement();
  }

  /**
   * Unbind event method from the root element.
   *
   * @return {void}
   */
  unbindRootElement() {
    this.__manageRootElement('remove');
  }

  /**
   * Get the event name from the given method and its tied ref or children name.
   *
   * @param {string} method
   * @param {string} name
   * @return {string}
   * @private
   */
  __getEventNameByMethod(method, name = '') {
    const normalizedName = EventsManager.normalizeName(name);
    const regex = new RegExp(`^on${normalizedName}([A-Z].*)$`);
    const [, event] = method.match(regex);
    return EventsManager.normalizeEventName(event);
  }

  /**
   * Get the base instance methods matching the `onSomething` pattern.
   *
   * @param {string} [name]
   * @return {string[]}
   * @private
   */
  __getEventMethodsByName(name = '') {
    const normalizedName = EventsManager.normalizeName(name);
    const regex = new RegExp(`^on${normalizedName}[A-Z].*$`);

    let methods = this.__methodsCache.get(regex);

    if (!methods) {
      methods = getAllProperties(this.__base, [], (method) => regex.test(method));
      this.__methodsCache.set(regex, methods);
    }

    return methods.reduce((acc, [method]) => {
      if (!acc.includes(method)) {
        acc.push(method);
      }
      return acc;
    }, []);
  }

  /**
   * Normalize the given name to PascalCase, such as:
   *
   * ```
   * sentence case         => SentenceCase
   * lowercase             => Lowercase
   * UPPERCASE             => Uppercase
   * kebab-case            => KebabCase
   * snake_case            => SnakeCase
   * camelCase             => CamelCase
   * PascalCase            => PascalCase
   * .class-selector       => ClassSelector
   * .bem__selector        => BemSelector
   * __id-selector          => IdSelector
   * .complex[class^ ="__"] => ComplexClass
   * ```
   *
   * @param {string} name
   * @return {string}
   */
  static normalizeName(name) {
    return name
      .replace(/[A-Z]([A-Z].*)/g, (c) => c.toLowerCase())
      .replace(/[^a-zA-Z\d\s:]/g, ' ')
      .replace(/(^\w|\s+\w)/g, (c) => c.trim().toUpperCase())
      .trim();
  }

  /**
   * Normalize the event names from PascalCase to kebab-case.
   *
   * @param {string} name
   * @return {string}
   */
  static normalizeEventName(name) {
    return name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`).replace(/^-/, '');
  }
}
