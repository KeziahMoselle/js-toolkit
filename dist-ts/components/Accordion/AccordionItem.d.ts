/**
 * AccordionItem class.
 */
export default class AccordionItem extends Base {
    constructor(element: import("../../abstracts/Base/types").BaseElement);
    /**
     * Add aria-attributes on mounted.
     * @return {void}
     */
    mounted(): void;
    isOpen: any;
    /**
     * Handler for the click event on the `btn` ref.
     * @return {void}
     */
    onBtnClick(): void;
    /**
     * Get the content ID.
     * @return {String}
     */
    get contentId(): string;
    /**
     * Update the refs' attributes according to the given type.
     *
     * @param  {Boolean} isOpen The state of the item.
     * @return {void}
     */
    updateAttributes(isOpen: boolean): void;
    /**
     * Open an item.
     * @return {void}
     */
    open(): void;
    /**
     * Close an item.
     * @return {void}
     */
    close(): void;
}
import Base from "../../abstracts/Base";
