"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nextFrame;
exports.raf = void 0;

/**
 * RequestAnimation frame polyfill.
 * @see  https://github.com/vuejs/vue/blob/ec78fc8b6d03e59da669be1adf4b4b5abf670a34/dist/vue.runtime.esm.js#L7355
 * @type {Function}
 */
var raf = typeof window !== 'undefined' && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout;
/**
 * Execute a callback in the next frame.
 * @param  {Function} fn The callback function to execute.
 * @return {void}
 */

exports.raf = raf;

function nextFrame(fn) {
  raf(function () {
    return raf(fn);
  });
}
//# sourceMappingURL=nextFrame.js.map