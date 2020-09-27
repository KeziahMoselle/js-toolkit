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
var Service_1 = __importDefault(require("../abstracts/Service"));
var debounce_1 = __importDefault(require("../utils/debounce"));
var ResizeOrientation;
(function (ResizeOrientation) {
    ResizeOrientation["Square"] = "square";
    ResizeOrientation["Portrait"] = "portrait";
    ResizeOrientation["Landscape"] = "landscape";
})(ResizeOrientation || (ResizeOrientation = {}));
/**
 * Resize service
 *
 * ```
 * import { useResize } from '@studiometa/js/services';
 * const { add, remove, props } = useResize();
 * add(key, (props) => {});
 * remove(key);
 * props();
 * ```
 */
var Resize = /** @class */ (function (_super) {
    __extends(Resize, _super);
    function Resize() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Bind the handler to the resize event.
     *
     * @return {void}
     */
    Resize.prototype.init = function () {
        var _this = this;
        this.handler = debounce_1.default(function () {
            _this.trigger(_this.props);
        }).bind(this);
        if (this.canUseResizeObserver) {
            // @ts-ignore
            this.resizeObserver = new ResizeObserver(this.handler);
            this.resizeObserver.observe(document.documentElement);
        }
        else {
            window.addEventListener('resize', this.handler);
        }
    };
    /**
     * Unbind the handler from the resize event.
     *
     * @return {void}
     */
    Resize.prototype.kill = function () {
        if (this.canUseResizeObserver) {
            this.resizeObserver.disconnect();
        }
        else {
            window.removeEventListener('resize', this.handler);
        }
        delete this.resizeObserver;
    };
    Object.defineProperty(Resize.prototype, "props", {
        /**
         * Get resize props.
         *
         * @type {Object}
         */
        get: function () {
            var props = {
                width: window.innerWidth,
                height: window.innerHeight,
                ratio: window.innerWidth / window.innerHeight,
                orientation: ResizeOrientation.Square,
            };
            if (props.ratio > 1) {
                props.orientation = ResizeOrientation.Landscape;
            }
            if (props.ratio < 1) {
                props.orientation = ResizeOrientation.Portrait;
            }
            if (this.breakpointElement) {
                props.breakpoint = this.breakpoint;
                props.breakpoints = this.breakpoints;
            }
            return props;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resize.prototype, "breakpointElement", {
        /**
         * The element holding the breakpoints data.
         * @return {HTMLElement}
         */
        get: function () {
            return document.querySelector('[data-breakpoint]') || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resize.prototype, "breakpoint", {
        /**
         * Get the current breakpoint.
         * @return {String}
         */
        get: function () {
            return window
                .getComputedStyle(this.breakpointElement, '::before')
                .getPropertyValue('content')
                .replace(/"/g, '');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resize.prototype, "breakpoints", {
        /**
         * Get all breakpoints.
         * @return {Array}
         */
        get: function () {
            var breakpoints = window
                .getComputedStyle(this.breakpointElement, '::after')
                .getPropertyValue('content')
                .replace(/"/g, '');
            return breakpoints.split(',');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resize.prototype, "canUseResizeObserver", {
        /**
         * Test if we can use the `ResizeObserver` API.
         * @return {Boolean}
         */
        get: function () {
            // @ts-ignore
            return typeof window.ResizeObserver !== 'undefined';
        },
        enumerable: false,
        configurable: true
    });
    return Resize;
}(Service_1.default));
var resize = null;
exports.default = (function () {
    if (!resize) {
        resize = new Resize();
    }
    var add = resize.add.bind(resize);
    var remove = resize.remove.bind(resize);
    var has = resize.has.bind(resize);
    var props = function () { return resize.props; };
    return {
        add: add,
        remove: remove,
        has: has,
        props: props,
    };
});
//# sourceMappingURL=resize.js.map