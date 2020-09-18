import usePointer from '../../services/pointer';
import useRaf from '../../services/raf';
import useResize from '../../services/resize';
import useScroll from '../../services/scroll';
import useKey from '../../services/key';
import { hasMethod, callMethod } from './utils';

import { Base as BaseInterface } from './types';

/**
 * Init the given service and bind it to the given instance.
 *
 * @param  {Base}     instance The Base instance.
 * @param  {String}   method   The instance to test for binding
 * @param  {Function} service  The service `use...` function
 * @return {Function}          A function to unbind the service
 */
function initService(instance: BaseInterface, method: string, service: Function): Function {
  if (!hasMethod(instance, method)) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  const { add, remove } = service();
  add(instance.$id, (...args:unknown[]) => {
    callMethod(instance, method, ...args);
  });

  return () => remove(instance.$id);
}

/**
 * Use the services.
 * @param  {Base} instance A Base class instance.
 * @return {Array}         A list of unbind methods.
 */
export default function bindServices(instance: BaseInterface): Function[] {
  const unbindMethods = [
    initService(instance, 'scrolled', useScroll),
    initService(instance, 'resized', useResize),
    initService(instance, 'ticked', useRaf),
    initService(instance, 'moved', usePointer),
    initService(instance, 'keyed', useKey),
  ];

  // Fire the `loaded` method on window load
  // @todo remove this? or move it elsewhere?
  if (hasMethod(instance, 'loaded')) {
    const loadedHandler:EventListener = (event:Event) => {
      callMethod(instance, 'loaded', { event });
    };
    window.addEventListener('load', loadedHandler);
    unbindMethods.push(() => {
      window.removeEventListener('load', loadedHandler);
    });
  }

  return unbindMethods;
}
