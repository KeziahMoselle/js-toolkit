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
 * @param  {BreakpointObserver} instance The component's instance.
 * @return {Sring}                       The action to trigger.
 */
function testBreakpoints(instance, breakpoint) {
    if (breakpoint === void 0) { breakpoint = resize_1.default().props().breakpoint; }
    var _a = instance.$options, activeBreakpoints = _a.activeBreakpoints, inactiveBreakpoints = _a.inactiveBreakpoints;
    var isInActiveBreakpoint = activeBreakpoints && activeBreakpoints.split(' ').includes(breakpoint);
    var isInInactiveBreakpoint = inactiveBreakpoints && inactiveBreakpoints.split(' ').includes(breakpoint);
    if ((activeBreakpoints && isInActiveBreakpoint) ||
        (inactiveBreakpoints && !isInInactiveBreakpoint)) {
        return '$mount';
    }
    return '$destroy';
}
/**
 * Test if the given instance is configured for breakpoints.
 * @param  {Base}    instance A Base class instance.
 * @return {Boolean}          True if configured correctly, false otherwise.
 */
function hasBreakpointConfiguration(instance) {
    var _a = instance.$options, activeBreakpoints = _a.activeBreakpoints, inactiveBreakpoints = _a.inactiveBreakpoints;
    return Boolean(activeBreakpoints || inactiveBreakpoints);
}
/**
 * Test if the given instance has a conflicting configuration for breakpoints.
 * @param  {Base} instance A Base class instance.
 * @return {void}
 */
function testConflictingBreakpointConfiguration(instance) {
    var _a = instance.$options, activeBreakpoints = _a.activeBreakpoints, inactiveBreakpoints = _a.inactiveBreakpoints, name = _a.name;
    if (activeBreakpoints && inactiveBreakpoints) {
        throw new Error("[" + name + "] Incorrect configuration: the `activeBreakpoints` and `inactiveBreakpoints` are not compatible.");
    }
}
/**
 * BreakpointObserver class.
 */
exports.default = (function (BaseClass) {
    return /** @class */ (function (_super) {
        __extends(BreakpointObserver, _super);
        /**
         * Watch for the document resize to test the breakpoints.
         * @param  {HTMLElement} element The component's root element.
         * @return {BreakpointObserver}          The current instance.
         */
        function BreakpointObserver(element) {
            var _this = _super.call(this, element) || this;
            var _a = resize_1.default(), add = _a.add, has = _a.has, remove = _a.remove, props = _a.props;
            var name = _this.$options.name;
            // Do nothing if no breakpoint has been defined.
            // @see https://js-toolkit.meta.fr/services/resize.html#breakpoint
            if (!props().breakpoint) {
                throw new Error("[" + name + "] The `BreakpointObserver` class requires breakpoints to be defined.");
            }
            var key = "BreakpointObserver-" + _this.$id;
            // Watch change on the `data-options` attribute to emit the `set:options` event.
            var mutationObserver = new MutationObserver(function (_a) {
                var mutation = _a[0];
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-options') {
                    // Stop here silently when no breakpoint configuration given.
                    if (!hasBreakpointConfiguration(_this)) {
                        _this.$mount();
                        remove(key);
                        return;
                    }
                    testConflictingBreakpointConfiguration(_this);
                    if (!has(key)) {
                        add(key, function (_a) {
                            var breakpoint = _a.breakpoint;
                            var action = testBreakpoints(_this, breakpoint);
                            _this[action]();
                        });
                    }
                }
            });
            mutationObserver.observe(_this.$el, { attributes: true });
            // Stop here silently when no breakpoint configuration given.
            if (!hasBreakpointConfiguration(_this)) {
                return _this;
            }
            testConflictingBreakpointConfiguration(_this);
            add(key, function (_a) {
                var breakpoint = _a.breakpoint;
                var action = testBreakpoints(_this, breakpoint);
                _this[action]();
            });
            return _this;
        }
        /**
         * Override the default $mount method to prevent component's from being
         * mounted when they should not.
         * @return {BreakpointObserver} The component's instance.
         */
        BreakpointObserver.prototype.$mount = function () {
            // Execute normal behavior when no breakpoint configuration given.
            if (!hasBreakpointConfiguration(this)) {
                return _super.prototype.$mount.call(this);
            }
            var action = testBreakpoints(this);
            if (action === '$mount') {
                return _super.prototype.$mount.call(this);
            }
            return this;
        };
        return BreakpointObserver;
    }(BaseClass));
});
//# sourceMappingURL=withBreakpointObserver.js.map