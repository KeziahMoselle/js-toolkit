"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets all non-builtin properties up the prototype chain.
 *
 * @param  {Object} object The object to get the propeties from.
 * @param  {Array}  props  The already existing properties.
 * @return {Array}         An array of properties and their value.
 */
function getAllProperties(object, props) {
    if (props === void 0) { props = []; }
    var proto = Object.getPrototypeOf(object);
    if (proto === Object.prototype) {
        return props;
    }
    return getAllProperties(proto, Object.getOwnPropertyNames(proto)
        .map(function (name) { return [name, proto]; })
        .reduce(function (acc, val) { return __spreadArrays(acc, [val]); }, props));
}
exports.default = getAllProperties;
//# sourceMappingURL=getAllProperties.js.map