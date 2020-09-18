"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Round a value with a given number of decimals.
 *
 * @param  {Number} value    The number to round.
 * @param  {Number} decimals The number of decimals to keep.
 * @return {Number}          A rounded number to the given decimals length.
 */
function round(value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    return Number(value.toFixed(decimals));
}
exports.default = round;
//# sourceMappingURL=round.js.map