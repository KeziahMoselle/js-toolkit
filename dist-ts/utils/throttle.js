"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple throttling helper that limits a
 * function to only run once every {delay}ms
 *
 * @param {Function} fn    The function to throttle
 * @param {Number}   delay The delay in ms
 */
function throttle(fn, delay) {
    if (delay === void 0) { delay = 16; }
    var lastCall = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = new Date().getTime();
        if (now - lastCall < delay) {
            return false;
        }
        lastCall = now;
        return fn.apply(void 0, args);
    };
}
exports.default = throttle;
//# sourceMappingURL=throttle.js.map