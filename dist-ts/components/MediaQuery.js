"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Base_1 = __importDefault(require("../abstracts/Base"));
var resize_1 = __importDefault(require("../services/resize"));
var nextFrame_1 = __importDefault(require("../utils/nextFrame"));
/**
 * MediaQuery component.
 *
 * <div data-component="MediaQuery" data-active-breakpoints="l xl">
 *   <div data-component="Foo"></div>
 * </div>
 */
var MediaQuery = /** @class */ (function (_super) {
    __extends(MediaQuery, _super);
    function MediaQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MediaQuery.prototype, "config", {
        /**
         * Component's configuration.
         *
         * @return {Object}
         */
        get: function () {
            return {
                name: 'MediaQuery',
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Mounted hook.
     */
    MediaQuery.prototype.mounted = function () {
        var _this = this;
        this.test();
        nextFrame_1.default(function () { return _this.test(); });
    };
    /**
     * Resized hook.
     */
    MediaQuery.prototype.resized = function () {
        this.test();
    };
    Object.defineProperty(MediaQuery.prototype, "child", {
        /**
         * Get the first element child of the component, as it must be another Base component that could
         * be either $mounted or $destroyed.
         *
         * @return {Base|Boolean}
         */
        get: function () {
            var child = this.$el.firstElementChild ? this.$el.firstElementChild.__base__ : false;
            if (!child) {
                throw new Error('The first and only child of the MediaQuery component must be another Base component.');
            }
            return child;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaQuery.prototype, "currentBreakpoint", {
        /**
         * Get the current active breakpoint from the `useResize` service.
         *
         * @return {String}
         */
        get: function () {
            return resize_1.default().props().breakpoint;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaQuery.prototype, "activeBreakpoints", {
        /**
         * Get a list of breakpoints in which the child component should be $mounted.
         *
         * @return {Array}
         */
        get: function () {
            if (this.$el.dataset.activeBreakpoints) {
                return this.$el.dataset.activeBreakpoints.split(' ');
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Test if the child component should be either $mounted or $destroyed based on the current active
     * breakpoint and the given list of breakpoints.
     *
     * @return {void}
     */
    MediaQuery.prototype.test = function () {
        var isInBreakpoints = this.activeBreakpoints.includes(this.currentBreakpoint);
        if (isInBreakpoints && !this.child.$isMounted) {
            this.child.$mount();
            return;
        }
        if (!isInBreakpoints && this.child.$isMounted) {
            this.child.$destroy();
        }
    };
    return MediaQuery;
}(Base_1.default));
exports.default = MediaQuery;
//# sourceMappingURL=MediaQuery.js.map