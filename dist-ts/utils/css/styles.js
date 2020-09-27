"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.add = void 0;
var isObject_1 = __importDefault(require("../object/isObject"));
/**
 * Manage a list of style properties on an element.
 *
 * @param {HTMLElement}         element The element to update.
 * @param {CSSStyleDeclaration} styles  An object of styles properties and values.
 * @param {String}              method  The method to use: add or remove.
 */
function setStyles(element, styles, method) {
    if (method === void 0) { method = 'add'; }
    if (!element || !styles || !isObject_1.default(styles)) {
        return;
    }
    Object.entries(styles).forEach(function (_a) {
        var prop = _a[0], value = _a[1];
        element.style[prop] = method === 'add' ? value : '';
    });
}
exports.default = setStyles;
/**
 * Add class names to an element.
 *
 * @param {HTMLElement} element    The element to update.
 * @param {String}      styles A string of class names.
 * @return {void}
 */
function add(element, styles) {
    setStyles(element, styles);
}
exports.add = add;
/**
 * Remove class names from an element.
 *
 * @param  {HTMLElement} element    The element to update.
 * @param  {String}      styles A string of class names.
 * @return {void}
 */
function remove(element, styles) {
    setStyles(element, styles, 'remove');
}
exports.remove = remove;
//# sourceMappingURL=styles.js.map