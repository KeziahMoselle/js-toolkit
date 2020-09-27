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
var throttle_1 = __importDefault(require("../utils/throttle"));
var debounce_1 = __importDefault(require("../utils/debounce"));
var nextFrame_1 = __importDefault(require("../utils/nextFrame"));
/**
 * Scroll service
 *
 * ```
 * import { useScroll } from '@studiometa/js-toolkit/services';
 * const { add, remove, props } = useScroll();
 * add(key, (props) => {});
 * remove(key);
 * props();
 * ```
 */
var Scroll = /** @class */ (function (_super) {
    __extends(Scroll, _super);
    function Scroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @type {Number} The y scroll position. */
        _this.y = window.pageYOffset;
        /** @type {Number} The y previous scroll position. */
        _this.yLast = window.pageYOffset;
        /** @type {Number} The x scroll position. */
        _this.x = window.pageXOffset;
        /** @type {Number} The x previous scroll position. */
        _this.xLast = window.pageXOffset;
        return _this;
    }
    /**
     * Bind the handler to the scroll event.
     *
     * @return {void}
     */
    Scroll.prototype.init = function () {
        var _this = this;
        var debounced = debounce_1.default(function () {
            _this.trigger(_this.props);
            nextFrame_1.default(function () {
                _this.trigger(_this.props);
            });
        }, 50);
        this.handler = throttle_1.default(function () {
            _this.trigger(_this.props);
            // Reset changed flags at the end of the scroll event
            debounced();
        }, 32).bind(this);
        // Fire the `scrolled` method on document scroll
        document.addEventListener('scroll', this.handler, { passive: true });
    };
    /**
     * Unbind the handler from the scroll event.
     *
     * @return {void}
     */
    Scroll.prototype.kill = function () {
        document.removeEventListener('scroll', this.handler);
    };
    Object.defineProperty(Scroll.prototype, "props", {
        /**
         * Get scroll props.
         *
         * @type {Object}
         */
        get: function () {
            this.yLast = this.y;
            this.xLast = this.x;
            // Check scroll Y
            if (window.pageYOffset !== this.y) {
                this.y = window.pageYOffset;
            }
            // Check scroll x
            if (window.pageXOffset !== this.x) {
                this.x = window.pageXOffset;
            }
            return {
                x: this.x,
                y: this.y,
                changed: {
                    x: this.x !== this.xLast,
                    y: this.y !== this.yLast,
                },
                last: {
                    x: this.xLast,
                    y: this.yLast,
                },
                delta: {
                    x: this.x - this.xLast,
                    y: this.y - this.yLast,
                },
                progress: {
                    x: this.max.x === 0 ? 1 : this.x / this.max.x,
                    y: this.max.y === 0 ? 1 : this.y / this.max.y,
                },
                max: this.max,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scroll.prototype, "max", {
        /**
         * Get scroll max values.
         *
         * @type {Object}
         */
        get: function () {
            return {
                x: (document.scrollingElement || document.body).scrollWidth - window.innerWidth,
                y: (document.scrollingElement || document.body).scrollHeight - window.innerHeight,
            };
        },
        enumerable: false,
        configurable: true
    });
    return Scroll;
}(Service_1.default));
var scroll = null;
exports.default = (function () {
    if (!scroll) {
        scroll = new Scroll();
    }
    var add = scroll.add.bind(scroll);
    var remove = scroll.remove.bind(scroll);
    var has = scroll.has.bind(scroll);
    var props = function () { return scroll.props; };
    return {
        add: add,
        remove: remove,
        has: has,
        props: props,
    };
});
//# sourceMappingURL=scroll.js.map