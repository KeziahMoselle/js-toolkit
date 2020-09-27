/**
 * Accordion class.
 */
export default class Accordion extends Base {
    constructor(element: import("../../abstracts/Base/types").BaseElement);
    /**
     * Init autoclose behavior on mounted.
     * @return {void}
     */
    mounted(): void;
    unbindMethods: (() => void)[];
    /**
     * Destroy autoclose behavior on destroyed.
     * @return {void}
     */
    destroyed(): void;
}
import Base from "../../abstracts/Base";
