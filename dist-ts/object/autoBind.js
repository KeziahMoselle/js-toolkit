"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getAllProperties_1 = require("./getAllProperties");
/**
 * Auto-bind methods to an instance.
 *
 * @param  {Object}               instance        The instance.
 * @param  {Array<String|RegExp>} options.include Methods to include.
 * @param  {Array<String|RegExp>} options.exclude Methods to exclude.
 * @return {Object}                               The instance.
 */
function autoBind(instance, _a) {
    var include = _a.include, exclude = _a.exclude;
    var filter = function (key) {
        var match = function (pattern) { return (typeof pattern === 'string' ? key === pattern : pattern.test(key)); };
        if (include) {
            return include.some(match);
        }
        if (exclude) {
            return !exclude.some(match);
        }
        return true;
    };
    getAllProperties_1.default(instance)
        .filter(function (_a) {
        var key = _a[0];
        return key !== 'constructor' && filter(key);
    })
        .forEach(function (_a) {
        var key = _a[0], object = _a[1];
        var descriptor = Object.getOwnPropertyDescriptor(object, key);
        if (descriptor && typeof descriptor.value === 'function') {
            instance[key] = instance[key].bind(instance);
        }
    });
    return instance;
}
exports.default = autoBind;
//# sourceMappingURL=autoBind.js.map