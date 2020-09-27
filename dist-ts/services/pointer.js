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
var raf_1 = __importDefault(require("./raf"));
/**
 * Pointer service
 *
 * ```
 * import { usePointer } from '@studiometa/js/services';
 * const { add, remove, props } = usePointer();
 * add(key, (props) => {});
 * remove(key);
 * props();
 * ```
 */
var Pointer = /** @class */ (function (_super) {
    __extends(Pointer, _super);
    function Pointer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @type {Boolean} State of the pointer. */
        _this.isDown = false;
        /** @type {Number} The y pointer position. */
        _this.y = window.innerHeight / 2;
        /** @type {Number} The y previous pointer position. */
        _this.yLast = window.innerHeight / 2;
        /** @type {Number} The x pointer position. */
        _this.x = window.innerWidth / 2;
        /** @type {Number} The x previous pointer position. */
        _this.xLast = window.innerWidth / 2;
        /** @type {Boolean} True if the requestAnimationFrame loop is running. */
        _this.hasRaf = false;
        return _this;
    }
    /**
     * Bind the handler to the mousemove and touchmove events.
     * Bind the up and down handler to the mousedown, mouseup, touchstart and touchend events.
     *
     * @return {void}
     */
    Pointer.prototype.init = function () {
        var _this = this;
        var _a = raf_1.default(), add = _a.add, remove = _a.remove;
        this.hasRaf = false;
        var debounced = debounce_1.default(function (event) {
            _this.updateValues(event);
            remove('usePointer');
            _this.trigger(_this.props);
            _this.hasRaf = false;
        }, 50);
        this.handler = throttle_1.default(function (event) {
            _this.updateValues(event);
            if (!_this.hasRaf) {
                add('usePointer', function () {
                    _this.trigger(_this.props);
                });
                _this.hasRaf = true;
            }
            // Reset changed flags at the end of the mousemove or touchmove event
            debounced(event);
        }, 32).bind(this);
        this.downHandler = this.downHandler.bind(this);
        this.upHandler = this.upHandler.bind(this);
        document.documentElement.addEventListener('mouseenter', this.handler, { once: true });
        document.addEventListener('mousemove', this.handler, { passive: true });
        document.addEventListener('touchmove', this.handler, { passive: true });
        document.addEventListener('mousedown', this.downHandler, { passive: true });
        document.addEventListener('touchstart', this.downHandler, { passive: true });
        document.addEventListener('mouseup', this.upHandler, { passive: true });
        document.addEventListener('touchend', this.upHandler, { passive: true });
    };
    /**
     * Unbind all handlers from their bounded event.
     *
     * @return {void}
     */
    Pointer.prototype.kill = function () {
        document.removeEventListener('mousemove', this.handler);
        document.removeEventListener('touchmove', this.handler);
        document.removeEventListener('mousedown', this.downHandler);
        document.removeEventListener('touchstart', this.downHandler);
        document.removeEventListener('mouseup', this.upHandler);
        document.removeEventListener('touchend', this.upHandler);
    };
    /**
     * Handler for the pointer's down action.
     *
     * @return {void}
     */
    Pointer.prototype.downHandler = function () {
        this.isDown = true;
        this.trigger(this.props);
    };
    /**
     * Handler for the pointer's up action.
     *
     * @return {void}
     */
    Pointer.prototype.upHandler = function () {
        this.isDown = false;
        this.trigger(this.props);
    };
    /**
     * Update the pointer positions.
     *
     * @param  {Event} event The event object.
     * @return {void}
     */
    Pointer.prototype.updateValues = function (event) {
        this.yLast = this.y;
        this.xLast = this.x;
        // Check pointer Y
        // We either get data from a touch event `event.touches[0].clientY` or from
        // a mouse event `event.clientY`.
        if (((event.touches || [])[0] || event || {}).clientY !== this.y) {
            this.y = ((event.touches || [])[0] || event || {}).clientY;
        }
        // Check pointer X
        // We either get data from a touch event `event.touches[0].clientX` or from
        // a mouse event `event.clientX`.
        if (((event.touches || [])[0] || event || {}).clientX !== this.x) {
            this.x = ((event.touches || [])[0] || event || {}).clientX;
        }
    };
    Object.defineProperty(Pointer.prototype, "props", {
        /**
         * Get the pointer props.
         *
         * @type {Object}
         */
        get: function () {
            return {
                isDown: this.isDown,
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
                    x: this.x / window.innerWidth,
                    y: this.y / window.innerHeight,
                },
                max: {
                    x: window.innerWidth,
                    y: window.innerHeight,
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return Pointer;
}(Service_1.default));
var pointer = null;
/**
 * Use the pointer.
 *
 * ```js
 * import usePointer from '@studiometa/js-toolkit/services';
 * const { add, remove, props } = usePointer();
 * add('id', () => {});
 * remove('id');
 * props();
 * ```
 */
exports.default = (function () {
    if (!pointer) {
        pointer = new Pointer();
    }
    var add = pointer.add.bind(pointer);
    var remove = pointer.remove.bind(pointer);
    var has = pointer.has.bind(pointer);
    var props = function () { return pointer.props; };
    return {
        add: add,
        remove: remove,
        has: has,
        props: props,
    };
});
//# sourceMappingURL=pointer.js.map