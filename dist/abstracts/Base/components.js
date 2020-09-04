"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountComponents = mountComponents;
exports.destroyComponents = destroyComponents;

var _utils = require("./utils");

/**
 * Mount a given component which might be async.
 *
 * @param  {Base|Promise} component The component to mount.
 * @return {void}
 */
function mountComponent(component) {
  if (component.__isAsync__) {
    component.then(function (instance) {
      return instance.$mount();
    });
  } else {
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

  (0, _utils.debug)(instance, 'mountComponents', instance.$children);
  Object.values(instance.$children).forEach(function ($child) {
    $child.forEach(mountComponent);
  });
}
/**
 * Destroy a given component which might be async.
 *
 * @param  {Base|Promise} component The component to destroy.
 * @return {void}
 */


function destroyComponent(component) {
  if (component.__isAsync__) {
    component.then(function (instance) {
      return instance.$destroy();
    });
  } else {
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

  (0, _utils.debug)(instance, 'destroyComponents', instance.$children);
  Object.values(instance.$children).forEach(function ($child) {
    $child.forEach(destroyComponent);
  });
}
//# sourceMappingURL=components.js.map