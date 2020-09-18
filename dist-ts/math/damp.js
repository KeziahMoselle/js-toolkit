"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Smooth step from currentValue to targetValue
 *
 * @param  {Int} targetValue we want to reech
 * @param  {Int} currentValue
 * @param  {Int} speed to reech target value
 * @return {Int}
 */
function damp(targetValue, currentValue, speed) {
    if (speed === void 0) { speed = 0.5; }
    var value = currentValue + (targetValue - currentValue) * speed;
    return Math.abs(targetValue - currentValue) < 0.001 ? targetValue : value;
}
exports.default = damp;
//# sourceMappingURL=damp.js.map