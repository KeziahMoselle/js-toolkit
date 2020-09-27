import { Base as BaseInterface } from './types';
/**
 * Mount children components of a given instance.
 *
 * @param  {Base} instance The parent component's instance.
 * @return {void}
 */
export declare function mountComponents(instance: BaseInterface): void;
/**
 * Destroy children components of a given instance.
 *
 * @param  {Base} instance The parent component's instance.
 * @return {void}
 */
export declare function destroyComponents(instance: BaseInterface): void;
