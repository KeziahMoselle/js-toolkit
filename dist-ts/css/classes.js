"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggle = exports.remove = exports.add = void 0;
var Methods;
(function (Methods) {
    Methods["Add"] = "add";
    Methods["Remove"] = "remove";
    Methods["Toggle"] = "toggle";
})(Methods || (Methods = {}));
/**
 * Manage a list of classes as string on an element.
 *
 * @param {Element} element    The element to update.
 * @param {String}      classNames A string of class names.
 * @param {String}      method     The method to use: add, remove or toggle.
 */
function setClasses(element, classNames, method) {
    if (method === void 0) { method = Methods.Add; }
    if (!element || !classNames) {
        return;
    }
    classNames.split(' ').forEach(function (className) {
        element.classList[method](className);
    });
}
/**
 * Add class names to an element.
 *
 * @param {Element} element    The element to update.
 * @param {String}      classNames A string of class names.
 * @return {void}
 */
function add(element, classNames) {
    setClasses(element, classNames);
}
exports.add = add;
/**
 * Remove class names from an element.
 *
 * @param  {Element} element    The element to update.
 * @param  {String}      classNames A string of class names.
 * @return {void}
 */
function remove(element, classNames) {
    setClasses(element, classNames, Methods.Remove);
}
exports.remove = remove;
/**
 * Toggle class names from an element.
 *
 * @param  {Element} element    The element to update.
 * @param  {String}      classNames A string of class names.
 * @return {void}
 */
function toggle(element, classNames) {
    setClasses(element, classNames, Methods.Toggle);
}
exports.toggle = toggle;
//# sourceMappingURL=classes.js.map