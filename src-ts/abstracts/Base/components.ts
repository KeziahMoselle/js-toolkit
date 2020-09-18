import { debug } from './utils';

import { Base as BaseInterface } from './types';

interface AsyncComponent extends Promise<BaseInterface> {
  __isAsync__: boolean;
}

/**
 * Test if a component is asynchrone.
 * @param  {AsyncComponent | BaseInterface} ref The component to check.
 * @return {boolean}                         Returns true if component is async.
 */
function isAsyncComponent(component: AsyncComponent | BaseInterface): component is AsyncComponent {
  return (component as AsyncComponent).__isAsync__ !== undefined;
}

/**
 * Mount a given component which might be async.
 *
 * @param  {Base|Promise} component The component to mount.
 * @return {void}
 */
function mountComponent(component: AsyncComponent | BaseInterface): void {
  if (isAsyncComponent(component)) {
    component.then((instance) => instance.$mount());
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
export function mountComponents(instance: BaseInterface): void {
  if (!instance.$children) {
    return;
  }

  debug(instance, 'mountComponents', instance.$children);

  Object.values(instance.$children).forEach(($child) => {
    $child.forEach(mountComponent);
  });
}

/**
 * Destroy a given component which might be async.
 *
 * @param  {Base|Promise} component The component to destroy.
 * @return {void}
 */
function destroyComponent(component: AsyncComponent | BaseInterface): void {
  if (isAsyncComponent(component)) {
    component.then((instance) => instance.$destroy());
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
export function destroyComponents(instance: BaseInterface): void {
  if (!instance.$children) {
    return;
  }
  debug(instance, 'destroyComponents', instance.$children);

  Object.values(instance.$children).forEach(($child) => {
    $child.forEach(destroyComponent);
  });
}
