/**
 * Modal class.
 */
export default class Modal extends Base {
    constructor(element: import("../abstracts/Base/types").BaseElement);
    /**
     * Open the modal on click on the `open` ref.
     *
     * @return {Function} The component's `open` method.
     */
    get onOpenClick(): Function;
    /**
     * Close the modal on click on the `close` ref.
     *
     * @return {Function} The component's `close` method.
     */
    get onCloseClick(): Function;
    /**
     * Close the modal on click on the `overlay` ref.
     *
     * @return {Function} The component's `close` method.
     */
    get onOverlayClick(): Function;
    /**
     * Initialize the component's behaviours.
     *
     * @return {Modal} The current instance.
     */
    mounted(): Modal;
    isOpen: boolean;
    refModalPlaceholder: Comment;
    refModalParentBackup: any;
    refModalUnbindGetRefFilter: import("../abstracts/EventManager").EventManagerListener;
    /**
     * Unbind all events on destroy.
     *
     * @return {Modal} The Modal instance.
     */
    destroyed(): Modal;
    /**
     * Close the modal on `ESC` and trap the tabulation.
     *
     * @param  {KeyboardEvent} options.event  The original keyboard event
     * @param  {Boolean}       options.isUp   Is it a keyup event?
     * @param  {Boolean}       options.isDown Is it a keydown event?
     * @param  {Boolean}       options.ESC    Is it the ESC key?
     * @return {void}
     */
    keyed({ event, isUp, isDown, ESC }: KeyboardEvent): void;
    /**
     * Open the modal.
     *
     * @return {Modal} The Modal instance.
     */
    open(): Modal;
    /**
     * Close the modal.
     *
     * @return {Modal} The Modal instance.
     */
    close(): Modal;
}
import Base from "../abstracts/Base";
