import merge from 'deepmerge';

import {
  Base as BaseInterface,
  BaseElement,
  Options as OptionsInterface,
  Config as ConfigInterface,
} from './types';

/**
 * Get a component's options.
 *
 * @param  {Base}        instance The component's instance.
 * @param  {HTMLElement} element  The component's root element.
 * @param  {Object}      config   The component's default config.
 * @return {Object}               The component's merged options.
 */
export function getOptions(
  instance: BaseInterface,
  element: BaseElement,
  config: ConfigInterface,
): OptionsInterface {
  let options = {};
  if (element.dataset.options) {
    try {
      options = JSON.parse(element.dataset.options);
    } catch (err) {
      throw new Error('Can not parse the `data-options` attribute. Is it a valid JSON string?');
    }
  }

  options = merge(config, options);
  instance.$emit('get:options', options);
  return options;
}

/**
 * Set a component instance options.
 *
 * @param {Base}        instance   The component's instance.
 * @param {HTMLElement} element    The component's root element.
 * @param {Object}      newOptions The new options object.
 */
export function setOptions(
  instance: BaseInterface,
  element: BaseElement,
  newOptions: OptionsInterface,
): void {
  let options = {};
  if (element.dataset.options) {
    try {
      options = JSON.parse(element.dataset.options);
    } catch (err) {
      throw new Error('Can not parse the `data-options` attribute. Is it a valid JSON string?');
    }
  }
  options = merge(options, newOptions);
  element.dataset.options = JSON.stringify(options);
}

export default {
  getOptions,
  setOptions,
};
