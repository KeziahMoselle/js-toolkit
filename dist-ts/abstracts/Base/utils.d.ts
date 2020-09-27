import { Base as BaseInterface } from './types';
/**
 * Verbose debug for the component.
 *
 * @param  {...any} args The arguments passed to the method
 * @return {void}
 */
export declare function debug(instance: BaseInterface, ...args: unknown[]): Console | boolean;
/**
 * Test if an object has a method.
 *
 * @param  {Object}  obj The object to test
 * @param  {String}  fn  The method's name
 * @return {Boolean}
 */
export declare function hasMethod(obj: BaseInterface, name: string): boolean;
/**
 * Call the given method while applying the given arguments.
 *
 * @param {String} method The method to call
 * @param {...any} args   The arguments to pass to the method
 */
export declare function callMethod(instance: BaseInterface, method: string, ...args: unknown[]): BaseInterface;
