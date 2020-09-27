/**
 * Tabs class.
 */
export default class Tabs extends Base {
    constructor(element: import("../abstracts/Base/types").BaseElement);
    /**
     * Initialize the component's behaviours.
     *
     * @return {Tabs} The current instance.
     */
    mounted(): Tabs;
    items: any;
    /**
     * Switch tab on button click.
     *
     * @param  {Event}  event The click event object.
     * @param  {Number} index The index of the clicked button.
     * @return {void}
     */
    onBtnClick(event: Event, index: number): void;
    /**
     * Enable the given tab and its associated content.
     *
     * @param  {HTMLElement} btn     The tab element.
     * @param  {HTMLElement} content The content element.
     * @return {Tabs}                The Tabs instance.
     */
    enableItem(item: any): Tabs;
    /**
     * Disable the given tab and its associated content.
     *
     * @param  {HTMLElement} btn     The tab element.
     * @param  {HTMLElement} content The content element.
     * @return {Tabs}                The Tabs instance.
     */
    disableItem(item: any): Tabs;
}
import Base from "../abstracts/Base";
