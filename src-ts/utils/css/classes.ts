enum Methods {
  Add = 'add',
  Remove = 'remove',
  Toggle = 'toggle',
}

/**
 * Manage a list of classes as string on an element.
 *
 * @param {Element} element    The element to update.
 * @param {String}      classNames A string of class names.
 * @param {String}      method     The method to use: add, remove or toggle.
 */
function setClasses(element:Element, classNames:string, method:Methods = Methods.Add) {
  if (!element || !classNames) {
    return;
  }

  classNames.split(' ').forEach((className) => {
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
export function add(element:Element, classNames:string) {
  setClasses(element, classNames);
}

/**
 * Remove class names from an element.
 *
 * @param  {Element} element    The element to update.
 * @param  {String}      classNames A string of class names.
 * @return {void}
 */
export function remove(element:Element, classNames:string) {
  setClasses(element, classNames, Methods.Remove);
}

/**
 * Toggle class names from an element.
 *
 * @param  {Element} element    The element to update.
 * @param  {String}      classNames A string of class names.
 * @return {void}
 */
export function toggle(element:Element, classNames:string) {
  setClasses(element, classNames, Methods.Toggle);
}
