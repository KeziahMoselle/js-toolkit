/**
 * MediaQuery component.
 *
 * <div data-component="MediaQuery" data-active-breakpoints="l xl">
 *   <div data-component="Foo"></div>
 * </div>
 */
export default class MediaQuery extends Base {
    constructor(element: import("../abstracts/Base/types").BaseElement);
    /**
     * Mounted hook.
     */
    mounted(): void;
    /**
     * Resized hook.
     */
    resized(): void;
    /**
     * Get the first element child of the component, as it must be another Base component that could
     * be either $mounted or $destroyed.
     *
     * @return {Base|Boolean}
     */
    get child(): boolean | Base;
    /**
     * Get the current active breakpoint from the `useResize` service.
     *
     * @return {String}
     */
    get currentBreakpoint(): string;
    /**
     * Get a list of breakpoints in which the child component should be $mounted.
     *
     * @return {Array}
     */
    get activeBreakpoints(): any[];
    /**
     * Test if the child component should be either $mounted or $destroyed based on the current active
     * breakpoint and the given list of breakpoints.
     *
     * @return {void}
     */
    test(): void;
}
import Base from "../abstracts/Base";
