/**
 * Get a list of elements based on the name of a component.
 * @param  {String}             nameOrSelector The name or selector to used for this component.
 * @param  {HTMLElement}        element        The root element on which to query the selector, defaults to `document`.
 * @return {Array<HTMLElement>}                A list of elements on which the component should be mounted.
 */
export declare function getComponentElements(nameOrSelector: any, element?: Document): Element[];
/**
 * Get child components.
 * @param  {Base}        instance   The component's instance.
 * @param  {HTMLElement} element    The component's root element
 * @param  {Object}      components The children components' classes
 * @return {null|Object}            Returns `null` if no child components are defined or an object of all child component instances
 */
export declare function getChildren(instance: any, element: any, components: any): {};
declare const _default: {
    getChildren: typeof getChildren;
};
export default _default;
