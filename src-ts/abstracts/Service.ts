export interface PropsInterface {
  [key: string]: unknown;
}

export interface ServiceInterface {
  callbacks: Record<string, Function>;
  isInit: boolean;
  readonly props: PropsInterface;
  init(): void;
  kill(): void;
  add(key: string, callback: Function): ServiceInterface;
  has(key: string): boolean;
  get(key: string): Function;
  remove(key: string): ServiceInterface;
  trigger(...args: unknown[]): ServiceInterface;
  [property: string]: unknown;
}

export interface PublicServiceInterface {
  add(key: string, callback: Function): ServiceInterface;
  remove(key: string): ServiceInterface;
  has(key: string): boolean;
  props(): unknown;
}

/**
 * Service abstract class
 */
export default class Service implements ServiceInterface {
  callbacks: Record<string, Function> = new Map();

  isInit = false;

  /**
   * Getter to get the services properties.
   * This getter MUST be implementer by the service extending this class.
   * @return {Object}
   */
  get props(): PropsInterface {
    return {};
  }

  /**
   * Method to initialize the service behaviors.
   * This method MUST be implemented by the service extending this class.
   *
   * @return {Service} The current instance
   */
  init(): void {
    throw new Error('The `init` method must be implemented.');
  }

  /**
   * Method to kill the service behaviors.
   * This method MUST be implemented by the service extending this class.
   *
   * @return {Service} The current instance
   */
  kill(): void {
    throw new Error('The `kill` method must be implemented.');
  }

  /**
   * Add a callback.
   *
   * @param  {String}   key      The callback's identifier
   * @param  {Function} callback The callback function
   * @return {Service}           The current instance
   */
  add(key: string, callback: Function): ServiceInterface {
    if (this.has(key)) {
      throw new Error(`A callback with the key \`${key}\` has already been registered.`);
    }

    // Initialize the service when we add the first callback
    if (this.callbacks.size === 0 && !this.isInit) {
      this.init();
      this.isInit = true;
    }

    this.callbacks.set(key, callback);
    return this;
  }

  /**
   * Test if a callback with the given key has already been added.
   *
   * @param  {String}  key The identifier to test
   * @return {Boolean}     Whether or not the identifier already exists
   */
  has(key: string): boolean {
    return this.callbacks.has(key);
  }

  /**
   * Get the callback tied to the given key.
   *
   * @param  {String}   key The identifier to get
   * @return {Function}     The callback function
   */
  get(key: string): Function {
    return this.callbacks.get(key);
  }

  /**
   * Remove the callback tied to the given key.
   *
   * @param  {String} key The identifier to remove
   * @return {Service}    The current instance
   */
  remove(key: string): ServiceInterface {
    this.callbacks.delete(key);

    // Kill the service when we remove the last callback
    if (this.callbacks.size === 0 && this.isInit) {
      this.kill();
      this.isInit = false;
    }

    return this;
  }

  /**
   * Trigger each added callback with the given arguments.
   *
   * @param  {Array}   args All the arguments to apply to the callback
   * @return {Service}      The current instance
   */
  trigger(...args: any[]): ServiceInterface {
    this.callbacks.forEach((callback: Function) => {
      callback(...args);
    });

    return this;
  }
}
