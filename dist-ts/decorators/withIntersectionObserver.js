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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../abstracts/Base/utils");
/**
 * Create an array of number between 0 and 1 from the given length.
 * @param  {Number} length The length of the array.
 * @return {Array}        An array of number.
 */
function createArrayOfNumber(length) {
    return __spreadArrays(new Array(length + 1)).map(function (val, index) { return index / length; });
}
/**
 * IntersectionObserver decoration.
 */
exports.default = (function (BaseClass, defaultOptions) {
    if (defaultOptions === void 0) { defaultOptions = { threshold: createArrayOfNumber(100) }; }
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        /**
         * Create an observer when the class in instantiated.
         *
         * @param  {HTMLElement} element The component's root element.
         * @return {Base}                The class instace.
         */
        function class_1(element) {
            var _this = _super.call(this, element) || this;
            if (!_this.intersected || typeof _this.intersected !== 'function') {
                throw new Error('[withIntersectionObserver] The `intersected` method must be defined.');
            }
            _this.$observer = new IntersectionObserver(function (entries) {
                utils_1.debug(_this, 'intersected', entries);
                _this.$emit('intersected', entries);
                _this.intersected(entries);
            }, __assign(__assign({}, defaultOptions), (_this.$options.intersectionObserver || {})));
            if (_this.$isMounted) {
                _this.$observer.observe(_this.$el);
            }
            _this.$on('mounted', function () {
                _this.$observer.observe(_this.$el);
            });
            _this.$on('destroyed', function () {
                _this.$observer.unobserve(_this.$el);
            });
            return _this;
        }
        Object.defineProperty(class_1.prototype, "_excludeFromAutoBind", {
            /**
             * Add the `intersected` method to the list of method to exclude from the `autoBind` call.
             */
            get: function () {
                return __spreadArrays((_super.prototype._excludeFromAutoBind || []), ['intersected']);
            },
            enumerable: false,
            configurable: true
        });
        return class_1;
    }(BaseClass));
});
//# sourceMappingURL=withIntersectionObserver.js.map