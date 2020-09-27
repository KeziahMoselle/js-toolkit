import { Base as BaseInterface } from './types';
/**
 * Use the services.
 * @param  {Base} instance A Base class instance.
 * @return {Array}         A list of unbind methods.
 */
export default function bindServices(instance: BaseInterface): Function[];
