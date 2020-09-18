import getAllProperties from '../../utils/object/getAllProperties';
import { debug } from './utils';

import { Base as BaseInterface, BaseElement } from './types';

/**
 * Bind event handler methods to the root HTML element.
 *
 * @param  {Base}  instance     A Base instance.
 * @param  {Array} eventMethods A list of methods to bind.
 * @return {Array}              A list of unbind functions.
 */
function bindRootEvents(instance: BaseInterface, eventMethods: string[]): Function[] {
  return eventMethods.map((eventMethod: string) => {
    const eventName = eventMethod.replace(/^on/, '').toLowerCase();

    const handler = (...args: unknown[]) => {
      debug(instance, eventMethod, instance.$el, ...args);
      instance[eventMethod](...args);
    };

    instance.$el.addEventListener(eventName, handler);

    return () => {
      instance.$el.removeEventListener(eventName, handler);
    };
  });
}

/**
 * Test if a ref is an HTMLElement or a Base class.
 * @param  {BaseElement | BaseInterface} ref The ref to check.
 * @return {boolean}                         Returns true if ref is a Base instance.
 */
function isBase(ref: BaseElement | BaseInterface): ref is BaseInterface {
  return (ref as BaseInterface).$isMounted !== undefined;
}

/**
 * Bind event handler methods to refs HTML element.
 *
 * @param  {Base}  instance     A Base instance.
 * @param  {Array} eventMethods A list of methods to bind.
 * @return {Array}              A list of unbind functions.
 */
function bindRefsEvents(instance: BaseInterface, eventMethods: string[]): Function[] {
  const unbindMethods: Function[] = [];

  Object.entries(instance.$refs).forEach(([ refName, $refOrRefs ]) => {
    const $refs = Array.isArray($refOrRefs) ? $refOrRefs : [ $refOrRefs ];
    const refEventMethod = `on${refName.replace(/^\w/, (c) => c.toUpperCase())}`;

    eventMethods
      .filter((eventMethod) => eventMethod.startsWith(refEventMethod))
      .forEach((eventMethod) => {
        $refs.forEach(($ref: BaseElement | BaseInterface, index) => {
          const eventName = eventMethod.replace(refEventMethod, '').toLowerCase();
          const handler = (...args: unknown[]) => {
            debug(instance, eventMethod, $ref, ...args, index);
            instance[eventMethod](...args, index);
          };

          debug(instance, 'binding ref event', refName, eventName);

          // eslint-disable-next-line no-param-reassign
          $ref = isBase($ref) ? $ref.$el : $ref;

          $ref.addEventListener(eventName, handler);
          const unbindMethod = () => {
            debug(instance, 'unbinding ref event', eventMethods);
            (isBase($ref) ? $ref.$el : $ref).removeEventListener(eventName, handler);
          };

          unbindMethods.push(unbindMethod);
        });
      });
  });

  return unbindMethods;
}

/**
 * Bind event handler methods to children Base instance.
 * @param  {Base}  instance     A Base instance.
 * @param  {Array} eventMethods A list of methods to bind.
 * @return {Array}              A list of unbind functions.
 */
function bindChildrenEvents(instance: BaseInterface, eventMethods: string[]): Function[] {
  const unbindMethods: Function[] = [];

  Object.entries(instance.$children).forEach(
    ([ childName, $children ]: [string, BaseInterface[]]) => {
      const childEventMethod = `on${childName.replace(/^\w/, (c) => c.toUpperCase())}`;

      eventMethods
        .filter((eventMethod: string) => eventMethod.startsWith(childEventMethod))
        .forEach((eventMethod: string) => {
          $children.forEach(($child: BaseInterface, index: number) => {
            const eventName = eventMethod.replace(childEventMethod, '').toLowerCase();
            const handler = (...args: unknown[]) => {
              debug(instance, eventMethod, $child, ...args, index);
              instance[eventMethod](...args, index);
            };

            debug(instance, 'binding child event', childName, eventName);

            const unbindMethod = $child.$on(eventName, handler);
            unbindMethods.push(() => {
              debug(instance, 'unbinding child event', childName, eventName);
              unbindMethod();
            });
          });
        });
    },
  );

  return unbindMethods;
}

/**
 * Bind ref and children component's events to their corresponding method.
 *
 * @param  {Base} instance  A Base instance.
 * @return {Array}          A list of methods to unbind the events.
 */
export default function bindEvents(instance: BaseInterface): Function[] {
  const ROOT_EVENT_REGEX = /^on[A-Z][a-z]+$/;
  const REFS_CHILDREN_EVENT_REGEX = /^on([A-Z][a-z]+)([A-Z][a-z]+)+$/;

  interface EventMethods {
    root: string[];
    refsOrChildren: string[];
  }

  // Get all event methods
  const start: EventMethods = { root: [], refsOrChildren: [] };
  const eventMethods: EventMethods = getAllProperties(instance).reduce(
    (acc, [ name ]) => {
      // Testing camelCase with one word: onEvent.
      if (ROOT_EVENT_REGEX.test(name)) {
        acc.root.push(name);
        return acc;
      }

      // Testing camelCase with more than two words: onRefEvent.
      if (REFS_CHILDREN_EVENT_REGEX.test(name)) {
        acc.refsOrChildren.push(name);
      }

      return acc;
    },
    start,
  );

  const unbindMethods = [
    ...bindRootEvents(instance, eventMethods.root),
    ...bindRefsEvents(instance, eventMethods.refsOrChildren),
    ...bindChildrenEvents(instance, eventMethods.refsOrChildren),
  ];

  return unbindMethods;
}
