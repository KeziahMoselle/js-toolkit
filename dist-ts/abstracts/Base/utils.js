"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callMethod = exports.hasMethod = exports.debug = void 0;
/**
 * Verbose debug for the component.
 *
 * @param  {...any} args The arguments passed to the method
 * @return {void}
 */
function debug(instance) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return instance.$options.debug
        ? window.console.log.apply(window, __spreadArrays([instance.config.name], args))
        : false;
}
exports.debug = debug;
/**
 * Test if an object has a method.
 *
 * @param  {Object}  obj The object to test
 * @param  {String}  fn  The method's name
 * @return {Boolean}
 */
function hasMethod(obj, name) {
    return typeof obj[name] === 'function';
}
exports.hasMethod = hasMethod;
/**
 * Call the given method while applying the given arguments.
 *
 * @param {String} method The method to call
 * @param {...any} args   The arguments to pass to the method
 */
function callMethod(instance, method) {
    var _a;
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    debug.apply(void 0, __spreadArrays([instance, 'callMethod', method], args));
    // Prevent duplicate call of `mounted` and `destroyed`
    // methods based on the component status
    if ((method === 'destroyed' && !instance.$isMounted)
        || (method === 'mounted' && instance.$isMounted)) {
        debug(instance, 'not', method, 'because the method has already been triggered once.');
        return instance;
    }
    instance.$emit.apply(instance, __spreadArrays([method], args));
    // We always emit an event, but we do not call the method if it does not exist
    if (!hasMethod(instance, method)) {
        return instance;
    }
    (_a = instance[method]).call.apply(_a, __spreadArrays([instance], args));
    debug.apply(void 0, __spreadArrays([instance, method, instance], args));
    return instance;
}
exports.callMethod = callMethod;
//# sourceMappingURL=utils.js.map