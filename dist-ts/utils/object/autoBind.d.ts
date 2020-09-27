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
export default function autoBind(instance: Object, { include, exclude }: Options): Object;
export {};
