import { getComponentElements } from '../abstracts/Base/utils.js';

/**
 * @typedef {import('../abstracts/Base/index.js').default} Base
 */

/**
 * Import a component when it is visible.
 *
 * @param {() => Promise<Base>} fn
 *   The import function.
 * @param {string} nameOrSelector
 *   The name or selector for the component.
 * @param {typeof Base=} [parent]
 *   The parent component.
 * @param {IntersectionObserverInit=} [observerOptions]
 *   Options for the `IntersectionObserver` instance.
 *
 * @return {Promise<Base>}
 */
export default function importWhenVisible(fn, nameOrSelector, parent, observerOptions = {}) {
  return new Promise((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      const someEntriesAreVisible = entries.some((entry) => entry.isIntersecting);
      if (someEntriesAreVisible) {
        setTimeout(() => {
          fn().then((value) => {
            resolve(value);
            observer.disconnect();
          });
        }, 0);
      }
    }, observerOptions);

    const elements = getComponentElements(nameOrSelector, parent?.$el);
    elements.forEach((element) => observer.observe(element));
  });
}
