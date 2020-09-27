/**
 * Manage a list of style properties on an element.
 *
 * @param {HTMLElement}         element The element to update.
 * @param {CSSStyleDeclaration} styles  An object of styles properties and values.
 * @param {String}              method  The method to use: add or remove.
 */
export default function setStyles(element: HTMLElement, styles: CSSStyleDeclaration, method?: string): void;
/**
 * Add class names to an element.
 *
 * @param {HTMLElement} element    The element to update.
 * @param {String}      styles A string of class names.
 * @return {void}
 */
export declare function add(element: HTMLElement, styles: CSSStyleDeclaration): void;
/**
 * Remove class names from an element.
 *
 * @param  {HTMLElement} element    The element to update.
 * @param  {String}      styles A string of class names.
 * @return {void}
 */
export declare function remove(element: HTMLElement, styles: CSSStyleDeclaration): void;
