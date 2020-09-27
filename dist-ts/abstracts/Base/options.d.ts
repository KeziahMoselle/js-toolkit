import { Base as BaseInterface, BaseElement, Options as OptionsInterface, Config as ConfigInterface } from './types';
/**
 * Get a component's options.
 *
 * @param  {Base}        instance The component's instance.
 * @param  {HTMLElement} element  The component's root element.
 * @param  {Object}      config   The component's default config.
 * @return {Object}               The component's merged options.
 */
export declare function getOptions(instance: BaseInterface, element: BaseElement, config: ConfigInterface): OptionsInterface;
/**
 * Set a component instance options.
 *
 * @param {Base}        instance   The component's instance.
 * @param {HTMLElement} element    The component's root element.
 * @param {Object}      newOptions The new options object.
 */
export declare function setOptions(instance: BaseInterface, element: BaseElement, newOptions: OptionsInterface): void;
declare const _default: {
    getOptions: typeof getOptions;
    setOptions: typeof setOptions;
};
export default _default;
