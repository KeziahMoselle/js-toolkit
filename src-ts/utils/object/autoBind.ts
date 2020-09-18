import getAllProperties from './getAllProperties';

interface Options {
  include?: string[] | RegExp[];
  exclude?: string[] | RegExp[];
}

/**
 * Auto-bind methods to an instance.
 *
 * @param  {Object}               instance        The instance.
 * @param  {Array<String|RegExp>} options.include Methods to include.
 * @param  {Array<String|RegExp>} options.exclude Methods to exclude.
 * @return {Object}                               The instance.
 */
export default function autoBind(instance: Object, { include, exclude }: Options): Object {
  const filter = (key: string): boolean => {
    const match = (pattern: string | RegExp): boolean => (
      typeof pattern === 'string' ? key === pattern : pattern.test(key)
    );

    if (include) {
      return include.some(match);
    }

    if (exclude) {
      return !exclude.some(match);
    }

    return true;
  };

  getAllProperties(instance)
    .filter(([ key ]: [string,Object]) => key !== 'constructor' && filter(key))
    .forEach(([ key, object ]: [string, Object]) => {
      const descriptor = Object.getOwnPropertyDescriptor(object, key);
      if (descriptor && typeof descriptor.value === 'function') {
        instance[key] = instance[key].bind(instance);
      }
    });

  return instance;
}
