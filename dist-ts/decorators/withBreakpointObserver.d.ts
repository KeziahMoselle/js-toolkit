declare function _default(BaseClass: any): {
    new (element: HTMLElement): {
        [x: string]: any;
        /**
         * Override the default $mount method to prevent component's from being
         * mounted when they should not.
         * @return {BreakpointObserver} The component's instance.
         */
        $mount(): any;
    };
    [x: string]: any;
};
export default _default;
