"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRaf = void 0;
/**
 * RequestAnimation frame polyfill.
 * @see  https://github.com/vuejs/vue/blob/ec78fc8b6d03e59da669be1adf4b4b5abf670a34/dist/vue.runtime.esm.js#L7355
 * @type {Function}
 */
exports.getRaf = function () { return (typeof window !== 'undefined' && window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout); };
/**
 * Execute a callback in the next frame.
 * @param  {Function} fn The callback function to execute.
 * @return {Promise}
 */
function nextFrame(fn) {
    if (fn === void 0) { fn = function () { }; }
    var raf = exports.getRaf();
    return new Promise(function (resolve) {
        raf(function () { return raf(function () { return resolve(fn()); }); });
    });
}
exports.default = nextFrame;
//# sourceMappingURL=nextFrame.js.map