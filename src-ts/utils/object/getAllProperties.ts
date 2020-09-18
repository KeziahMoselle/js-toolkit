/**
 * Gets all non-builtin properties up the prototype chain.
 *
 * @param  {Object} object The object to get the propeties from.
 * @param  {Array}  props  The already existing properties.
 * @return {Array}         An array of properties and their value.
 */
export default function getAllProperties(
  object: Object,
  props: [string, Object][] = [],
): [string, Object][] {
  const proto: Object = Object.getPrototypeOf(object);

  if (proto === Object.prototype) {
    return props;
  }

  return getAllProperties(
    proto,
    Object.getOwnPropertyNames(proto)
      .map((name: string): [string, Object] => [ name, proto ])
      .reduce((acc: [string, Object][], val: [string, Object]) => [ ...acc, val ], props),
  );
}
