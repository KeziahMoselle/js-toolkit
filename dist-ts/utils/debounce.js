"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a function, that, as long as it continues to be invoked,
 * will not be triggered. The function will be called after it stops
 * being called for N milliseconds.
 *
 * @param {Function} fn    The function to call
 * @param {Number}   delay The delay in ms to wait before calling the function
 */
function debounce(fn, delay) {
    if (delay === void 0) { delay = 300; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeout);
        // @ts-ignore-next-line
        timeout = setTimeout(function () {
            fn.apply(void 0, args);
        }, delay);
    };
}
exports.default = debounce;
//# sourceMappingURL=debounce.js.map