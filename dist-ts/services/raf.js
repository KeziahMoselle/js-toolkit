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
var nextFrame_1 = require("../utils/nextFrame");
/**
 * Tick service
 *
 * ```
 * import { useRaf } from '@studiometa/js/services';
 * const { add, remove, props } = useRag();
 * add(id, (props) => {});
 * remove(id);
 * props();
 * ```
 */
var Raf = /** @class */ (function (_super) {
    __extends(Raf, _super);
    function Raf() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @type {Boolean} Whether the loop is running or not. */
        _this.isTicking = false;
        return _this;
    }
    /**
     * Start the requestAnimationFrame loop.
     *
     * @return {void}
     */
    Raf.prototype.init = function () {
        var _this = this;
        var raf = nextFrame_1.getRaf();
        var loop = function () {
            _this.trigger(_this.props);
            if (!_this.isTicking) {
                return;
            }
            raf(loop);
        };
        this.isTicking = true;
        loop();
    };
    /**
     * Stop the requestAnimationFrame loop.
     *
     * @return {void}
     */
    Raf.prototype.kill = function () {
        this.isTicking = false;
    };
    Object.defineProperty(Raf.prototype, "props", {
        /**
         * Get raf props.
         *
         * @todo Return elapsed time / index?
         * @type {Object}
         */
        get: function () {
            return {
                time: window.performance.now(),
            };
        },
        enumerable: false,
        configurable: true
    });
    return Raf;
}(Service_1.default));
var instance = null;
exports.default = (function () {
    if (!instance) {
        instance = new Raf();
    }
    var add = instance.add.bind(instance);
    var remove = instance.remove.bind(instance);
    var has = instance.has.bind(instance);
    var props = function () { return instance.props; };
    return {
        add: add,
        remove: remove,
        has: has,
        props: props,
    };
});
//# sourceMappingURL=raf.js.map