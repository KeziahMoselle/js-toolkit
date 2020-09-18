import isObject from '../object/isObject';

/**
 * Manage a list of style properties on an element.
 *
 * @param {HTMLElement}         element The element to update.
 * @param {CSSStyleDeclaration} styles  An object of styles properties and values.
 * @param {String}              method  The method to use: add or remove.
 */
export default function setStyles(element:HTMLElement, styles:CSSStyleDeclaration, method = 'add') {
  if (!element || !styles || !isObject(styles)) {
    return;
  }

  Object.entries(styles).forEach(([ prop, value ]:[string,string]) => {
    element.style[prop] = method === 'add' ? value : '';
  });
}

/**
 * Add class names to an element.
 *
 * @param {HTMLElement} element    The element to update.
 * @param {String}      styles A string of class names.
 * @return {void}
 */
export function add(element:HTMLElement, styles:CSSStyleDeclaration) {
  setStyles(element, styles);
}

/**
 * Remove class names from an element.
 *
 * @param  {HTMLElement} element    The element to update.
 * @param  {String}      styles A string of class names.
 * @return {void}
 */
export function remove(element:HTMLElement, styles:CSSStyleDeclaration) {
  setStyles(element, styles, 'remove');
}
