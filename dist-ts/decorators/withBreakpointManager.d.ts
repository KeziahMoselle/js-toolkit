declare function _default(BaseClass: any, breakpoints: any): {
    new (element: HTMLElement): {
        [x: string]: any;
        /**
         * Override the default $mount method to prevent component's from being
         * mounted when they should not.
         * @return {Base} The Base instance.
         */
        $mount(): any;
        /**
         * Destroy all instances when the main one is destroyed.
         * @return {Base} The Base instance.
         */
        $destroy(): any;
    };
    [x: string]: any;
};
export default _default;
