export interface TransitionElement extends HTMLElement {
    __isTransitioning__?: boolean;
    __transitionEndHandler__?: EventListener;
}
export interface Transition {
    from?: string | CSSStyleDeclaration;
    active?: string | CSSStyleDeclaration;
    to?: string | CSSStyleDeclaration;
}
/**
 * Update either the classes or the styles of an element with the given method.
 *
 * @param {HTMLElement}   element         The element to update.
 * @param {String|Object} classesOrStyles The classes or styles to apply.
 * @param {String}        method          The method to use, one of `add` or `remove`.
 */
export declare function setClassesOrStyles(element: TransitionElement, classesOrStyles: undefined | string | CSSStyleDeclaration, method?: string): void;
/**
 * Manage CSS transition with class.
 *
 * This is heavily inspired by the Vue `<transition>` component
 * and the `@barba/css` package, many thanks to them!
 *
 * @param  {HTMLElement}   element The target element.
 * @param  {String|Object} name    The name of the transition or an object with the hooks classesOrStyles.
 * @param  {String}        endMode Whether to remove or keep the `to` classes/styles
 * @return {Promise}               A promise resolving at the end of the transition.
 */
export default function transition(element: TransitionElement, name: string | Transition, endMode?: string): Promise<void>;
