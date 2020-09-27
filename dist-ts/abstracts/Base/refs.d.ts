import { Base as BaseInterface, BaseElement, Refs as RefsInterface } from './types';
/**
 * Get all refs of a component.
 *
 * @param  {Base}        instance The component's instance.
 * @param  {HTMLElement} element  The component's root element.
 * @return {Object}               Return an object containing all the component's refs.
 */
export declare function getRefs(instance: BaseInterface, element: BaseElement): RefsInterface;
declare const _default: {
    getRefs: typeof getRefs;
};
export default _default;
