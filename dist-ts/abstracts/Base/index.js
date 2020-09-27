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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var non_secure_1 = __importDefault(require("nanoid/non-secure"));
var autoBind_1 = __importDefault(require("../../utils/object/autoBind"));
var EventManager_1 = __importDefault(require("../EventManager"));
var utils_1 = require("./utils");
var children_1 = require("./children");
var options_1 = require("./options");
var refs_1 = require("./refs");
var components_1 = require("./components");
var services_1 = __importDefault(require("./services"));
var events_1 = __importDefault(require("./events"));
/**
 * Page lifecycle class
 *
 * @method mounted   Fired when the class is instantiated
 * @method loaded    Fired on the window's load event
 * @method ticked    Fired each frame with `requestAnimationFrame`
 * @method resized   Fired when the window is resized (`resize` event)
 * @method moved     Fired when the pointer has moved (`touchmove` and `mousemove` events)
 * @method scrolled  Fired with debounce when the document is scrolled (`scroll` event)
 * @method destroyed Fired when the window is being unloaded (`unload` event)
 */
var Base = /** @class */ (function (_super) {
    __extends(Base, _super);
    /**
     * Class constructor where all the magic takes place.
     *
     * @param  {HTMLElement} element The component's root element.
     * @return {Base}                A Base instance.
     */
    function Base(element) {
        var _this = _super.call(this) || this;
        _this.$isMounted = false;
        _this.$parent = null;
        _this.__isChild__ = false;
        if (!_this.config) {
            throw new Error('The `config` getter must be defined.');
        }
        if (!_this.config.name) {
            throw new Error('The `config.name` property is required.');
        }
        if (!element) {
            throw new Error('The root element must be defined.');
        }
        _this.$el = element;
        _this.$id = _this.config.name + "-" + non_secure_1.default();
        if (!_this.$el.__base__) {
            Object.defineProperty(_this.$el, '__base__', {
                get: function () { return _this; },
                configurable: true,
            });
        }
        // Autobind all methods to the instance
        autoBind_1.default(_this, {
            exclude: __spreadArrays([
                '$mount',
                '$destroy',
                '$log',
                '$on',
                '$once',
                '$off',
                '$emit',
                'mounted',
                'loaded',
                'ticked',
                'resized',
                'moved',
                'keyed',
                'scrolled',
                'destroyed'
            ], (_this._excludeFromAutoBind || [])),
        });
        var unbindMethods = [];
        _this.$on('mounted', function () {
            components_1.mountComponents(_this);
            unbindMethods = __spreadArrays(services_1.default(_this), events_1.default(_this));
            _this.$isMounted = true;
        });
        _this.$on('destroyed', function () {
            _this.$isMounted = false;
            unbindMethods.forEach(function (method) { return method(); });
            components_1.destroyComponents(_this);
        });
        // Mount class which are not used as another component's child.
        if (!_this.__isChild__) {
            _this.$mount();
            Object.defineProperty(_this, '$parent', { get: function () { return null; } });
        }
        utils_1.debug(_this, 'constructor', _this);
        return _this;
    }
    Object.defineProperty(Base.prototype, "$refs", {
        /**
         * Get the component's refs.
         * @return {Object}
         */
        get: function () {
            return refs_1.getRefs(this, this.$el);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "$children", {
        /**
         * Get the component's children components.
         * @return {Object}
         */
        get: function () {
            return children_1.getChildren(this, this.$el, this.config.components || {});
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "$options", {
        /**
         * Get the component's merged config and options.
         * @return {Object}
         */
        get: function () {
            return options_1.getOptions(this, this.$el, this.config);
        },
        /**
         * Set the components option.
         * @param  {Object} value The new options values to merge with the old ones.
         */
        set: function (newOptions) {
            options_1.setOptions(this, this.$el, newOptions);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "config", {
        /**
         * Get the Base config.
         * @return {ConfigInterface}
         */
        get: function () {
            return { name: 'Base' };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "_excludeFromAutoBind", {
        /**
         * Get extra methods to exclude from the autoBind function.
         */
        get: function () {
            return [];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Small helper to log stuff.
     *
     * @param  {...any} args The arguments passed to the method
     * @return {void}
     */
    Base.prototype.$log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.$options.log
            ? window.console.log.apply(window, __spreadArrays([this.config.name], args))
            : false;
    };
    /**
     * Trigger the `mounted` callback.
     */
    Base.prototype.$mount = function () {
        utils_1.debug(this, '$mount');
        utils_1.callMethod(this, 'mounted');
        return this;
    };
    /**
     * Trigger the `destroyed` callback.
     */
    Base.prototype.$destroy = function () {
        utils_1.debug(this, '$destroy');
        utils_1.callMethod(this, 'destroyed');
        return this;
    };
    /**
     * Terminate a child instance when it is not needed anymore.
     * @return {void}
     */
    Base.prototype.$terminate = function () {
        utils_1.debug(this, '$terminate');
        // First, destroy the component.
        this.$destroy();
        // Execute the `terminated` hook if it exists
        utils_1.callMethod(this, 'terminated');
        // Delete the reference to the instance
        delete this.$el.__base__;
        // And update its status to prevent re-instantiation when accessing the
        // parent's `$children` property
        Object.defineProperty(this.$el, '__base__', {
            value: 'terminated',
            configurable: false,
            writable: false,
        });
    };
    /**
     * Factory method to generate multiple instance of the class.
     *
     * @param  {String}      selector The selector on which to mount each instance.
     * @return {Array<Base>}          A list of the created instance.
     */
    Base.$factory = function (nameOrSelector) {
        var _this = this;
        if (!nameOrSelector) {
            throw new Error('The $factory method requires a component’s name or selector to be specified.');
        }
        return children_1.getComponentElements(nameOrSelector).map(function (el) { return new _this(el); });
    };
    Base.__isBase__ = true;
    return Base;
}(EventManager_1.default));
exports.default = Base;
//# sourceMappingURL=index.js.map