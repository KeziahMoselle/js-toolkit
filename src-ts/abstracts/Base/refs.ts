import { Base as BaseInterface, BaseElement, Refs as RefsInterface } from './types';

/**
 * Get all refs of a component.
 *
 * @param  {Base}        instance The component's instance.
 * @param  {HTMLElement} element  The component's root element.
 * @return {Object}               Return an object containing all the component's refs.
 */
export function getRefs(instance: BaseInterface, element: BaseElement): RefsInterface {
  const allRefs: BaseElement[] = Array.from(element.querySelectorAll('[data-ref]'));
  const childrenRefs: BaseElement[] = Array.from(
    element.querySelectorAll(':scope [data-component] [data-ref]'),
  );
  const elements: BaseElement[] = allRefs.filter((ref) => !childrenRefs.includes(ref));

  const start: RefsInterface = {};
  const refs: RefsInterface = elements.reduce(($refs, $ref: BaseElement) => {
    let refName: string | undefined = $ref.dataset.ref;

    if (!refName) {
      return $refs;
    }

    const $realRef: BaseElement | BaseInterface = $ref.__base__ ? $ref.__base__ : $ref;

    if (refName.endsWith('[]')) {
      refName = refName.replace(/\[\]$/, '');

      if (!$refs[refName]) {
        $refs[refName] = [];
      }
    }

    if ($refs[refName]) {
      if (Array.isArray($refs[refName])) {
        // @ts-ignore
        $refs[refName].push($realRef);
      } else {
        // @ts-ignore
        $refs[refName] = [ $refs[refName], $realRef ];
      }
    } else {
      $refs[refName] = $realRef;
    }

    return $refs;
  }, start);

  instance.$emit('get:refs', refs);
  return refs;
}

export default {
  getRefs,
};
