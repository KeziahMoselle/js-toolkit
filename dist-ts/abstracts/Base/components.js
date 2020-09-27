"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyComponents = exports.mountComponents = void 0;
var utils_1 = require("./utils");
/**
 * Test if a component is asynchrone.
 * @param  {AsyncComponent | BaseInterface} ref The component to check.
 * @return {boolean}                         Returns true if component is async.
 */
function isAsyncComponent(component) {
    return component.__isAsync__ !== undefined;
}
/**
 * Mount a given component which might be async.
 *
 * @param  {Base|Promise} component The component to mount.
 * @return {void}
 */
function mountComponent(component) {
    if (isAsyncComponent(component)) {
        component.then(function (instance) { return instance.$mount(); });
    }
    else {
        component.$mount();
    }
}
/**
 * Mount children components of a given instance.
 *
 * @param  {Base} instance The parent component's instance.
 * @return {void}
 */
function mountComponents(instance) {
    if (!instance.$children) {
        return;
    }
    utils_1.debug(instance, 'mountComponents', instance.$children);
    Object.values(instance.$children).forEach(function ($child) {
        $child.forEach(mountComponent);
    });
}
exports.mountComponents = mountComponents;
/**
 * Destroy a given component which might be async.
 *
 * @param  {Base|Promise} component The component to destroy.
 * @return {void}
 */
function destroyComponent(component) {
    if (isAsyncComponent(component)) {
        component.then(function (instance) { return instance.$destroy(); });
    }
    else {
        component.$destroy();
    }
}
/**
 * Destroy children components of a given instance.
 *
 * @param  {Base} instance The parent component's instance.
 * @return {void}
 */
function destroyComponents(instance) {
    if (!instance.$children) {
        return;
    }
    utils_1.debug(instance, 'destroyComponents', instance.$children);
    Object.values(instance.$children).forEach(function ($child) {
        $child.forEach(destroyComponent);
    });
}
exports.destroyComponents = destroyComponents;
//# sourceMappingURL=components.js.map