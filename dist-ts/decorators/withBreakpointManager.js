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
var resize_1 = __importDefault(require("../services/resize"));
/**
 * Test the breakpoins of the given Base instance and return the hook to call.
 *
 * @param  {Base}           instance The component's instance.
 * @return {String|Boolean}          The action to call ($mount|$destroy) or false.
 */
function testBreakpoints(breakpoints) {
    var breakpoint = resize_1.default().props().breakpoint;
    breakpoints.forEach(function (_a) {
        var breakpointKeys = _a[0], instance = _a[1];
        if (breakpointKeys.includes(breakpoint)) {
            instance.$mount();
        }
        else {
            instance.$destroy();
        }
    });
}
/**
 * A cache object to hold each Base sub-instances.
 * @type {Object}
 */
var instances = {};
/**
 * BreakpointManager class.
 */
exports.default = (function (BaseClass, breakpoints) {
    if (!Array.isArray(breakpoints)) {
        throw new Error('[withBreakpointManager] The `breakpoints` parameter must be an array.');
    }
    if (breakpoints.length < 2) {
        throw new Error('[withBreakpointManager] You must define at least 2 breakpoints.');
    }
    var _a = resize_1.default(), add = _a.add, props = _a.props;
    // Do nothing if no breakpoint has been defined.
    // @see https://js-toolkit.meta.fr/services/resize.html#breakpoint
    if (!props().breakpoint) {
        throw new Error("The `BreakpointManager` class requires breakpoints to be defined.");
    }
    return /** @class */ (function (_super) {
        __extends(BreakpointManager, _super);
        /**
         * Watch for the document resize to test the breakpoints.
         * @param  {HTMLElement} element The component's root element.
         * @return {BreakpointManager}          The current instance.
         */
        function BreakpointManager(element) {
            var _this = _super.call(this, element) || this;
            instances[_this.$id] = breakpoints.map(function (_a) {
                var bk = _a[0], ComponentClass = _a[1];
                // eslint-disable-next-line no-underscore-dangle
                ComponentClass.prototype.__isChild__ = true;
                var instance = new ComponentClass(_this.$el);
                Object.defineProperty(instance, '$parent', { get: function () { return _this; } });
                return [bk, instance];
            });
            add("BreakpointManager-" + _this.$id, function () {
                testBreakpoints(instances[_this.$id]);
            });
            return _this;
        }
        /**
         * Override the default $mount method to prevent component's from being
         * mounted when they should not.
         * @return {Base} The Base instance.
         */
        BreakpointManager.prototype.$mount = function () {
            testBreakpoints(instances[this.$id]);
            return _super.prototype.$mount.call(this);
        };
        /**
         * Destroy all instances when the main one is destroyed.
         * @return {Base} The Base instance.
         */
        BreakpointManager.prototype.$destroy = function () {
            if (Array.isArray(instances[this.$id])) {
                instances[this.$id].forEach(function (_a) {
                    var instance = _a[1];
                    instance.$destroy();
                });
            }
            return _super.prototype.$destroy.call(this);
        };
        return BreakpointManager;
    }(BaseClass));
});
//# sourceMappingURL=withBreakpointManager.js.map